import firebase from 'firebase';


const config = {

      };
const firebaseApp = firebase.initializeApp(config);
export const firestore = firebaseApp.firestore();