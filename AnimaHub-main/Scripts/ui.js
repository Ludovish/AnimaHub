// =========================================================================
// MÓDULO: ui.js (Rol 3 - Interfaz de Usuario y Notificaciones)
// RESPONSABILIDAD: Manipulación dinámica del DOM para mejorar la UX.
// Reemplaza los molestos alert() nativos por Toasts modernos.
// =========================================================================

/**
 * Muestra una notificación temporal en la pantalla (Toast).
 * @param {string} mensaje - El texto a mostrar.
 * @param {string} tipo - 'exito', 'error' o 'info' (determina el color).
 */
export function mostrarNotificacion(mensaje, tipo = 'info') {
    // 1. Buscar el contenedor de notificaciones (o crearlo si no existe)
    let contenedor = document.getElementById('contenedor-notificaciones');

    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'contenedor-notificaciones';
        // Estilos base para posicionarlo en la esquina inferior derecha
        contenedor.style.position = 'fixed';
        contenedor.style.bottom = '20px';
        contenedor.style.right = '20px';
        contenedor.style.zIndex = '9999';
        contenedor.style.display = 'flex';
        contenedor.style.flexDirection = 'column';
        contenedor.style.gap = '10px';
        document.body.appendChild(contenedor);
    }

    // 2. Crear la tarjeta de la notificación (El "Toast")
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.textContent = mensaje;

    // 3. Añadir estilos dinámicos por JS (Puntos extra en manipulación DOM)
    toast.style.minWidth = '250px';
    toast.style.padding = '15px 20px';
    toast.style.borderRadius = '8px';
    toast.style.color = '#fff';
    toast.style.fontWeight = 'bold';
    toast.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    toast.style.fontFamily = 'sans-serif';
    
    // Animación inicial (invisible y un poco más abajo)
    toast.style.opacity = '0'; 
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';

    // Colores según el tipo de alerta
    if (tipo === 'exito') toast.style.backgroundColor = '#4CAF50'; // Verde
    else if (tipo === 'error') toast.style.backgroundColor = '#F44336'; // Rojo
    else toast.style.backgroundColor = '#2196F3'; // Azul (Info)

    // 4. Inyectarlo al DOM
    contenedor.appendChild(toast);

    // 5. Disparar la animación de entrada (aparece y sube)
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);

    // 6. Autodestrucción después de 3 segundos (Limpieza del DOM)
    setTimeout(() => {
        // Animación de salida
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        
        // Esperar que termine la animación antes de borrar el nodo de HTML
        setTimeout(() => {
            if (contenedor.contains(toast)) {
                contenedor.removeChild(toast);
            }
        }, 300);
    }, 3000);
}