import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';
import { FirebaseAuth } from './config'
import { FirebaseDB } from '../firebase/config';



const GoogleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

    GoogleProvider.setCustomParameters({promt: 'select_account'})

    try { 
        const result = await signInWithPopup(FirebaseAuth, GoogleProvider);
        const { uid, displayName, photoURL, email } = result.user;

        if (uid) {
            const userDocRef = doc(FirebaseDB, 'users', uid);
            await setDoc(userDocRef, { email }, { merge: true });
          }

        return {
            ok: true,
            uid, displayName, photoURL, email
        }

    } catch (error) { 

        console.log(error);
        const errorMessage = error.message;

        return{
            ok: false,
            errorMessage
        }
    }
}

export const registerUser = async ({ email, password, displayName }) => {
    console.log(email, password);
    try {
      const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
  
      const { uid, photoURL } = resp.user
  
      await updateProfile(FirebaseAuth.currentUser, { displayName });

      if (uid) {
        const userDocRef = doc(FirebaseDB, 'users', uid);
        await setDoc(userDocRef, { email }, { merge: true });
      }
  
      return {
        ok: true,
        uid, photoURL, email, displayName
      }
  
    } catch (error) {
      return {
        ok: false,
        errorMessage: error.message
      }
    }
  }

export const authUserWithEmailPassword = async (email, password) => {
    try {
        console.log(email);

        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        console.log(result)

        const { uid, displayName, photoURL } = result.user;

        if (uid) {
            const userDocRef = doc(FirebaseDB, 'users', uid);
            await setDoc(userDocRef, { email }, { merge: true });
          }


        return {
            ok: true,
            uid, displayName, photoURL
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logoutUser = async () => {
    return await FirebaseAuth.signOut();
}