import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDacs95XQrPb0sfIzpLanMWxhVXJM7Z0jM",
  authDomain: "tenziesrecords.firebaseapp.com",
  projectId: "tenziesrecords",
  storageBucket: "tenziesrecords.appspot.com",
  messagingSenderId: "152689560205",
  appId: "1:152689560205:web:bd41e9583f7efc09a1b0c4",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const gamesCollection = collection(db, "gamesCollection");
