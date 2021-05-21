import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyBey-LgsZZA64zMDN-7RYPD2KfnOR6LK3s",
    authDomain: "whatapp-mern-9ccc9.firebaseapp.com",
    projectId: "whatapp-mern-9ccc9",
    storageBucket: "whatapp-mern-9ccc9.appspot.com",
    messagingSenderId: "610390142546",
    appId: "1:610390142546:web:175bc3f28a7b385470798b"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore()

  const auth = firebase.auth()

  const provider = new firebase.auth.GoogleAuthProvider()

  export { auth, provider }
  export default db