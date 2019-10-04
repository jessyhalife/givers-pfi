import Firebase from 'react-native-firebase';

let config = {
    apiKey: "AIzaSyBZac8n4qvU063aXqkGnYshZX3OQcBJwJc",
    authDomain: "givers-229af.firebaseapp.com",
    databaseURL: "https://givers-229af.firebaseio.com",
    projectId: "givers-229af",
    storageBucket: "givers-229af.appspot.com",
    messagingSenderId: "1070274682388"
  };
  
  let firebaseApp = Firebase.app();//Firebase.initializeApp(config);
  export default firebaseApp;
