import firebase from 'firebase/app';
import  'firebase/firestore';
import  'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL, 
    projectId: process.env.REACT_APP_PROJECTID, 
    storageBucket: process.env.REACT_APP_STORAGEBUCKET, 
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID, 
    appId: process.env.REACT_APP_APPID, 
};

// const firebaseConfigTesting = {
//     apiKey: "AIzaSyBEojiZFXudS-X-i33y_dwA_h4ZH66pHX0",
//     authDomain: "testing-29112.firebaseapp.com",
//     databaseURL: "https://testing-29112.firebaseio.com",
//     projectId: "testing-29112",
//     storageBucket: "testing-29112.appspot.com",
//     messagingSenderId: "48610121425",
//     appId: "1:48610121425:web:cb96e72b4a04cfeaa297f0"
//   };


// if( process.env.NODE_ENV === 'test' ) {
//     //testing
//     firebase.initializeApp(firebaseConfigTesting);
// } else {
//     //dev/prod
//     firebase.initializeApp(firebaseConfig);
// }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }