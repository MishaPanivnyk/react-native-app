import firebase from "firebase/compat";
import "firebase/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBblxdoRiWVfhCGxKLo3bfucF_jOd9y7vI",
  authDomain: "homework-react-native.firebaseapp.com",
  projectId: "homework-react-native",
  storageBucket: "homework-react-native.appspot.com",
  messagingSenderId: "467921213394",
  appId: "1:467921213394:web:a521abfdfff2c00324da0b",
  measurementId: "G-LN03G531VK",
};

export default firebase.initializeApp(firebaseConfig);
