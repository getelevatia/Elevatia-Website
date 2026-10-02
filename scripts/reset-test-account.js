// Reset the website's signup test account so the first-time flow can be
// tested again. The account is the Firebase test phone number
// +1 555 555-0100 (verification code 112233, no SMS is ever sent); it is
// configured in Authentication > Sign-in method > Phone > test numbers.
//
// Usage:
//   GOOGLE_CLOUD_PROJECT=elevatia-5e20c node scripts/reset-test-account.js
//
// Deletes the auth user and its user-owned documents. Hard-coded to the
// test number: it can never touch another account.
const admin = require('firebase-admin');

const TEST_PHONE = '+15555550100';

admin.initializeApp({ credential: admin.credential.applicationDefault() });
const db = admin.firestore();

(async () => {
  let user;
  try {
    user = await admin.auth().getUserByPhoneNumber(TEST_PHONE);
  } catch {
    console.log(`No account exists for ${TEST_PHONE}. Signup will run as first-time.`);
    process.exit(0);
  }
  const uid = user.uid;

  for (const col of ['users', 'userSubscriptions']) {
    await db.collection(col).doc(uid).delete();
  }
  for (const col of ['userPaths', 'healthData', 'activities']) {
    const docs = await db.collection(col).where('userId', '==', uid).get();
    for (const d of docs.docs) await d.ref.delete();
    if (!docs.empty) console.log(`${col}: deleted ${docs.size}`);
  }
  await admin.auth().deleteUser(uid);
  console.log(`Deleted test account ${uid} (${TEST_PHONE}). Signup is first-time again.`);
  process.exit(0);
})();
