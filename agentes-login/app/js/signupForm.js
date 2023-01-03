import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { auth, saveTask } from "./firebase.js";
import { showMessage } from "./showMessage.js";

const signUpForm = document.querySelector("#registrar");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const signup = document.getElementById("signup-form"); //ES LA FUNCIÓN QUE GENERARÁ LA VENTANA DE ELEMENTOS EN BASE DE DATOS DONDE SE HA COLCAOD ESE ID EN EL HTML
  //console.log("Contenedor:", login)
  
  //DATOS DE AUTH
  const email = signup["signup-email"].value;
  const password = signup["signup-password"].value;
  const confirmation = signup["signup2-password"].value;
/*
  //DATOS PARA REGISTRO
  const nombre = signup["nombre"].value;
  const apellidoPaterno = signup["apellidoPaterno"].value;
  const apellidoMaterno = signup["apellidoMaterno"].value;
  console.log(nombre + apellidoPaterno + apellidoMaterno)
*/
  

  try {
    if (password == confirmation) {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log(userCredential)

       
        // reset the form
    signup.reset();

    // show welcome message
    showMessage("Registrado: " + userCredentials.user.email);
    } else {
      showMessage("Las contraseñas no coinciden", "error")
    }
    

  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      showMessage("Email no disponible", "error")

    } else if (error.code === 'auth/invalid-email') {
      showMessage("Email inválido", "error")

    } else if (error.code === 'auth/weak-password') {
      showMessage("Contraseña débil", "error")

    } else if (error.code) {
      console.log(error)
      showMessage("Algo salió mal", "error")
    }
  }

});