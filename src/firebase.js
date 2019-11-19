import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


var config = {
    apiKey: "AIzaSyCTOHEhc6oj5PHZdXzI17KYljUkEdbcrqI",
    authDomain: "slackproject-759da.firebaseapp.com",
    databaseURL: "https://slackproject-759da.firebaseio.com",
    projectId: "slackproject-759da",
    storageBucket: "slackproject-759da.appspot.com",
    messagingSenderId: "42789530138",
    appId: "1:42789530138:web:8836b27633f8e23e797fa3"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  export default firebase;