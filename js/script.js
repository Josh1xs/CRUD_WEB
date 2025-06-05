//Direccion del Endpoint generado en Retool
const API_URL = "https://retoolapi.dev/AYDTeb/integrantes_";

//Funcion que llama a la API y realiza una solicitud GET. Obtiene un JSON
async function ObtenerRegistros(){
    //Hacemos GET a la API  y obtenemos su respuesta (response)
    const respuesta = await fetch(API_URL)

    //Obtener los datos en formato JSON  a partir de la respuesta
    const data = await respuesta.json(); //Esto ya es un JSON

    //Llamamos a MostrarRegistros y le enviamos el JSON
    MostrarRegistros(data);
}


//Funcion para generar las filas de la tabla 
//"DATOS" representa al JSON
function MostrarRegistros(datos){
    
    //Se llama  al elemento tbody dentro de la tabla con id "tabla"
    const tabla =  document.querySelector("#tabla tbody");

    //PARA INYECTAR CODIGO HTML USAMOS innerHTML
    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.correo}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `;
    });
}

ObtenerRegistros();


//Proceso para agregar registros
const modal = document.getElementById("mdAgregar"); //Cuadro de dialogo
const btnAgregar = document.getElementById("btnAgregar"); //Boton para abrir 
const btnCerrar = document.getElementById("btnCerrarModal") //Cerrar

btnAgregar.addEventListener("click", ()=>{
    modal.showModal(); //Abre el modal cuando a btnAgregar se le hace clic
});

btnCerrar.addEventListener("click",()=>{
    modal.close(); //Cierra el modal
});

//Agregar un nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit, ",async e => {
    e.preventDefault(); //Evita  que los datos se envien por defecto
    //Capturar los valores del formulario
    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtCorreo").value.trim();

    //Validacion basica
    if(!nombre || !apellido || !correo){
        alert("Complete todos los campos");
        return; //Evita que el codigo se siga ejecutando
    }

    //Llamar a la API para enviar los datos
    const respuesta = await fetch(API_URL, {
        method: "POST", 
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({nombre,apellido,correo})
    });



    if(respuesta.ok){
        //Mensaje de Confirmacion
        alert("El registro fue agregado correctamente");     
    
        //Limpiar el formulario
        document.getElementById("frmAgregar").reset();

        //Cerrar el modal (dialog)
        modal.close();

        //Recargar la tabla
        ObtenerRegistros();
    }
    else{
        alert("Hubo un error al guardar");
    }
});