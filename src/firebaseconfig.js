// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUiRjQwcIDRiNkj_JusiTpOKJFmat1J-w",
  authDomain: "qmever-6b3c3.firebaseapp.com",
  databaseURL: "https://qmever-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "qmever",
  storageBucket: "qmever.firebasestorage.app",
  messagingSenderId: "527170940876",
  appId: "1:527170940876:web:1f3fb31600c5a009387769"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig