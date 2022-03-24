
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCLkmYcYbayPOEIqPzPwCdddg3vYFVNzIw",
    authDomain: "innoasset-ebfc6.firebaseapp.com",
    projectId: "innoasset-ebfc6",
    storageBucket: "innoasset-ebfc6.appspot.com",
    messagingSenderId: "1063269039178",
    appId: "1:1063269039178:web:d56ba324b81e31e4313ab3",
    measurementId: "G-6J34HX3501"
};

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();

export default storage;