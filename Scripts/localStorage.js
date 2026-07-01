// Función para guardar en LocalStorage
export function guardarMascota(mascota) {
    // Se obtienen los datos previos o un arreglo vacío si no hay nada
    let mascotasGuardadas = JSON.parse(localStorage.getItem('mascotasData')) || [];

    //Esto es para el sistema de likes añadido en la actualización 4.
    mascota.likes = 0;  

    // Se añade a la lista.
    mascotasGuardadas.push(mascota);
    
    // Se guarda en LocalStorage
    localStorage.setItem('mascotasData', JSON.stringify(mascotasGuardadas));
    
    // Se actualiza la lista para el usuario.
    renderizarMascotas();
}

// Función para crear las tarjetas
export function renderizarMascotas(filtro = '') {
    const contenedor = document.getElementById('contenedor-mascotas');
    if (!contenedor) return; 
    contenedor.innerHTML = ''; 
    
    let mascotasGuardadas = JSON.parse(localStorage.getItem('mascotasData')) || [];

    //Filtro de búsqueda: si el filtro no está vacío, se filtran las mascotas por nombre o tipo
    if (filtro.trim() !== '') {
        const textoBusqueda = filtro.toLowerCase();
        mascotasGuardadas = mascotasGuardadas.filter(m => 
            m.nombre.toLowerCase().includes(textoBusqueda) || 
            m.tipo.toLowerCase().includes(textoBusqueda)
        );
    }

    if (mascotasGuardadas.length === 0) {
        contenedor.innerHTML = '<p>No hay mascotas registradas aún.</p>';
        return;
    }

    // Iterar sobre cada mascota y crear su HTML
    mascotasGuardadas.forEach(mascota => {
        const likesActivos = mascota.likes || 0;
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-mascota');
        
        //Para añadir los botones.
        tarjeta.innerHTML = `
            <img src="${mascota.foto}" alt="Foto de ${mascota.nombre}">
            <div class="info-mascota">
                <h3>${mascota.nombre} <span>(${mascota.tipo})</span></h3>
                <p><strong>Edad:</strong> ${mascota.edad} años</p>
                <p><strong>Dueño:</strong> ${mascota.dueno}</p>
                <p><strong>País:</strong> ${mascota.residencia}</p>
                
                <div class="acciones-sociales">
                    <button class="btn-like" data-id="${mascota.id}">💖 ${likesActivos}</button>
                    <button class="btn-reportar" data-id="${mascota.id}">⚠️ Reportar</button>
                </div>

                <button class="btn-eliminar" data-id="${mascota.id}">Eliminar Registro</button>
            </div>
        `;
        
        contenedor.appendChild(tarjeta); 
    });

    // Agregar función de eliminar a los nuevos botones
    asignarEventosEliminar();
}

// Función para eliminar una mascota 
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

    //función de likes y dislikes.
    const botonesLike = document.querySelectorAll('.btn-like');
    botonesLike.forEach(boton => {
        boton.addEventListener('click', (evento) => {
            const idMascota = parseInt(evento.target.getAttribute('data-id'));
            let mascotasGuardadas = JSON.parse(localStorage.getItem('mascotasData')) || [];
            
            // Buscamos la mascota exacta y le sumamos 1 like
            const indice = mascotasGuardadas.findIndex(m => m.id === idMascota);
            if(indice !== -1) {
                mascotasGuardadas[indice].likes = (mascotasGuardadas[indice].likes || 0) + 1;
                localStorage.setItem('mascotasData', JSON.stringify(mascotasGuardadas));
                
                // Conservamos lo que haya escrito en el buscador para no perder la vista
                const buscador = document.getElementById('buscador-mascotas');
                renderizarMascotas(buscador ? buscador.value : '');
            }
        });
    });

    //Función para reportar.
    const botonesReportar = document.querySelectorAll('.btn-reportar');
    botonesReportar.forEach(boton => {
        boton.addEventListener('click', () => {
            const modal = document.getElementById('modal-reporte');
            if (modal) {
                modal.classList.remove('oculta');
            }
        });
    });
}