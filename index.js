import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

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
const db = getFirestore(app);

console.log(await getCollections(db))

async function getCollections(db){
  const collectionsCol = collection(db, 'collections');
  const getCollections = await getDocs(collectionsCol);
  const list = getCollections.docs.maps(doc => doc.data());

  return list;
}

const newCollection = {
  name: "“The human psyche is very resistant to challenges of what they think”",
  description: "",
  created: "",
  notes: []
}



