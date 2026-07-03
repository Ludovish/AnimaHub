// =========================================================
// validaciones.js - Utilidades globales para UI
// =========================================================

export const mostrarError = (input, mensaje) => {
    const spanError = document.getElementById(`error-${input.id}`);
    if (spanError) spanError.textContent = mensaje;
    input.classList.add('input-error');
    input.classList.remove('input-exito');
};

export const mostrarExito = (input) => {
    const spanError = document.getElementById(`error-${input.id}`);
    if (spanError) spanError.textContent = '';
    input.classList.remove('input-error');
    input.classList.add('input-exito');
};