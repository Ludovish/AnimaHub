// =========================================================
// MÓDULO: perfil.js (Rol 2 - Perfil y Gamificación/Karma)
// =========================================================

// 1. Mostrar los datos del usuario en la barra superior
export function cargarPerfil() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActivo'));
    
    // Si no hay usuario, detenemos la ejecución (auth.js ya lo expulsará)
    if (!usuarioActual) return;

    // Buscar los elementos en el DOM (Navbar)
    const nombreUsuario = document.getElementById('usuario-activo-nombre');
    const karmaUsuario = document.getElementById('usuario-activo-karma');
    
    // Inyectar los datos reales
    if (nombreUsuario) nombreUsuario.textContent = usuarioActual.username;
    if (karmaUsuario) karmaUsuario.textContent = usuarioActual.karma || 0;
}

// 2. Sistema de Gamificación: Sumar Karma
// Esta función será llamada desde afuera cuando alguien dé "Like"
export function sumarKarma(dueñoUsername) {
    // Evitar errores si no hay un dueño válido
    if (!dueñoUsername || dueñoUsername === 'Anónimo') return;

    let usuariosDb = JSON.parse(localStorage.getItem('usuariosDb')) || [];

    // Buscar al creador de la mascota y sumarle 1 de karma
    usuariosDb = usuariosDb.map(user => {
        if (user.username === dueñoUsername) {
            user.karma = (user.karma || 0) + 1;

            // TRUCO UX: Si yo le doy like a MI PROPIA mascota (o recibo uno en tiempo real)
            // actualizo mi sesión activa para que el número cambie arriba instantáneamente.
            const usuarioActual = JSON.parse(localStorage.getItem('usuarioActivo'));
            if (usuarioActual && usuarioActual.username === dueñoUsername) {
                usuarioActual.karma = user.karma;
                localStorage.setItem('usuarioActivo', JSON.stringify(usuarioActual));
                cargarPerfil(); // Refresca el DOM
            }
        }
        return user;
    });

    // Guardar la base de datos actualizada
    localStorage.setItem('usuariosDb', JSON.stringify(usuariosDb));
}

// 3. Cerrar Sesión
export function cerrarSesion() {
    localStorage.removeItem('usuarioActivo');
    // Como las vistas están en /views, subimos un nivel para ir al index
    window.location.href = '../index.html'; 
}

// 4. Inicializar Eventos al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    cargarPerfil(); // Pinta el nombre y karma al instante

    // Asignar el evento al botón de cerrar sesión
    const btnCerrar = document.getElementById('btn-cerrar-sesion');
    if (btnCerrar) {
        btnCerrar.addEventListener('click', cerrarSesion);
    }
});

// Agrega esto al final de tu función cargarPerfil() para sincronizar la tarjeta central
const perfilUser = document.getElementById('perfil-username');
const perfilEmail = document.getElementById('perfil-email');
const perfilKarma = document.getElementById('perfil-karma');

if (perfilUser) perfilUser.textContent = usuarioActual.username;
if (perfilEmail) perfilEmail.textContent = usuarioActual.email || 'No registrado';
if (perfilKarma) perfilKarma.textContent = usuarioActual.karma || 0;