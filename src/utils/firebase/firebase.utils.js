import {initializeApp} from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore, doc, setDoc, getDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDeIwrJnijounZaql1Jd43cFZPs6JK0UFg",
    authDomain: "crwn-clothing-db-ad26f.firebaseapp.com",
    projectId: "crwn-clothing-db-ad26f",
    storageBucket: "crwn-clothing-db-ad26f.appspot.com",
    messagingSenderId: "900189600119",
    appId: "1:900189600119:web:be0d94da800764dfe30972"
  };

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromUser = async (userAuth) =>{
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef)
}