// Array Principal
let playlist = []

// Variables
let numeroDeCanciones = 0, bandera = true, nombreDeCancion, existe, nombre


// Funcion para sincronizar el array con el Local Storage
const recuperarPlaylist = () => {
    // Vacio el array
    playlist = []
    numeroDeCanciones = 0
    // Ciclo for que itera sobre la longitud del Local Storage y va agregando los elementos ya almacenados anteriormente
    for (let i = 1; i <= localStorage.length + 1; i++) {
        // Variable para conseguir el nombre de la cancion
        nombre = localStorage.getItem("Cancion " + i)
        // En caso de eliminar un elemento (que apareceria como null), simplemente lo salteamos y seguimos iterando el proximo elemento
        if (nombre !== null) {
            // Metodo push para agregar el elemento al array
            numeroDeCanciones++
            playlist.push({numero: numeroDeCanciones, nombre: nombre})
        }
    }
    // Invoco a la funcion para actualizar el Local Storage
    limpiarStorage(playlist)
}


// Funcion para limpiar y volver a almacenar los elementos que se encuentran dentro del array
const limpiarStorage = (array) => {
    localStorage.clear()
    for (const i of array) {
        localStorage.setItem("Cancion " + i.numero, i.nombre)
    }
}

// Condicional para verificar si el Local Storage esta vacio o no. Si lo esta, no invocamos la funcion.
if (localStorage.length > 0) {
    recuperarPlaylist()
}



// Funcion para agregar una cancion al array
// Parametros: (numero de la ultima cancion, nombre de la cancion a agregar)
const agregarCancion = (numero, cancion) => {
    // Agregamos +1 para sumar una cancion
    numeroDeCanciones++
    // Agrega el elemento al array
    playlist.push({numero: numero + 1, nombre: cancion})
    // Agrega el elemento al Local Storage
    localStorage.setItem("Cancion " + numeroDeCanciones, cancion)
}


// Funcion para Eliminar Cancion (en esta se me complico mucho, por el tema que lo elimina pero lo deja como null...)
// Parametros: (nombre de la cancion, array donde almacena las canciones)
const eliminarCancion = (cancion, array) => {
    // Metodo .find() para buscar el objeto dentro del array. Comparandolo con la cancion ingresada por el usuario
    let objeto = array.find(el => ((el.nombre).toLowerCase() === cancion.toLowerCase()))
    // Agarramos unicamente el numero del objeto (key)
    let numeroDeCancion = objeto.numero
    // Eliminamos el elemento del Local Storage
    localStorage.removeItem("Cancion " + numeroDeCancion)
    // Actualizamos el array para descartar el objeto eliminado
    recuperarPlaylist()
}



// Contenedor Princial
const divContenedorPricipal = document.createElement("div")
const titulo = document.createElement("h1")
const botonDarkMode = document.createElement("div")
const contenedorSecundario = document.createElement("h2")

// Asociamos los nodos hijos con el padre (divContenedorPricipal)
divContenedorPricipal.appendChild(titulo)
divContenedorPricipal.appendChild(botonDarkMode)
divContenedorPricipal.appendChild(contenedorSecundario)


// div contenedor
const contenedor = document.getElementById("contenedor")
contenedor.appendChild(divContenedorPricipal)


// Fondo
const fondoPrincipal = document.getElementById("fondo")



// Titulo Principal
titulo.innerText = "Simulador de Playlist"
titulo.classList.add("titulo")



// Boton Dark Mode
botonDarkMode.innerHTML = "<input type='button' value='Dark Mode'>"
botonDarkMode.addEventListener("click", respuestaClick = () => {
    fondo.classList.toggle("black")
    titulo.classList.toggle("textWhite")
    contenedorSecundario.classList.toggle("textWhite")
})


// Mi Playlist: + Botones de "Agregar" y "Eliminar"
contenedorSecundario.innerHTML = "Mi Playlist: <br><input id='botonAgregar'type='button' value='Agregar'><br><input id='botonEliminar'type='button' value='Eliminar'>"
const botonAgregar = document.getElementById("botonAgregar")
const botonEliminar = document.getElementById("botonEliminar")

// Evento Boton "Agregar"
botonAgregar.addEventListener("click", respuestaClick = () => {
    
    // Condicional para ver si quiere agregar una cancion mas
    if (confirm("Desea agregar una cancion?")) {
        // Pedimos el nombre de la cancion mediante un "prompt"
        nombreDeCancion = prompt("Nombre de la cancion:")
        // Condicional para chequear si existe la cancion.
        // Si existe muestra un mensaje que avisa que ya estaba agregada.
        if (playlist.find(el => ((el.nombre).toLowerCase() === nombreDeCancion.toLowerCase()))) {
            alert("Ya ha sido agregada anteriormente!")
        }
        // Si no existe, la agrega al array y al localStorage
        else {
            agregarCancion(numeroDeCanciones, nombreDeCancion)
            alert("Cancion agregada!")
        }
    }
})


// Evento Boton "Eliminar"
botonEliminar.addEventListener("click", respuestaClick = () => {
    // Pedimos el nombre mediante un "prompt"
    nombreDeCancionAEliminar = prompt("Nombre de cancion:")
    // Condicional para chequear la igualdad entre la cancion ingresada por el usuario y las canciones almacenadas en el array
    if (playlist.find(el => ((el.nombre).toLowerCase() === nombreDeCancionAEliminar.toLowerCase()))) {
        // Invocamos la funcion para eliminar la cancion y mostramos un mensaje
        eliminarCancion(nombreDeCancionAEliminar, playlist)
        alert("Cancion eliminada")
    } else {
        // En caso contrario, muestra un mensaje de advertencia
        alert("No existe esa cancion dentro de la Playlist")
    }
})