import {initializeApp} from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
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
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) =>{
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)
    if (!userSnapshot.exists())
    {
        const { displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error)
        {
            console.log("Error: ", error.message)
        }
    }

    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (! email  || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}


export const signInAuthWithEmailAndPassword = async (email, password) => {
    if (!email  || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
}