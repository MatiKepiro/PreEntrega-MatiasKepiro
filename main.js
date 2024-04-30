// Array Principal
const playlist = []
const elementoPrincipal = document.getElementById("main")
const setFisico = document.getElementById("setFisico")
const botonSet = document.getElementById("set")
const cancionesDOM = document.getElementById("canciones")


/*
// Variables
let numeroDeCanciones = 0, bandera = true, nombreDeCancion, existe, nombre
*/

// Inicio Clase
// Clase para toda la logica del Set de Playlist (Las canciones guardadas)
class SetDePlaylist {
    constructor() {
        // Constructor para crear obtener las canciones
        this.canciones = JSON.parse(localStorage.getItem('set')) || []
    }

    // Funcion para agregar un cancion
    agregarCancion(cancion) {
        // Chequeo si existe la cancion o no
        const cancionExistente = this.canciones.find(e => e.nombre === cancion.nombre)
        
        //  Si existe, le agregamos +1 a la cantidad
        if (cancionExistente) {
            cancionExistente.cantidad++
        }
        // Si no existe, la agregamos
        else {
            cancion.cantidad = 1
            this.canciones.push(cancion)
        }

    // Actualizamos el Local Storage
    this.guardarSet()
    
    } 

    // Guardamos las canciones en el Local Storage como 'set'
    guardarSet() {
        localStorage.setItem('set', JSON.stringify(this.canciones))
    }



    // Borramos los datos del Local Storage y del array
    limpiarSet() {
        localStorage.removeItem('set')
        this.canciones = []
    }
}
// Fin Clase


// Creamos el Set de Playlist
const miSet = new SetDePlaylist()



// Funcion para crear la tarjeta de cada cancion
// Entrando como parametros, 1. Nombre 2. Autor 3. Imagen.
function crearTarjetaDeCancion({nombre, autor, imagen}) {
    elementoPrincipal.innerHTML += `
        <div class= "contenedorImagen">
            <img src="${imagen}" />
            <div>
                <div>
                    <h3 class="nombre">${nombre}</h3>
                    <p class="autor">${autor}<p/>
                </div>
                <div class="contenedorBoton">
                    <button id="colorBoton" class="agregar">Agregar</button>
                </div>
            </div>
        </div>
    `
}

// Buscamos todos los datos necesarios del archivo .json para poder crear cada tarjeta de las canciones
fetch("info.json")
.then(datos => {
    if(!datos.ok) {
        // Si tira algun error, lo mostramos
        throw new Error("Error al traer los datos")
    } 
    // Si todo esta ok, me retorna los datos del .json
    else {
        return datos.json()
    }
})
.then(elementos => {
    // Metodo .forEach para poder crear cada tarjeta con cada cancion
    elementos.canciones.forEach(elemento => {
        crearTarjetaDeCancion(elemento)
    });
    agregarEvento()
})
// Si hay algun error, lo atrapa y lo muestra
.catch(e => {
    console.error("Hubo un error al operar el fetch " + e.message)
})


// Mostramos el Set de Playlist
// Funcion general
function mostrarSet() {

    // Vaciamos el HTML del Set Fisico
    setFisico.innerHTML = ""

    // Creamos el nuevo array
    miSet.canciones.map(cancion => {
        setFisico.innerHTML += `
        <div class="cancionEnSet">
            <p class="nombreCancion">${cancion.nombre}</p>
            <div class="cantidad">
                <p>${cancion.cantidad}</p>
            </div>
        </div>`
    })

    // Agregamos el boton de "borrar" y "cancelar"
    setFisico.innerHTML += `
    <div>
        <button id="borrar">Terminar Playlist</button>
        <button id="cancelar"> Cancelar Playlist</button>
    </div>`

    // Agregamos evento al boton "cancelar"
    const cancelar = document.getElementById("cancelar")
    // Evento para cancelar la creacion de la playlist
    cancelar.addEventListener("click", () => {
        miSet.limpiarSet()
        Swal.fire({
            icon: "error",
            title: "Su Playlist fue cancelada",
        })
        mostrarSet()
    })


    // Agreagamos evento al boton "eliminar"
    const borrar = document.getElementById("borrar")
    // Evento para eliminar y vaciar la playlist terminada
    borrar.addEventListener("click", () => {
        miSet.limpiarSet()
        Swal.fire({
            title: "Playlist terminada!",
            text: "Su playlist fue creada con exito!",
            icon: "success"
        })
        mostrarSet()
    })
}


// Funcion para agregar el evento "agregar" a cada boton
function agregarEvento() {
    // Buscamos el boton de agregar
    const botones = document.getElementsByClassName("agregar")
    // Lo transformamos en un array
    const arrayBotones = Array.from(botones)

    // Metodo .map para que por cada boton le agrege un evento "click"
    arrayBotones.map(boton => {
        boton.addEventListener("click", e => {
            let nombre = e.target.parentElement.parentElement.children[0].children[0].innerText
            // Agregamos la cancion al set
            miSet.agregarCancion({
                nombre,
                cantidad: 1,
            })

            // Mostramos una notificacion de exito
            Swal.fire({
                title: `¡Su cancion ${nombre} se agrego correctamente!`,
                icon: "success",
                width: "350px"
            });

            mostrarSet()
        })
    })
}

// Agregamos evento al set para que se active o desactive cada vez que clickeamos para ver el set
botonSet.addEventListener("click", () => {
    setFisico.classList.toggle(`active`)
})