// Accediendo a los elementos HTML
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");
const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");
const notificacion = document.getElementById("idNotificacion");
const mensaje = document.getElementById("idMensaje");

// Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);

// Componente modal
const idModal = document.getElementById("idModal");

// Arreglo global de pacientes
let arrayPaciente = [];
let currEdit = -1;
let editing = false;

// Función para limpiar el formulario al cargar la página o al presionar el botón de limpiar
const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";
    inputNombre.focus();
};
// Función para validar el ingreso del paciente
const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo = inputRdMasculino.checked
        ? "Hombre"
        : inputRdFemenino.checked
        ? "Mujer"
        : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != ""
    ) {

        if (editing) {
            arrayPaciente[currEdit] = [nombre, apellido, fechaNacimiento, sexo, labelPais, direccion];
            
            // Asignando un mensaje a nuestra notificación
            mensaje.innerHTML = "Paciente editado correctamente";
            
            // Llamando al componente de Bootstrap
            toast.show();
        } else {
            // Agregando información al arreglo de pacientes
            arrayPaciente.push([nombre, apellido, fechaNacimiento, sexo, labelPais, direccion]);

            // Asignando un mensaje a nuestra notificación
            mensaje.innerHTML = "Se ha registrado un nuevo paciente";
            
            // Llamando al componente de Bootstrap
            toast.show();
        }

        editing = false;
        // Limpiando formulario
        limpiarForm();
    } else {
        // Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Faltan campos por completar";
        
        // Llamando al componente de Bootstrap
        toast.show();
    }
};
// Función que imprime las filas de los pacientes registrados
function imprimirFilas() {
    let $fila = "";
    let contador = 1;
    
    arrayPaciente.forEach((element) => {
        $fila += `<tr>
            <td scope="row" class="text-center fw-bold">${contador}</td>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td>${element[2]}</td>
            <td>${element[3]}</td>
            <td>${element[4]}</td>
            <td>${element[5]}</td>
            <td>
                <button id="idBtnEditar${contador}" type="button" class="btn btn-primary" alt="Editar" onclick="editarPaciente(${contador-1})">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button id="idBtnEliminar${contador}" type="button" class="btn btn-danger" alt="Eliminar" onclick="eliminarPaciente(${contador-1})">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>`;
        contador++;
    });
    return $fila;
}

const imprimirPacientes = () => {
    let $table = `<div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <tr>
                <th scope="col" class="text-center" style="width: 5%">#</th>
                <th scope="col" class="text-center" style="width: 15%">Nombre</th>
                <th scope="col" class="text-center" style="width: 15%">Apellido</th>
                <th scope="col" class="text-center" style="width: 10%">Fecha nacimiento</th>
                <th scope="col" class="text-center" style="width: 10%">Sexo</th>
                <th scope="col" class="text-center" style="width: 10%">Pais</th>
                <th scope="col" class="text-center" style="width: 25%">Dirección</th>
                <th scope="col" class="text-center" style="width: 10%">Opciones</th>
            </tr>
            ${imprimirFilas()}
        </table>
    </div>`;

    document.getElementById("idTablaPacientes").innerHTML = $table;
};
// Contador global de los options correspondientes
// al select (cmb) pais
let contadorGlobalOption = cmbPais.children.length;

const addPais = () => {
    let paisNew = inputNombrePais.value;
    if (paisNew !== "") {
        // Creando nuevo option con la API DOM
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        // Agregando el nuevo option en el select
        cmbPais.appendChild(option);
        contadorGlobalOption++;

        // Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "País agregado correctamente";
        
        // Llamando al componente de Bootstrap
        toast.show();
    } else {
        // Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Faltan campos por completar";
        
        // Llamando al componente de Bootstrap
        toast.show();
    }
};
// Función para editar un paciente
const editarPaciente = (index) => {
    if (arrayPaciente[index]) {

        currEdit = index;
        editing = true;

        const paciente = arrayPaciente[index];
        // Aquí podrías llenar el formulario con los datos del paciente seleccionado
        inputNombre.value = paciente[0];
        inputApellido.value = paciente[1];
        inputFechaNacimiento.value = paciente[2];
        if (paciente[3] === "Hombre") {
            inputRdMasculino.checked = true;
        } else {
            inputRdFemenino.checked = true;
        }
        cmbPais.value = paciente[4]; // Suponiendo que el valor de país está en el índice 4
        inputDireccion.value = paciente[5];
    }
};

// Función para eliminar un paciente
const eliminarPaciente = (index) => {
    if (arrayPaciente[index]) {
        arrayPaciente.splice(index, 1); // Eliminar el paciente del arreglo
        imprimirFilas(); // Llamar a la función para volver a mostrar la tabla de pacientes
        mensaje.innerHTML = "Paciente eliminado";
        toast.show(); // Mostrar notificación
    }
};

// Agregando eventos a los botones y utilizando funciones tipo flecha
buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
    addPaciente();
};

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
    addPais();
};


// Se agrega el focus en el campo nombre país del modal
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

// Ejecutar función al momento de cargar la página HTML
limpiarForm();
