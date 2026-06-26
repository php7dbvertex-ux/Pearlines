import { readFileSync } from "fs";
import {
  initializeApp,
  cert,
  getApps,
} from "firebase-admin/app";

import { getMessaging } from "firebase-admin/messaging";

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  serviceAccount = JSON.parse(
    readFileSync("./src/config/serviceAccountKey.json", "utf8")
  );
}

// Initialize only once
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const messaging = getMessaging();