/**
 * One-time script: creates the admin Firebase user and sets admin: true custom claim.
 * Run with: node scripts/create-admin.mjs
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local manually
const envPath = resolve(__dirname, '../.env.local');
const env = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split('\n')
    .filter((line) => line.includes('=') && !line.startsWith('#'))
    .map((line) => {
      const idx = line.indexOf('=');
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim().replace(/^"|"$/g, '');
      return [key, val];
    })
);

const ADMIN_EMAIL = 'admin@reichman.ac.il';
const ADMIN_PASSWORD = 'Admin@Reichman2025';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

const auth = getAuth();

async function run() {
  let uid;

  try {
    const existing = await auth.getUserByEmail(ADMIN_EMAIL);
    uid = existing.uid;
    console.log(`✓ User already exists: ${ADMIN_EMAIL} (uid: ${uid})`);
    // Update password in case it changed
    await auth.updateUser(uid, { password: ADMIN_PASSWORD, displayName: 'Admin' });
    console.log('✓ Password updated');
  } catch {
    const created = await auth.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      displayName: 'Admin',
    });
    uid = created.uid;
    console.log(`✓ Created user: ${ADMIN_EMAIL} (uid: ${uid})`);
  }

  await auth.setCustomUserClaims(uid, { admin: true });
  console.log('✓ Set custom claim: admin = true');

  console.log('\n--- Admin credentials ---');
  console.log(`Email:    ${ADMIN_EMAIL}`);
  console.log(`Password: ${ADMIN_PASSWORD}`);
  console.log('-------------------------');
}

run().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
