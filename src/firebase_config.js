import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDFPla65JbMJXxanpSmo9R4WJ13cIwQl8o",
    authDomain: "task-crud-27ed5.firebaseapp.com",
    projectId: "task-crud-27ed5",
    storageBucket: "task-crud-27ed5.appspot.com",
    messagingSenderId: "914037858802",
    appId: "1:914037858802:web:c6970205f115d6efda0b6b"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };