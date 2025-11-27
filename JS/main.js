// ✅ Confirmación de carga
console.log("✅ El archivo script.js está conectado");

const btnClaroOscuro = document.getElementById('btnClaroOscuro');
btnClaroOscuro.addEventListener('click', () =>{
  if(document.body.classList.contains ('oscuro')){
    document.body.classList.replace('oscuro', 'claro');
    console.log ("Modo claro Activado");

  }else {
    document.body.classList.replace('claro', 'oscuro');
    console.log("Modo Oscuro Activado");
  }
});
// --- MODAL IMPORTANTE ---
const btnimportante = document.getElementById('btnimportante');
const modal = document.getElementById('modalImportante');
const btnCerrar = document.getElementById('btnCerrar');
const prrfimportante = document.getElementById('prrfimportante');

btnimportante.addEventListener('click', () => {
  modal.classList.remove('oculto');
  modal.classList.add('visible');

  prrfimportante.classList.remove('oculto');
prrfimportante.classList.add('visible');
});


btnCerrar.addEventListener('click', () => {
  modal.classList.add('oculto');
  modal.classList.remove('visible');

  prrfimportante.classList.remove('visible');
prrfimportante.classList.add('oculto');
});

// --- FORMULARIO DE REGISTRO ---
let usuarios = [];
let isUserLoggedIn = false;
let usuarioActual = null;

// registro de usuario
document.getElementById('formRegistro').addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const email = document.getElementById('email').value;
  const pass = document.getElementById('contrasenia').value;
  const telefono = document.getElementById('telefono').value;

  usuarios.push({nombre, apellido, email, pass, telefono});
  alert("¡Gracias por registrarte! 🧶 Te damos la bienvenida a Tejiendo Sueños 💚");

  // ocultar registro y mostrar login
  document.getElementById('registro').classList.add('oculto');
  document.getElementById('login').classList.remove('oculto');
});

// login de usuario
document.getElementById('formLogin').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const pass = document.getElementById('loginPass').value;

 // buscar usuario por email
  const user = usuarios.find(u => u.email === email);

  if(!user){
    // no existe ese email en la lista de usuarios
    alert("El email no está registrado");
    return;
  }

  if(user.pass !== pass){
    // email correcto pero contraseña incorrecta
    alert("Contraseña incorrecta");
    return;
  }

  //  login correcto
  isUserLoggedIn = true;
  usuarioActual = user;
  alert("Bienvenido " + user.nombre);
  document.getElementById('login').classList.add('oculto');
  document.getElementById('cursos').classList.remove('oculto');

});




// --- CURSOS ---
const btncrochet = document.getElementById('btncrochet');
const btndosagujas = document.getElementById('btndosagujas');
const btncircular = document.getElementById('btncircular');
const formuEmergCurso = document.getElementById('formuEmergCurso');
const cursoselec = document.getElementById('cursoselec');
const cerrarForm = document.getElementById('cerrarForm');
const tablabody = document.getElementById('tablabody');
const template = document.getElementById('rowtemplate');
let inscripciones = []; 

// funcion para abrir el formulario emergente
function abrirformulario(curso){
  if (!isUserLoggedIn){
    alert("Debes iniciar sesión para inscribirte!");
    return;
  }
  cursoselec.value = curso;
  formuEmergCurso.classList.remove('oculto');
}
btncrochet.addEventListener('click', () => abrirformulario("Crochet"));
btndosagujas.addEventListener('click', () => abrirformulario("2 Agujas"));
btncircular.addEventListener('click', () => abrirformulario("Circular"));
cerrarForm.addEventListener('click', () =>{
  formuEmergCurso.classList.add('oculto');
});

//enviar formulario
document.getElementById('formuInsc').addEventListener('submit', (e)=> {
  e.preventDefault();
  if (!isUserLoggedIn){
    alert("Debes iniciar sesión para inscribirte!");
    return;
  }
  const name = usuarioActual.nombre;
  const apellidoo = usuarioActual.apellido;
  const emaill = usuarioActual.email;
  const curso = cursoselec.value;
  const dia = document.getElementById('dias').value;
  const hora = document.getElementById('hora').value;
  const pago = document.getElementById('pago').value;
  const estado = "pendiente";

  //guardar inscripcion
  inscripciones.push({name, apellidoo, emaill, curso, dia, hora, estado, pago, completada: false});

  //mostrar en table
  mostrarInscripcion();
  //const tablabody = document.getElementById('tablabody');
  //const template = document.getElementById('rowtemplate');
  alert("Gracias por inscribirte");
  formuEmergCurso.classList.add('oculto');

});

const formAdministrador = document.getElementById('formAdministrador');
const panelAdmin = document.getElementById('panelAdmin');
const loginAdministrador = document.getElementById('loginAdministrador');

formAdministrador.addEventListener('submit', (e)=> {
  e.preventDefault();
  const user = document.getElementById('admiUser').value;
  const pass = document.getElementById('admiPass').value;
// validar q se use esta contraseña y usuario
if(user === "mica"){
  if(pass === "1234"){
    // login correcto
    loginAdministrador.classList.add('oculto');
    panelAdmin.classList.remove('oculto');
  } else {
    // usuario correcto pero contraseña incorrecta
    alert("Contraseña incorrecta");
  }
} else {
  // usuario incorrecto
  alert("Usuario incorrecto");
}
});



//funcion para mostrar inscrip. en el panel del adm
function mostrarInscripcion(){
  tablabody.innerHTML = "";
  inscripciones.forEach((insc, index) => {
    console.log(insc);
    const clone = template.content.cloneNode(true);

    clone.querySelector('.row-nombre').textContent = insc.name;
    clone.querySelector('.row-apellido').textContent = insc.apellidoo;
    clone.querySelector('.row-email').textContent = insc.emaill;
    clone.querySelector('.row-curso').textContent = insc.curso;
    clone.querySelector('.row-dia').textContent = insc.dia;
    clone.querySelector('.row-hora').textContent = insc.hora;
    clone.querySelector('.row-estado').textContent = insc.estado;
    clone.querySelector('.row-pago').textContent = insc.pago;

    //check
    const check = clone.querySelector('.row-check');
      check.checked = insc.completada;
      check.addEventListener('change', () => {
        inscripciones[index].completada = check.checked;
        inscripciones[index].estado = check.checked ? "Completada" : "Pendiente";
        mostrarInscripcion();
      });
      if (insc.completada){
        clone.querySelector('tr').classList.add('completada');
      }
    

    //boton de eliminar
    clone.querySelector('.btn-delete').addEventListener('click', () =>{
      inscripciones.splice(index, 1);
      mostrarInscripcion();
      
    });

    //boton editar
    clone.querySelector('.btn-edit').addEventListener('click', ()=>{
      inscripciones[index].estado = "Confirmado";
      mostrarInscripcion();
    });
    tablabody.appendChild(clone);
  });
}


// --- COMENTARIOS ---
const formcomentario = document.getElementById('formcomentario');
const mensajeconfirmacion = document.getElementById('mensajeconfirmacion');

formcomentario.addEventListener('submit', function(e) {
  e.preventDefault();
  mensajeconfirmacion.textContent = '¡Gracias por tu mensaje! 🧶 Lo leemos con mucho cariño 💚';
  mensajeconfirmacion.classList.remove('oculto');
  mensajeconfirmacion.classList.add('visible');
  formcomentario.reset();

  setTimeout(() => {
    mensajeconfirmacion.classList.remove('visible');
    mensajeconfirmacion.classList.add('oculto');
  }, 4000);
});