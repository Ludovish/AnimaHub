// =========================================================================
// MÓDULO: main.js (Antiguo script.js corregido)
// RESPONSABILIDAD: Eventos de la vista, validaciones y CRUD de Mascotas.
// =========================================================================

import { guardarMascota, renderizarMascotas } from './localStorage.js';
import { mostrarError, mostrarExito } from './validaciones.js';

// Elementos DOM
const formMascota = document.getElementById('form-mascota');
const buscadorMascotas = document.getElementById('buscador-mascotas');
const modalReporte = document.getElementById('modal-reporte');
const btnCancelarReporte = document.getElementById('btn-cancelar-reporte');
const btnEnviarReporte = document.getElementById('btn-enviar-reporte');
const textMotivo = document.getElementById('motivo-reporte');

// 1. Cargar mascotas (solo si estamos en main.html)
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('contenedor-mascotas')) {
        renderizarMascotas();
    }
});

// 2. Validación del Formulario (Solo si estamos en form.html)
if (formMascota) {
    formMascota.addEventListener('submit', (evento) => {
        evento.preventDefault(); 
        let formularioValido = true;

        // Variables del formulario...
        const nombre = document.getElementById('nombreMascota');
        const tipo = document.getElementById('tipoAnimal');
        const edad = document.getElementById('edadMascota');
        const foto = document.getElementById('fotoMascota');
        const dueno = document.getElementById('nombreDueno');
        const residencia = document.getElementById('residencia');

        // [Tus condicionales de validación se mantienen exactamente iguales aquí...]
        // (Omito los IF para no alargar el código, pero pon los mismos que me enviaste)
        
        // Asumiendo que pasó las validaciones:
        if (formularioValido) {
            // MEJORA: Obtenemos el usuario activo para registrarlo como dueño real
            const usuarioActivo = JSON.parse(localStorage.getItem('currentUser'));
            const nombreDueñoReal = usuarioActivo ? usuarioActivo.username : 'Anónimo';

            guardarMascota({
                id: Date.now(), 
                nombre: nombre.value.trim(),
                tipo: tipo.value.trim(),
                edad: edad.value,
                foto: foto.value.trim(),
                // Aquí enlazamos la mascota con el usuario real de la plataforma
                creadorUsername: nombreDueñoReal, 
                duenoFormulario: dueno.value.trim(), 
                residencia: residencia.value.trim(),
                likes: 0 // Preparando para la mejora de Karma
            });

            formMascota.reset();
            const inputsExito = document.querySelectorAll('.input-exito');
            inputsExito.forEach(input => input.classList.remove('input-exito'));
            
            // Redirigir a la vista de lista
            window.location.href = 'main.html';
        }
    });
}

// 3. Buscador de mascotas (FUERA DEL FORMULARIO)
if (buscadorMascotas) {
    buscadorMascotas.addEventListener('input', (evento) => {
        renderizarMascotas(evento.target.value);
    });
}

// 4. Reportar (FUERA DEL FORMULARIO)
if (btnCancelarReporte) {
    btnCancelarReporte.addEventListener('click', () => {
        modalReporte.classList.add('oculta');
        textMotivo.value = ''; 
    });

    btnEnviarReporte.addEventListener('click', () => {
        if (textMotivo.value.trim() === '') {
            alert('Por favor, escribe un motivo para el reporte.');
            return;
        }
        alert('Reporte enviado con éxito.');
        modalReporte.classList.add('oculta');
        textMotivo.value = '';
    });
}