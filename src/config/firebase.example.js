import * as firebase from 'firebase';

const config = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJETCT_ID",
  storageBucket: "YOU_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
};

const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(config);
//--
export default app;
