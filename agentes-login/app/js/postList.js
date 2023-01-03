import { auth } from "./firebase.js"; //Para obtener el correo con el que está iniciada la sesión
const postList = document.getElementById("posts");
var paso = 0;


export const setupPosts = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const task = doc.data();
      //console.log(task.correo)
      
      const footer = document.getElementById("footer")
      footer.classList.add("footer-obligado") //Iniciada la sesión, se obliga al footer mantenerse abajo


      auth.onAuthStateChanged(function (user) { //Se busca el usuario con el que se inició sesión
        if (user.email === task.correo) {
          // El usuario está logueado, realiza acciones aquí
          console.log("está logueado", user.email)
          const li = `
          <main class="container-flex">
            <hr>
            <div class="reception" >
                <p class="subtitle-reception">Agentes de Excelencia</p>
                <h1>Hola, <a class="reception-a active-modal" href="../../apoyo/agentes-interno/inicio.html"> ${task.nombre}
                </a>. Accede a tu Bandeja</h1>
            </div>

            <div class="menu-lat">
                <div class="v-line"></div>
                <div class="bloque-menu">
                    <p class="subtitle-reception">Herramientas</p>
                    <div class="menu-lat-option">
                        <label for="">01</label>
                        <a href="">Tickets Abiertos</a>
                    </div>
                    <div class="menu-lat-option">
                        <label for="">02</label>
                        <a href="">Generar Informe</a>
                    </div>
                    <div class="menu-lat-option">
                        <label for="">03</label>
                        <a href="">Visualizar Estadísticas</a>
                    </div>
                </div>
            </div>
          </main>
            `;
          html += li;
          postList.innerHTML = html;
          paso = 1;


        } else {
          if (paso == 0) {
            console.log("No coinciden " + user.email + " con "+ task.correo);
             postList.innerHTML = ``;

             /*const nullo = `
              `;
            html += nullo;
            postList.innerHTML = html;*/
          }
        }

      });
      
    });
    


  } else {
    postList.innerHTML = ``;
    postList.innerHTML = '<h4 class="">Inicia sesión para acceder a la Bandeja</h4>';
  }
};