// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'; // Por ejemplo, para Realtime Database
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBAKhDeCZxmlCnq3Jkfs82szefJmn7KWTY",
  authDomain: "tengo-una-duda-a04ae.firebaseapp.com",
  databaseURL: "https://tengo-una-duda-a04ae-default-rtdb.firebaseio.com",
  projectId: "tengo-una-duda-a04ae",
  storageBucket: "tengo-una-duda-a04ae.appspot.com",
  messagingSenderId: "155765995446",
  appId: "1:155765995446:web:b01fb285c49434a84fb317",
  measurementId: "G-6HHD53SHQ0"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);
const db = database;

export { app, database, db, storage, auth };