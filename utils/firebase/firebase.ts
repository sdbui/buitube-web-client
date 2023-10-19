// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    User,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKZhYU5pHlkAfsjAuGRJkmpSVjTrqNhEY",
  authDomain: "buitube.firebaseapp.com",
  projectId: "buitube",
//   storageBucket: "buitube.appspot.com", // dont need: we will use our own gcs bucket
//   messagingSenderId: "547769488118", // dont need?: using gc pubsub
  appId: "1:547769488118:web:0eb27eb16fba429e44d2d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/**
 * Signs user in with google popup.
 * @returns A promise that resolves with user's credentials
 */
export function signInWithGoogle() {
    return signInWithPopup(auth,new GoogleAuthProvider());
}
// maybe add more auth options later?

/**
 * Signs the user out
 * @returns A Promise that resolves when user is signed out
 */
export function signOut () {
    return auth.signOut();
}

/**
 * 
 * @param callback Trigger a callback when user auth state changes
 * @returns A function to unsubscribe callback
 */
export function onAuthStateChangedHelper (callback: (user: User | null) => void) {
    return onAuthStateChanged(auth,callback);
}