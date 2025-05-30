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