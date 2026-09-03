/**
 * Partner dashboard authorization.
 *
 * Every partner API route verifies a Firebase ID token and then checks the
 * caller's `partnerAdmins` record against an `organizationId` from the request.
 * That part was always right. What was missing is the step after it:
 *
 *   AUTHORIZING AN ORGANIZATION IS NOT AUTHORIZING A DOCUMENT.
 *
 * `PATCH /paths`, `DELETE /paths` and `PATCH /codes` each authorized the org in
 * the request body, then wrote to `partnerPaths/{pathId}` or
 * `partnerCodes/{codeId}` — ids that were never checked against that org. A
 * partner admin at Org A could pass their OWN organizationId, so the check
 * passed cleanly, together with a pathId belonging to Org B, and edit or delete
 * another partner's content. `PATCH /organizations` was safe only by accident:
 * it writes to the same id it authorized.
 *
 * The second hole was narrower and sharper. `codes` declared its helper as
 * `verifyAccess(token, organizationId?: string)` and guarded with
 * `if (organizationId && ...)`, so a caller who simply OMITTED the field from
 * the body skipped the tenant check entirely. Note that a required TypeScript
 * parameter would not have saved it: the value comes from `await
 * request.json()`, which is `any` at runtime. The guard below is a runtime
 * check for exactly that reason.
 *
 * Both live here rather than in each route because there were four near-copies
 * of this logic across the route files and three of them were wrong. One
 * implementation is the actual fix; the rest is bookkeeping.
 */
import { adminAuth, adminDb, SUPER_ADMIN_UID } from '@/lib/firebase-admin';

export type PartnerRole = 'owner' | 'admin' | 'viewer';

export interface PartnerAccess {
  uid: string;
  role: PartnerRole;
  isSuperAdmin: boolean;
  organizationId: string;
}

/** Carries the status the route should return, so auth failures stop reading as 500s. */
export class PartnerAuthError extends Error {
  status: number;
  constructor(message: string, status = 403) {
    super(message);
    this.name = 'PartnerAuthError';
    this.status = status;
  }
}

/** Pull the bearer token, or throw a 401 the route can return directly. */
export function bearerToken(authHeader: string | null): string {
  if (!authHeader?.startsWith('Bearer ')) {
    throw new PartnerAuthError('Missing authorization header', 401);
  }
  return authHeader.slice('Bearer '.length);
}

/**
 * Verify the caller may act for `organizationId`.
 *
 * `organizationId` is required and checked at runtime — an absent or non-string
 * value is a 400, never a silently skipped tenant check.
 */
export async function requireOrgAccess(
  token: string,
  organizationId: unknown
): Promise<PartnerAccess> {
  if (typeof organizationId !== 'string' || organizationId.length === 0) {
    throw new PartnerAuthError('organizationId is required', 400);
  }

  let uid: string;
  try {
    uid = (await adminAuth.verifyIdToken(token)).uid;
  } catch {
    throw new PartnerAuthError('Invalid or expired token', 401);
  }

  if (uid === SUPER_ADMIN_UID) {
    return { uid, role: 'owner', isSuperAdmin: true, organizationId };
  }

  const snapshot = await adminDb
    .collection('partnerAdmins')
    .where('id', '==', uid)
    .limit(1)
    .get();

  if (snapshot.empty) {
    throw new PartnerAuthError('Not authorized as partner admin');
  }

  const admin = snapshot.docs[0].data();
  if (admin.organizationId !== organizationId) {
    throw new PartnerAuthError('Not authorized for this organization');
  }

  return {
    uid,
    role: admin.role as PartnerRole,
    isSuperAdmin: false,
    organizationId,
  };
}

/**
 * Verify a document actually belongs to the organization already authorized.
 *
 * This is the check that did not exist. Call it before every write that
 * addresses a document by an id taken from the request — the id is the
 * caller's input, and the org check above says nothing about it.
 *
 * Enforced for super admins too. A super admin is entitled to any org, but
 * naming one org and editing another's document is a mistake in every case,
 * and the dashboard always sends the id of the org it is displaying.
 */
export async function requireDocInOrg(
  collection: string,
  docId: unknown,
  organizationId: string
): Promise<FirebaseFirestore.DocumentSnapshot> {
  if (typeof docId !== 'string' || docId.length === 0) {
    throw new PartnerAuthError('Document id is required', 400);
  }

  const doc = await adminDb.collection(collection).doc(docId).get();
  if (!doc.exists) {
    throw new PartnerAuthError('Not found', 404);
  }

  if (doc.data()?.organizationId !== organizationId) {
    // Deliberately 404, not 403: a partner probing ids should not be able to
    // tell "exists, belongs to someone else" from "does not exist".
    console.warn('Rejected cross-organization access', { collection, docId, organizationId });
    throw new PartnerAuthError('Not found', 404);
  }

  return doc;
}

/** Turn a thrown PartnerAuthError into its status; anything else is a 500. */
export function statusFor(error: unknown): number {
  return error instanceof PartnerAuthError ? error.status : 500;
}

/** The message safe to return for a thrown error — never an internal one. */
export function messageFor(error: unknown, fallback: string): string {
  return error instanceof PartnerAuthError ? error.message : fallback;
}
