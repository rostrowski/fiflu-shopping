import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCJVklNq8MxVWxkscPruVzOjRtDXWKpoCE",
  authDomain: "fiflu-shopping-v2.firebaseapp.com",
  databaseURL: "https://fiflu-shopping-v2.firebaseio.com",
  projectId: "fiflu-shopping-v2",
  storageBucket: "fiflu-shopping-v2.appspot.com",
  messagingSenderId: "103951860241",
  appId: "1:103951860241:web:93597e3330752057f727b0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firestore = firebaseApp.firestore();

firestore
  .enablePersistence()
  .then(() => console.log("Offline support enabled"))
  .catch((e) => console.error("Failed to enable offline support", e));

export { firestore };
export default firebase;
