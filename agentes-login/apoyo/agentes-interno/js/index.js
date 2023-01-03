
//https://www.youtube.com/watch?v=itNsRn1kjLU -------------------
import {
  onGetTasks,
  saveTask,
  deleteTask,
  getTask,
  updateTask,
  getTasks,
} from "./firebase.js";


const taskForm = document.getElementById("agt-form");
const tasksContainer = document.getElementById("tasks-container"); //ES LA FUNCIÓN QUE GENERARÁ LA VENTANA DE ELEMENTOS EN BASE DE DATOS DONDE SE HA COLCAOD ESE ID EN EL HTML

let editStatus = false;
let id = "";


/*
taskForm.addEventListener("submit", async (e) => {  //AGREGAR NUEVAS ENTRADAS
  e.preventDefault();
  const mail = taskForm["agt-mail"];
  const predio = taskForm["agt-predio"];
  const referencia = taskForm["agt-refe"];
  const contacto = taskForm["agt-cel"];
  const descripcion = taskForm["agt-descripcion"];
  
  const timestamp = Date.now();
  let fecha = (new Date(timestamp)).toString( );  
  const photo = taskForm["agt-photo"];

  try {
    if (!editStatus) {
      console.log("prueba exitosa")
      await saveTask(
        mail.value, 
        predio.value, 
        referencia.value, 
        contacto.value, 
        descripcion.value,
        fecha
        ); //Se mandan todos los elementos obtenidos con .value directamente
    } else {
      console.log("prueba NO exitosa")
      await updateTask(id, {  //SI ES VERDADERA LA CONDICIÓN DE editrStatus SE CAMBIARÁN LOS DATOS POR LOS NUEVOS INGRESADOS, através del ID
        asunto: title.value,
        description: description.value,
        location: location.value,
        contact: contact.value,
        mail: mail.value,
      });

      editStatus = false;
      id = ""; //Se vacía la variable ID para buscar 
      taskForm["btn-agt-form"].innerText = "Save"; //Una vez que se actualizan los datos, se regresa a SAVE el texto en botón
    }

    taskForm.reset(); //Vacias los inputs una vez que se ha guardado la información
    mail.focus(); //regresar el cursor al título
  } catch (error) {
    console.log(console.log("ERROR:", error));
  }
});
*/




//CÓDIGO PARA BANDEJA DE ENTRADA --------- 
window.addEventListener("DOMContentLoaded", async (e) => { //Cuando se haya cargado la página, se ejecutará un evento
  // const querySnapshot = await getTasks();
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.data());
  // });

  onGetTasks((querySnapshot) => { //Este getTask se ve afectado por la función de "DOMContentLoaded", pues en cuanto carga
    //la página, obtiene los datos TAMBIÉN CUANDO SE ACTUALICE LA BASE DE DATOS
    tasksContainer.innerHTML = "";  //REINICIA LA TARJETA QUE MUESTRA DATOS ANTES DE COLOCAR LA ACTUALIZACIÓN DE DATOS
    querySnapshot.forEach((doc) => { //FireBase llama Query Snapshot a objetos que se pueden recorrer. FOR EACH es para REVISAR LOS DATOS 1 A 1
      const task = doc.data(); //Por cada documento que recorra, queremos ver los datos obtenidos
      //Cargará esta estructura HTML fijada en el HTML donde se encuentre el ID = TaskContainer
      //Se colocan como string " " para que HTML lo interprete y lo añada
      tasksContainer.innerHTML += `  
      <div class="tarjetas__titulo sombra separar-tarjetas">
        <h3 class="contenedor2" >${task.predio}</h3> 

        <div class="layout">
          <div class="grow1">
            <p> <span>- Descripción:</span> ${task.descripcion}</p>
            <p> <span>- Ubicación:</span> ${task.referencia}</p>
            <p> <span>- Contacto:</span> ${task.contacto}</p>
            <p> <span>- Mail:</span> ${task.mail}</p>
            <p> <span>- Llegada:</span> ${task.fecha}</p>
          </div>

          <div>
            <button class="btn btn-primary btn-delete boton " data-id="${doc.id}">
              Rechazar
            </button>

            <button class="btn btn-secondary btn-edit boton" data-id="${doc.id}">
                Asignar
            </button>
          </div>

        </div>
      </div>`;
      //con task.title obtiene los valres que están así guardados desde el DOC.data hecho que se guarda en la variable task
    });

     //RECHAZAR --------------- 
    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete"); //BORRAR SOLICITUDES
    //Se le pide al documento SELECCIONAR TODOS LOS ELEMENTOS QUE TIENE esa clase de btn-delete y

    btnsDelete.forEach((btn) => //Se recorren todos los botones
      btn.addEventListener("click", async ({ target: { dataset } }) => { //Se busca en evento CLICK buscando encontrar una interacción
        try {
          await deleteTask(dataset.id); //Con dataset.id se obtiene nada más el ID del dato del botón y se borra con DELETE TASK, objeto creado en firebase.js
        } catch (error) {
          console.log(error);
        }
      })
    );


      //ASIGNAR --------------- 
    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit"); //EDITAR LAS ENTRADAS EXISTENTES
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);  //Se muestran los datos que tiene ese ID
          
          const task = doc.data(); //Se guarda la infornación de doc en task
          taskForm["task-title"].value = task.title; //Desde Taskform, en su propiedad title, voy a asignarle el valor en title
          taskForm["task-description"].value = task.description;

          editStatus = true;  //En caunto se presiona editar en cualquiera de las opciones, se cambia el texto dentro del botón
          id = doc.id;

          taskForm["btn-task-form"].innerText = "Update";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});
