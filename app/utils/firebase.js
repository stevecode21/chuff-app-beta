import firebase from 'firebase/app'

// Esta será una constante que no se va a cambiar par ala configruración de mi Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCHRwxC83kqBo-eB4TmN6JmjHUycXrtBXs',
  authDomain: 'chuff-app-beta.firebaseapp.com',
  databaseURL: 'https://chuff-app-beta.firebaseio.com',
  projectId: 'chuff-app-beta',
  storageBucket: 'chuff-app-beta.appspot.com',
  messagingSenderId: '819665050394',
  appId: '1:819665050394:web:dddbcc254b149349f42aa3',
  measurementId: 'G-XSKZJY2J3Y'
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)
