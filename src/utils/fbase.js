import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyALlpODsgprq2uAIdgoxBJWH71wHRL985o",
  authDomain: "react-firebase-some.firebaseapp.com",
  projectId: "react-firebase-some",
  storageBucket: "react-firebase-some.appspot.com",
  messagingSenderId: "768168832534",
  appId: "1:768168832534:web:d118e7ef5e4e0a4d3a8f37",
};

const fBaseApp = firebase.initializeApp(config);

// DB
export const DB = fBaseApp.firestore();
export const { Timestamp } = firebase.firestore;
export const usersCollection = DB.collection("users");
export const reviewsCollection = DB.collection("reviews");
export const messagesCollection = DB.collection("messages");
