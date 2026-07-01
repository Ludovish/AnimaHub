//Elementos DOM
const btnNuevo = document.getElementById('btn-nuevo');
const btnVer = document.getElementById('btn-ver');
const vistaFormulario = document.getElementById('vista-formulario');
const vistaLista = document.getElementById('vista-lista');
const formMascota = document.getElementById('form-mascota');

//Ver Formulario
btnNuevo.addEventListener('click', () => {
    vistaFormulario.classList.remove('oculta');
    vistaFormulario.classList.add('activa');
    vistaLista.classList.remove('activa');
    vistaLista.classList.add('oculta');
});

//Ver Lista de Mascotas
btnVer.addEventListener('click', () => {
    vistaLista.classList.remove('oculta');
    vistaLista.classList.add('activa');
    vistaFormulario.classList.remove('activa');
    vistaFormulario.classList.add('oculta');
});

// >>   Validación del Formulario   << 

formMascota.addEventListener('submit', (evento) => {
    evento.preventDefault(); 

    let formularioValido = true;

    //Acá obtenemos los valores de las casillas del formulario.
    const nombre = document.getElementById('nombreMascota');
    const tipo = document.getElementById('tipoAnimal');
    const edad = document.getElementById('edadMascota');
    const foto = document.getElementById('fotoMascota');
    const dueno = document.getElementById('nombreDueno');
    const residencia = document.getElementById('residencia');

    //Condicional "Nombre de la Mascota" que se haya colocado y que tenga cierta longitud.
    if (nombre.value.trim() === '') {
        mostrarError(nombre, 'El nombre de la mascota es obligatorio.');
    } else if (nombre.value.trim().length < 2) {
        mostrarError(nombre, 'El nombre debe tener al menos 2 caracteres.');
    } else {
        mostrarExito(nombre);
    }

    //Condicional "Tipo de animal" que se haya colocado algo.
    if (tipo.value.trim() === '') {
        mostrarError(tipo, 'Ingrese el tipo de animal.');
    } else {
        mostrarExito(tipo);
    }

    //Condicional "Edad de la mascota" que el numero no sea negativo.
    if (edad.value === '' || parseInt(edad.value) < 0) {
        mostrarError(edad, 'Ingrese una edad válida (0 o mayor).');
    } else {
        mostrarExito(edad);
    }

    //Condicional "Foto de la mascota" que sea una URL válida y que no este vacia.
    const urlPattern = /^(https?:\/\/)/i;
    if (foto.value.trim() !== '' && !urlPattern.test(foto.value)) {
        mostrarError(foto, 'Debe ser una URL válida (que inicie con http:// o https://).');
    } else if (foto.value.trim() === '') {
        mostrarError(foto, 'La foto es obligatoria para el registro.');
    } else {
        mostrarExito(foto);
    }

    //Condicional "Nombre del dueño" y "Ciudad de residencia" que no esten vacios.
    if (dueno.value.trim() === '') mostrarError(dueno, 'El nombre del dueño es obligatorio.'); else mostrarExito(dueno);
    if (residencia.value.trim() === '') mostrarError(residencia, 'La ciudad es obligatoria.'); else mostrarExito(residencia);
    }); 