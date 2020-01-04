let botonesMaquina = []
let botonesHumano = []
const $indicador = document.querySelector("#indicador")
const $botonInicio = document.querySelector("#iniciar")
const $botones = document.querySelectorAll(".boton")

$botonInicio.onclick = function () {
    reset ()
    manejarRonda ();
}

function manejarRonda () {
    blockUser ()

    $indicador.innerText = "Turno de la Maquina"
    
    const nuevoBoton = generarNuevoBoton ()
    botonesMaquina.push(nuevoBoton)

    const TIEMPO = botonesMaquina.length + 2 *1000

    botonesMaquina.forEach(
        function($boton, index){
            const TIEMPO = (index + 1) * 1000
            setTimeout(
                function () {
                    resaltar($boton)
                }, TIEMPO)
        }
    )

    setTimeout(function () {
        $indicador.innerText = "Turno del Usuario"
        desblockUser()
    }, TIEMPO)

    botonesHumano = []
}


function turnoHumano (e) {
    console.log("desbloqueado")
    const $boton = e.target
    resaltar($boton)
    botonesHumano.push($boton)
    compararBotones()
}

function resaltar($boton) {
    $boton.style.opacity = 1;
    setTimeout(function() {
      $boton.style.opacity = 0.5;
    }, 500);
  }

function generarNuevoBoton () {
    const indice = Math.floor(Math.random()*$botones.length)
    return $botones[indice]
}

function blockUser (){
    $botones.forEach(function ($boton){
        $boton.onclick = function () {console.log ("bloqueado")}
    })
}

function desblockUser () {
    $botones.forEach(function($boton){
        $boton.onclick = turnoHumano
    })
}

function compararBotones () {
    for (i=0; i<botonesHumano.length; i++) {
    if (botonesHumano[i] !== botonesMaquina[i]){
        blockUser()
        alert ("Perdiste")
        reset()
    }else if (botonesHumano.length === botonesMaquina.length) {
        manejarRonda()
    }
}
}

function reset () {
    botonesMaquina = []
    botonesHumano = []
}