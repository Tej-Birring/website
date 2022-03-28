import firebaseConfig from "./.conf.json";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

import firestoreFactory from "./firestore";

export default {
    install(app, options) {
        app.provide("$firestore", firestoreFactory(db));
    }
}
