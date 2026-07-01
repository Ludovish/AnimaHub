    //Acá esta la función que se encargara de mostrar errores en el formulario.
    export const mostrarError = (input, mensaje) => {
        const spanError = document.getElementById(`error-${input.id}`);
        spanError.textContent = mensaje;
        input.classList.add('input-error');
        input.classList.remove('input-exito');
        formularioValido = false;
    };

    //Acá esta la función que se encargara de mostrar el exito en el formulario.
    export const mostrarExito = (input) => {
        const spanError = document.getElementById(`error-${input.id}`);
        spanError.textContent = '';
        input.classList.remove('input-error');
        input.classList.add('input-exito');
    };