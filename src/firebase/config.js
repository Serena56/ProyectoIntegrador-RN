import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCparhE5oFj4NFxL3ZfR03z4idux04acH4",
    authDomain: "proyectointegrador-reactnative.firebaseapp.com",
    projectId: "proyectointegrador-reactnative",
    storageBucket: "proyectointegrador-reactnative.appspot.com",
    messagingSenderId: "537554396751",
    appId: "1:537554396751:web:fd67736cefd13dad77ec3a"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = firebase.firestore();