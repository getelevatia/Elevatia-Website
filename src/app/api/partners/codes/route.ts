import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { CreateCodeForm } from '@/types/partners';
import {
  requireOrgAccess as verifyAccess,
  requireDocInOrg,
  statusFor,
  messageFor,
} from '@/lib/partner-auth';

// Generate a unique code with prefix
function generateCode(prefix: string, length: number = 6): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No ambiguous chars
  let code = prefix.toUpperCase();
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// GET - List codes for organization
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split('Bearer ')[1];
    const organizationId = request.nextUrl.searchParams.get('organizationId');
    
    if (!organizationId) {
      return NextResponse.json({ error: 'Organization ID required' }, { status: 400 });
    }
    
    const access = await verifyAccess(token, organizationId);
    
    const codesSnapshot = await adminDb
      .collection('partnerCodes')
      .where('organizationId', '==', organizationId)
      .orderBy('createdAt', 'desc')
      .get();
    
    const codes = codesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json({ codes, role: access.role });
  } catch (error) {
    console.error('Error fetching codes:', error);
    return NextResponse.json(
      { error: messageFor(error, 'Failed to fetch codes') },
      { status: statusFor(error) }
    );
  }
}

// POST - Create new code
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split('Bearer ')[1];
    const body: CreateCodeForm & { organizationId: string } = await request.json();
    
    const access = await verifyAccess(token, body.organizationId);
    
    // Only owner and admin can create codes
    if (access.role === 'viewer') {
      return NextResponse.json({ error: 'Viewers cannot create codes' }, { status: 403 });
    }
    
    // Get organization for default prefix
    const orgSnapshot = await adminDb
      .collection('organizations')
      .doc(body.organizationId)
      .get();
    
    if (!orgSnapshot.exists) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }
    
    const org = orgSnapshot.data()!;
    const prefix = body.prefix || org.slug.toUpperCase().slice(0, 4);
    
    // Generate unique code
    let code = generateCode(prefix);
    let attempts = 0;
    while (attempts < 10) {
      const existing = await adminDb
        .collection('partnerCodes')
        .where('code', '==', code)
        .limit(1)
        .get();
      
      if (existing.empty) break;
      code = generateCode(prefix);
      attempts++;
    }
    
    const newCode = {
      code,
      organizationId: body.organizationId,
      type: body.type,
      maxRedemptions: body.type === 'multi' ? body.maxRedemptions : 1,
      currentRedemptions: 0,
      expiresAt: new Date(body.expiresAt),
      durationDays: body.durationDays,
      createdBy: access.uid,
      createdAt: new Date(),
      isActive: true,
      label: body.label || null,
      notes: body.notes || null,
    };
    
    const docRef = await adminDb.collection('partnerCodes').add(newCode);
    
    return NextResponse.json({ 
      success: true, 
      code: { id: docRef.id, ...newCode } 
    });
  } catch (error) {
    console.error('Error creating code:', error);
    return NextResponse.json(
      { error: messageFor(error, 'Failed to create code') },
      { status: statusFor(error) }
    );
  }
}

// PATCH - Update code (toggle active, update notes)
export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split('Bearer ')[1];
    const body = await request.json();
    const { codeId, organizationId, ...updates } = body;
    
    // organizationId is now REQUIRED by verifyAccess. It used to be optional,
    // so omitting it from the body skipped the tenant check entirely.
    const access = await verifyAccess(token, organizationId);
    
    if (access.role === 'viewer') {
      return NextResponse.json({ error: 'Viewers cannot update codes' }, { status: 403 });
    }
    
    // And the code itself has to belong to that org — `codeId` is the caller's
    // input, unconstrained by the check above.
    await requireDocInOrg('partnerCodes', codeId, access.organizationId);
    
    // Only allow certain fields to be updated
    const allowedUpdates: Record<string, unknown> = {};
    if ('isActive' in updates) allowedUpdates.isActive = updates.isActive;
    if ('label' in updates) allowedUpdates.label = updates.label;
    if ('notes' in updates) allowedUpdates.notes = updates.notes;
    
    await adminDb.collection('partnerCodes').doc(codeId).update(allowedUpdates);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating code:', error);
    return NextResponse.json(
      { error: messageFor(error, 'Failed to update code') },
      { status: statusFor(error) }
    );
  }
}

