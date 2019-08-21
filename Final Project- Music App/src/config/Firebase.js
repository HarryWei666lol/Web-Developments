import firebase from "firebase";
// connect to firebase 
const config = {
  apiKey: "AIzaSyDjbbMSuHsaUkBgQozYGU7Z_TxOwWCpt2k",
  authDomain: "cse503finalproject.firebaseapp.com",
  databaseURL: "https://cse503finalproject.firebaseio.com",
  projectId: "cse503finalproject",
  storageBucket: "",
  messagingSenderId: "908724564"
};
firebase.initializeApp(config);

export default firebase;
