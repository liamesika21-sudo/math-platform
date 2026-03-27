/**
 * Create or update a student Firebase Auth user and student Firestore document.
 *
 * Example:
 * node scripts/create-student.mjs --email lihishapira@reichman.ac.il --name lihishapira
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

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

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

const adminAuth = getAuth();
const adminDb = getFirestore();

function parseArgs(argv) {
  const args = {};

  for (let i = 0; i < argv.length; i += 1) {
    const part = argv[i];
    if (!part.startsWith('--')) continue;

    const key = part.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith('--')) {
      args[key] = 'true';
      continue;
    }

    args[key] = value;
    i += 1;
  }

  return args;
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  const email = args.email;
  const name = args.name ?? email?.split('@')[0] ?? 'student';
  const password = args.password ?? 'reichman123';
  const studentId = args.studentId ?? '';
  const courseId = args.courseId ?? '';

  if (!email) {
    throw new Error('Missing required --email argument');
  }

  let uid;
  let existed = false;

  try {
    const existing = await adminAuth.getUserByEmail(email);
    uid = existing.uid;
    existed = true;
    await adminAuth.updateUser(uid, {
      displayName: name,
      password,
    });
  } catch (error) {
    if (error?.code !== 'auth/user-not-found') {
      throw error;
    }

    const created = await adminAuth.createUser({
      email,
      password,
      displayName: name,
    });
    uid = created.uid;
  }

  const studentDoc = {
    uid,
    name,
    email,
    studentId,
    updatedAt: new Date().toISOString(),
  };

  if (courseId) {
    studentDoc.courses = {
      [courseId]: {
        enrolledAt: new Date().toISOString(),
        status: 'active',
      },
    };
  }

  await adminDb.collection('students').doc(uid).set(studentDoc, { merge: true });

  console.log(JSON.stringify({ ok: true, existed, uid, email, password, courseId: courseId || null }, null, 2));
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
