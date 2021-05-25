import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDi1WLFVzYmbZH6pdWIlsRnZ39sRT5b3iY",
  authDomain: "crwn-db-e8b1f.firebaseapp.com",
  projectId: "crwn-db-e8b1f",
  storageBucket: "crwn-db-e8b1f.appspot.com",
  messagingSenderId: "435881366083",
  appId: "1:435881366083:web:8d10913171a8c16f563af6",
  measurementId: "G-TB4XEDMCYJ"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }

  }

  return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;