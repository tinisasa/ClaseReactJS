import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC3uxV7PN-zsjAEmdwvZCnjVylMrSJ8ftE",
    authDomain: "crystals-uy.firebaseapp.com",
    projectId: "crystals-uy",
    storageBucket: "crystals-uy.appspot.com",
    messagingSenderId: "48196633137",
    appId: "1:48196633137:web:3bd0bc5aa275227afe4b10"
};

const app = firebase.initializeApp(firebaseConfig);

export function getFirebase() {
    return app;
}

export function getFirestore() {
    return firebase.firestore();
}