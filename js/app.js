const input = document.querySelector(".input-tarea");
const btn_add = document.querySelector(".button-add");
const todoList = document.querySelector(".lista-tareas");
const btn_clear = document.querySelector(".button-clear");
let listArray = [];
app();

function app() {
  cargarTareas();
}
btn_add.addEventListener('click',()=>{
  agregarTarea()
});



function agregarTarea(){
  let valor_input = input.value;
  let datos_LocalStorage = localStorage.getItem("New Todo");
  if (datos_LocalStorage != null) {
    listArray = JSON.parse(datos_LocalStorage);
  }
  if (!valor_input.trim()) {
    mostrarAlerta('Escriba algo no seas imbecil','alerta')
    return;
  }
  let tareaObj = {
    tarea : valor_input,
    estado: false
  }
  listArray.push(tareaObj);
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  cargarTareas();
};

function cargarTareas() {
  limpiarHTML();

  let datos_LocalStorage = localStorage.getItem("New Todo");
  if (datos_LocalStorage != null) {
    listArray = JSON.parse(datos_LocalStorage);
  }
  if (listArray.length == 0) {
    btn_clear.disabled = true;
    btn_clear.classList.add('lock')
    mostrarAlerta('No hay tareas disponibles','vacio')
  } else {
    btn_clear.disabled = false;
    btn_clear.classList.remove('lock')
  }

  listArray.forEach((element, index) => {
    const {tarea,estado} = element
    //Create Element
    const contTarea = document.createElement('DIV')
    const liTarea = document.createElement("LI");
    const btnBorrar = document.createElement("BUTTON");
    const btnEstado = document.createElement('BUTTON')
    //Classlist
    contTarea.classList.add('contenedor-tarea')
    liTarea.classList.add('contenedor-tarea__li')
    btnBorrar.classList.add('contenedor-tarea__button')
    btnEstado.classList.add('contenedor-tarea__button-estado')
    //ApendChild
    contTarea.appendChild(liTarea)
    contTarea.appendChild(btnEstado)
    contTarea.appendChild(btnBorrar)
    liTarea.textContent = tarea;
    btnBorrar.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="44" height="3rem" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="4" y1="7" x2="20" y2="7" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /> </svg>'
    //Condicionales
    if(estado==false){
      btnEstado.textContent = 'No realizado'
      btnEstado.classList.add('no-realizado')
    }else{
      btnEstado.textContent='Realizado'
      btnEstado.classList.add('realizado')
    }
    if(tarea.length>90 && window.innerWidth>=760){
      liTarea.classList.add('scroll')
    }
    if(tarea.length>40 && window.innerWidth<760){
      liTarea.classList.add('scroll')
    }
    //Eventos de buttons
    btnEstado.dataset.id=index
    btnEstado.onclick=()=>modificarTarea(index)
    btnBorrar.onclick = () => eliminarTarea(index)
    todoList.appendChild(contTarea);
  });

  input.value = "";
}

btn_clear.onclick = () => {
  listArray = [];
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  cargarTareas();
};
function limpiarHTML() {
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
}
function mostrarAlerta(mensaje,tipo){
  const parrafo = document.createElement('P')
  parrafo.textContent=mensaje
  parrafo.classList.add('parrafo')
  switch(tipo){
    case 'alerta':
      parrafo.classList.add('parrafo-alerta')
      todoList.appendChild(parrafo)
      setTimeout(() => {
        parrafo.remove()
      }, 2000);
      break;
    case 'vacio':
      parrafo.classList.add('parrafo-vacio')
      todoList.appendChild(parrafo)
      break;
  }
 
}

function eliminarTarea(index) {
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    cargarTareas();

}

function modificarTarea(index) {
  listArray.forEach((tarea,i)=>{
    if(i==index){
      if(tarea.estado){
        tarea.estado=false
      }else{
        tarea.estado=true
      }
    }
  })
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  cargarTareas()
}