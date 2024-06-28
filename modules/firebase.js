import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import {collection, addDoc, doc} from 'firebase/firestore';

import { getAuth, GoogleAuthProvider, EmailAuthProvider, signInWithRedirect } from "firebase/auth";
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const firebaseConfig = {
  apiKey: "AIzaSyB7W58eZyV93WtK_yjfP8ye2BQxCSk3yBc",
  authDomain: "sumupp-30327.firebaseapp.com",
  projectId: "sumupp-30327",
  storageBucket: "sumupp-30327.appspot.com",
  messagingSenderId: "698087444830",
  appId: "1:698087444830:web:2bf2ad3fb0a87a7e9c7fcf",
  measurementId: "G-ENJR4HFF43"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export async function readDocuments(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return getQueryData(querySnapshot);

  } catch (error) {
    console.error("Error reading documents: ", error);
  }
}

export async function getUserCollections(uid){
  try{
    const q = query(collection(db, 'collections'), where('users', 'array-contains', uid));

    const querySnapshot = await getDocs(q);

    return getQueryData(querySnapshot);
    
  } catch(error){
    console.error("Error fetching collections: ", error);
  }
}

export async function addCollection({name, description}){
  const newCollection = {
    name,
    description, 
    created: serverTimestamp(),
    notes: [],
    users: [auth.currentUser.uid]
  }

  try{
    const docRef = await addDoc(collection(db, 'collections'), newCollection);
    console.log('Collection added successfully: ', newCollection);
    return docRef.id;
    
  } catch(error){
    console.error('Errorr adding collection: , ', error);
    throw new Error("Failed to add collection");
  }

}



function getQueryData(snapshot){
  return snapshot.docs.map(doc=>({
    id: doc.id, 
    ...doc.data()
  }));
}

// ---

export async function signIn(container){
  var uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
      GoogleAuthProvider.PROVIDER_ID,
      EmailAuthProvider.PROVIDER_ID,
    ],
    tosUrl: '<your-tos-url>',
    privacyPolicyUrl: function() {
      window.location.assign('<your-privacy-policy-url>');
    },
    callbacks: {
      signInFailure: function(error) {
        // Handle sign-in failures.
        console.error('Sign-in error:', error);
        if (error.code === 'auth/email-already-in-use') {
          alert('This email is already associated with an account.');
        }
        // You can handle other specific errors here.
      }
    }
  };

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(auth);

  // The start method will wait until the DOM is loaded.
  ui.start('#'+ container.id, uiConfig);

}

export async function signOut(){
  auth.signOut();
  window.location.reload();
}


export function initApp() {
  // listens for changes to user's authentication state
  // cb is what happens when state changes

  return new Promise((resolve, reject)=>{
    auth.onAuthStateChanged(user =>{
      resolve(user);
    })
  })

};