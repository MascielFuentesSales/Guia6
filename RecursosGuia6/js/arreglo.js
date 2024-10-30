// Accedemos al contenedor donde se mostrará los estudiantes
const containerArreglo = document.querySelector("#idContainerArreglo");
const containerArregloOrdenado = document.querySelector("#idContainerArregloOrdenado");

// Accedemos a cada botón por medio de la API DOM
const btnAgregar = document.querySelector("#idBtnAgregar");
const btnOrdenar = document.querySelector("#idBtnOrdenar");

// Agregamos el evento click a los botones y asignamos la función que realizará la operación
btnAgregar.addEventListener("click", agregarElemento);
btnOrdenar.addEventListener("click", ordenarElementos);

let arreglo = new Array();

function agregarElemento() {
    const numero = parseInt(document.querySelector("#inputNumero").value);

    // Verificando que sea un número
    if (isNaN(numero)) {
        alert("Debe ingresar un número válido");
    } else {
        // Agregamos un nuevo elemento al arreglo
        arreglo.push(numero);

        // Utilizamos la API DOM para crear un elemento HTML
        let caja = document.createElement("div"); // Creamos un elemento <div></div>
        caja.className = "col-md-1 colum"; // Agregamos una clase al elemento <div>

        let valor = document.createElement("h3"); // Creamos un elemento <h3></h3>
        valor.textContent = numero; // Agregamos texto al elemento <h3></h3>
        caja.appendChild(valor); // Pasamos como hijo la etiqueta <h3></h3> a nuestro <div>

        // Insertamos los nuevos elementos en el contenedor
        // Se utiliza 'beforeend' para insertar el nuevo elemento dentro del idContainerArreglo después de su último hijo
        containerArreglo.insertAdjacentElement("beforeend", caja);
    }
}

function ordenarElementos() {
    // Limpiamos el contenedor de los elementos ordenados para evitar duplicados
    containerArregloOrdenado.innerHTML = "";

    // Utilizamos sort() para ordenar el arreglo y luego mostramos los elementos
    for (let i of arreglo.sort((a, b) => a - b)) {
        let caja = document.createElement("div");
        caja.className = "col-md-1 colum-green";

        let valor = document.createElement("h3");
        valor.textContent = i;
        caja.appendChild(valor);

        containerArregloOrdenado.insertAdjacentElement("beforeend", caja);
    }
}