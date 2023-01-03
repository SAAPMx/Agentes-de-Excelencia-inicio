// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  // Put you credentials here
  apiKey: "AIzaSyCJu5AFtATruWMJouaP9LB4lrbIv2tAOgY",
  authDomain: "agentes-de-excelencia.firebaseapp.com",
  databaseURL: "https://agentes-de-excelencia-default-rtdb.firebaseio.com",
  projectId: "agentes-de-excelencia",
  storageBucket: "agentes-de-excelencia.appspot.com",
  messagingSenderId: "1013460803165",
  appId: "1:1013460803165:web:f7a3a5789a2d47e816b7b4"
    
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);

export const db = getFirestore();

/**
 * Save a New Task in Firestore
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 */
export const saveTask = (mail, predio, referencia, contacto, descripcion, fecha) =>
  addDoc(collection(db, "tasks"), { mail, predio, referencia, contacto, descripcion, fecha });

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

/**
 *
 * @param {string} id Task ID
 */
export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);

export const getTasks = () => getDocs(collection(db, "tasks"));


/* PARA MODAL DE EXTERNA */
export const saveExt = (NombreEmisor, UbicacionEmisor, Celular, Correo, NombreReceptor, EstadoReceptor, ColoniaReceptor, CalleReceptor, CPReceptor, Descripcion ) =>
  addDoc(collection(db, "Externa"), { NombreEmisor, UbicacionEmisor, Celular, Correo, NombreReceptor, EstadoReceptor, ColoniaReceptor, CalleReceptor, CPReceptor, Descripcion });

  /* PARA MODAL DE INTERNA */
export const saveInt = (NombreEmisor, UbicacionEmisor, Celular, Correo, NombreReceptor, UbicacionReceptor, Descripcion ) =>
addDoc(collection(db, "Interna"), { NombreEmisor, UbicacionEmisor, Celular, Correo, NombreReceptor, UbicacionReceptor, Descripcion });
