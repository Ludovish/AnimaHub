import { guardarMascota, renderizarMascotas } from './localStorage.js';
import { mostrarError, mostrarExito } from './validaciones.js';

//Elementos DOM
const btnNuevo = document.getElementById('btn-nuevo');
const btnVer = document.getElementById('btn-ver');
const vistaFormulario = document.getElementById('vista-formulario');
const vistaLista = document.getElementById('vista-lista');
const formMascota = document.getElementById('form-mascota');

document.addEventListener('DOMContentLoaded', renderizarMascotas);

//Ver Formulario.
btnNuevo.addEventListener('click', () => {
    vistaFormulario.classList.remove('oculta');
    vistaFormulario.classList.add('activa');
    vistaLista.classList.remove('activa');
    vistaLista.classList.add('oculta');
});

//Ver Lista de Mascotas.
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
        formularioValido = false;
    } else if (nombre.value.trim().length < 2) {
        mostrarError(nombre, 'El nombre debe tener al menos 2 caracteres.');
        formularioValido = false;
    } else {
        mostrarExito(nombre);
    }

    //Condicional "Tipo de animal" que se haya colocado algo.
    if (tipo.value.trim() === '') {
        mostrarError(tipo, 'Ingrese el tipo de animal.');
        formularioValido = false;
    } else {
        mostrarExito(tipo);
    }

    //Condicional "Edad de la mascota" que el numero no sea negativo.
    if (edad.value === '' || parseInt(edad.value) < 0) {
        mostrarError(edad, 'Ingrese una edad válida (0 o mayor).');
        formularioValido = false;
    } else {
        mostrarExito(edad);
    }

    //Condicional "Foto de la mascota" que sea una URL válida y que no este vacia.
    const urlPattern = /^(https?:\/\/)/i;
    if (foto.value.trim() !== '' && !urlPattern.test(foto.value)) {
        mostrarError(foto, 'Debe ser una URL válida (que inicie con http:// o https://).');
        formularioValido = false;
    } else if (foto.value.trim() === '') {
        mostrarError(foto, 'La foto es obligatoria para el registro.');
        formularioValido = false;
    } else {
        mostrarExito(foto);
    }

    //Condicional "Nombre del dueño"
    if (dueno.value.trim() === '') {
        mostrarError(dueno, 'El nombre del dueño es obligatorio.');
        formularioValido = false;
    } else {
        mostrarExito(dueno);
    }

    //Condicional "País de residencia"
    if (residencia.value.trim() === '') {
        mostrarError(residencia, 'El país es obligatorio.');
        formularioValido = false;
    } else {
        mostrarExito(residencia);
    }

    //Si to' esta bien, se guarda la mascota en el LocalStorage y se revisa validez.
    if (formularioValido) {
        guardarMascota({
            id: Date.now(), 
            nombre: nombre.value.trim(),
            tipo: tipo.value.trim(),
            edad: edad.value,
            foto: foto.value.trim(),
            dueno: dueno.value.trim(),
            residencia: residencia.value.trim()
        });

        // Si se guarda le vacian las casillas.
        formMascota.reset();
        const inputsExito = document.querySelectorAll('.input-exito');
        inputsExito.forEach(input => input.classList.remove('input-exito'));
        btnVer.click();
    }
});