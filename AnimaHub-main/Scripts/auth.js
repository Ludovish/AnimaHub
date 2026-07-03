// =========================================================
// auth.js - Manejo de Sesión y Seguridad (Rol 1)
// =========================================================
import { mostrarError, mostrarExito } from './validaciones.js';
import { mostrarNotificacion } from './ui.js';

const formLogin = document.getElementById('form-login');

// 1. Protección de Rutas (Si ya estoy logueado, me manda a ver las mascotas)
document.addEventListener('DOMContentLoaded', () => {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (usuarioActual) {
        window.location.href = 'views/main.html';
    }
});

// 2. Lógica del Formulario con Validación Estricta
if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        const usernameInput = document.getElementById('login-username');
        const emailInput = document.getElementById('login-email');
        const passInput = document.getElementById('login-password');

        let formularioValido = true;

        // Validar Username
        if (usernameInput.value.trim().length < 3) {
            mostrarError(usernameInput, 'El nombre debe tener al menos 3 caracteres.');
            formularioValido = false;
        } else {
            mostrarExito(usernameInput);
        }

        // Validar Email (Expresión Regular)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            mostrarError(emailInput, 'Ingresa un correo electrónico válido.');
            formularioValido = false;
        } else {
            mostrarExito(emailInput);
        }

        // Validar Contraseña
        if (passInput.value.trim().length < 4) {
            mostrarError(passInput, 'La contraseña debe tener al menos 4 caracteres.');
            formularioValido = false;
        } else {
            mostrarExito(passInput);
        }

        // Si hay errores, detenemos el proceso
        if (!formularioValido) return;

        // --- PROCESO DE LOGIN / REGISTRO ---
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const pass = passInput.value.trim();

        let usuariosDb = JSON.parse(localStorage.getItem('usuariosDb')) || [];
        let usuarioEncontrado = usuariosDb.find(u => u.username === username);

        if (usuarioEncontrado) {
            // Intento de Login
            if (usuarioEncontrado.password === pass) {
                localStorage.setItem('usuarioActivo', JSON.stringify(usuarioEncontrado));
                window.location.href = 'views/main.html';
            } else {
                mostrarError(passInput, 'Contraseña incorrecta.');
            }
        } else {
            // Registro Nuevo (Le inyectamos karma 0 para que TÚ puedas trabajar)
            const nuevoUsuario = { username, email, password: pass, karma: 0 };
            usuariosDb.push(nuevoUsuario);
            localStorage.setItem('usuariosDb', JSON.stringify(usuariosDb));
            localStorage.setItem('usuarioActivo', JSON.stringify(nuevoUsuario));
            
            window.location.href = 'views/main.html';
        }
    });
}