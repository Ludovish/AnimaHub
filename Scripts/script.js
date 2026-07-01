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

