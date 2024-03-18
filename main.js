// Constante de un "array" para guardar todas las canciones.
const playlist = []

// Variable de bandera para condicion del ciclo "while".
let bandera = true


// Funcion para agregar una cancion a la playlist mediante un "prompt".
const agregarCancion = () => {
    const cancion = prompt("Nombre de cancion: ")
    playlist.push(cancion)
}

// Funcion para eliminaar una cancion de la playlist, chequeando mediante un ciclo "for of" si está o no dentro del array.
const eliminarCancion = () => {
    const nombreCancion = prompt("Nombre de cancion: ")
    let existe = false
    for (cancion of playlist) {
        if (cancion.toLowerCase() === nombreCancion.toLowerCase()) {
            playlist.splice(playlist.indexOf(nombreCancion), 1)
            existe = true
        }
    }
    // Condicional "if", si existe la cancion, se elimina de la playlist. Si no existe la cancion, muestra un mensaje avisando que no se encuentra dentro de la playlist.
    if (existe) {
        alert("Cancion eliminada!")
    } else {
        alert("No se encuentra esa cancion...")
    }
}


// Mensaje de Bienvenida.
const nombrePlaylist = prompt("Hola, te damos la bienvenida al Simulador de Playlist!\nPara empezar, pongamosle un nombre a tu Playlist: ")
alert("Playlist " + nombrePlaylist + " creada!")

// Pregunta para agregar canciones. Mediante un confirm, validamos si quiere o no, agregar una cancion.
if (confirm("Desea agregar alguna cancion?")) {
    agregarCancion()
    alert("Cancion agregada!")
    // Ciclo while para seguir preguntando las opciones.
    while (bandera) {
        // Switch para tener distintas respuestas a cada opcion
        switch (Number(prompt("Que desea hacer?\n1. Agregar otra cancion.\n2. Eliminar una cancion.\n3. Salir."))) {
            case 1:
                alert("Bien, agreguemos otra cancion a tu Playlist!")
                agregarCancion()
                alert("Cancion agregada!")
                break;
            case 2:
                alert("Bien, vamos a eliminar una cancion")
                eliminarCancion()   
                break;
            case 3:
                alert("Playlist " + nombrePlaylist + " finalizada.\nPor consola mostraremos los resultados!")
                console.table(playlist)
                bandera = false
                break;
            default:
                alert("Esa opcion no existe, simulacion terminada.")
                bandera = false
                break;
        }
    }
} else {
    alert("Que pena, la Playlist quedo vacia...")
}