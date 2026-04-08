
let todosLosObjetos = []  
let paginaActual = 1      
const porPagina = 5       

const lista = document.getElementById("lista")
const btnAnterior = document.getElementById("btn-anterior")
const btnSiguiente = document.getElementById("btn-siguiente")
const paginaTexto = document.getElementById("pagina-actual")


function mostrarPagina() {
    const inicio = (paginaActual - 1) * porPagina
    const fin = inicio + porPagina

    const objetosDeLaPagina = todosLosObjetos.slice(inicio, fin)

    lista.innerHTML = ""

    
    objetosDeLaPagina.forEach(objeto => {
        lista.innerHTML += `<p>${objeto.name}</p>`
    })

    paginaTexto.textContent = `Página ${paginaActual}`

    btnAnterior.disabled = paginaActual === 1
    btnSiguiente.disabled = fin >= todosLosObjetos.length
}


async function cargarObjetos() {
    const response = await fetch("https://api.restful-api.dev/objects")
    todosLosObjetos = await response.json()
    mostrarPagina()  
}


btnSiguiente.addEventListener("click", function() {
    paginaActual++        
    mostrarPagina()       
})


btnAnterior.addEventListener("click", function() {
    paginaActual--       
    mostrarPagina()       
})


cargarObjetos()