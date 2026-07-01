// Función para guardar en LocalStorage
export function guardarMascota(mascota) {
    // Se obtienen los datos previos o un arreglo vacío si no hay nada
    let mascotasGuardadas = JSON.parse(localStorage.getItem('mascotasData')) || [];
    
    // Se añade a la lista.
    mascotasGuardadas.push(mascota);
    
    // Se guarda en LocalStorage
    localStorage.setItem('mascotasData', JSON.stringify(mascotasGuardadas));
    
    // Se actualiza la lista para el usuario.
    renderizarMascotas();
}

// Función para crear las tarjetas
export function renderizarMascotas() {
    const contenedor = document.getElementById('contenedor-mascotas');
    if (!contenedor) return; // Seguridad extra para evitar errores de consola
    contenedor.innerHTML = ''; 
    
    let mascotasGuardadas = JSON.parse(localStorage.getItem('mascotasData')) || [];

    if (mascotasGuardadas.length === 0) {
        contenedor.innerHTML = '<p>No hay mascotas registradas aún.</p>';
        return;
    }

    // Iterar sobre cada mascota y crear su HTML
    mascotasGuardadas.forEach(mascota => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-mascota');
        
        // Usamos las clases CSS limpias en lugar de estilos en línea
        tarjeta.innerHTML = `
            <img src="${mascota.foto}" alt="Foto de ${mascota.nombre}">
            <div class="info-mascota">
                <h3>${mascota.nombre} <span>(${mascota.tipo})</span></h3>
                <p><strong>Edad:</strong> ${mascota.edad} años</p>
                <p><strong>Dueño:</strong> ${mascota.dueno}</p>
                <p><strong>País:</strong> ${mascota.residencia}</p>
                <button class="btn-eliminar" data-id="${mascota.id}">Eliminar Registro</button>
            </div>
        `;
        
        contenedor.appendChild(tarjeta); // Insertar en el DOM
    });

    // Agregar función de eliminar a los nuevos botones
    asignarEventosEliminar();
}

// Función para eliminar una mascota (No necesita export porque solo se usa dentro de este archivo)
function asignarEventosEliminar() {
    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', (evento) => {
            const idMascota = parseInt(evento.target.getAttribute('data-id'));
            
            let mascotasGuardadas = JSON.parse(localStorage.getItem('mascotasData')) || [];
            mascotasGuardadas = mascotasGuardadas.filter(m => m.id !== idMascota);
            
            localStorage.setItem('mascotasData', JSON.stringify(mascotasGuardadas));
            renderizarMascotas();
        });
    });
}