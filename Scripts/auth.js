// DOM
const formLogin = document.getElementById('form-login');
const vistaLogin = document.getElementById('vista-login');
const menuPrincipal = document.getElementById('menu-principal');
const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
const vistaLista = document.getElementById('vista-lista'); 
const vistaFormulario = document.getElementById('vista-formulario');

// Se pide la validacion momento 1 que ingresas
document.addEventListener('DOMContentLoaded', verificarSesion);

// Verificacion de sesión
export function verificarSesion() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActivo'));
    
    if (usuarioActual) {
        // Existe usuario? Para adelante
        if(vistaLogin) {
            vistaLogin.classList.remove('activa');
            vistaLogin.classList.add('oculta');
        }
        if(menuPrincipal) menuPrincipal.classList.remove('oculta');
        if(vistaLista) {
            vistaLista.classList.remove('oculta');
            vistaLista.classList.add('activa');
        }
        if(vistaFormulario) {
            vistaFormulario.classList.remove('activa');
            vistaFormulario.classList.add('oculta');
        }
        
        actualizarUIUsuario(usuarioActual);
    } else {
        // No se ha iniciado? Encerrado acá hasta un login correcto
        if(vistaLogin) {
            vistaLogin.classList.remove('oculta');
            vistaLogin.classList.add('activa');
        }
        if(menuPrincipal) menuPrincipal.classList.add('oculta');
        if(vistaLista) {
            vistaLista.classList.remove('activa');
            vistaLista.classList.add('oculta');
        }
        if(vistaFormulario) {
            vistaFormulario.classList.remove('activa');
            vistaFormulario.classList.add('oculta');
        }
    }
}

// Actualizar nombre y el karma en base al usuario del login
export function actualizarUIUsuario(usuario) {
    if(!usuario) return;
    const nombreUsuario = document.getElementById('usuario-activo-nombre');
    const karmaUsuario = document.getElementById('usuario-activo-karma');
    
    if(nombreUsuario) nombreUsuario.textContent = usuario.username;
    if(karmaUsuario) karmaUsuario.textContent = usuario.karma;
}

// formulario
if(formLogin) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        const username = document.getElementById('login-username').value.trim();
        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-password').value.trim();

        let usuariosDb = JSON.parse(localStorage.getItem('usuariosDb')) || [];
        let usuarioEncontrado = usuariosDb.find(u => u.username === username);

        if (usuarioEncontrado) {
            // Usuario existe = Avanza
            if (usuarioEncontrado.password === pass) {
                localStorage.setItem('usuarioActivo', JSON.stringify(usuarioEncontrado));
                alert(`¡Bienvenido de vuelta, ${username}!`);
                verificarSesion();
            } else {
                alert('Contraseña incorrecta. Inténtalo de nuevo.');
            }
        } else {
            // Usuario no existe = Se crea
            const nuevoUsuario = { username, email, password: pass, karma: 0 };
            usuariosDb.push(nuevoUsuario);
            localStorage.setItem('usuariosDb', JSON.stringify(usuariosDb));
            
            localStorage.setItem('usuarioActivo', JSON.stringify(nuevoUsuario));
            alert('Cuenta creada exitosamente. ¡Bienvenido a AnimaHub!');
            verificarSesion();
        }
    });
}

// 6. Cerrar Sesión
if(btnCerrarSesion) {
    btnCerrarSesion.addEventListener('click', () => {
        localStorage.removeItem('usuarioActivo');
        location.reload(); 
    });
}