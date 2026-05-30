const ventana=document.getElementById('ventana-modal');
const botonAbrir=document.getElementById('boton-abrir');
const botonCerrar=document.getElementById('boton-cerrar');

botonAbrir.addEventListener('click', () => {
    ventana.style.display='flex';
});

botonCerrar.addEventListener('click', () => {
    ventana.style.display='none';
});

window.addEventListener('click', (evento) => {
    if (evento.target===ventana) {
        ventana.style.display='none';
    }
});

document.getElementById('formulario-asesoria').addEventListener('submit', function(evento) {
    evento.preventDefault();

    const nombre=document.getElementById('nombre').value.trim();
    const email=document.getElementById('email').value.trim();
    const telefono=document.getElementById('telefono').value.trim();
    const mensaje=document.getElementById('mensaje').value.trim();

    const validarNombre=/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)+$/;
    if (!validarNombre.test(nombre)) {
        alert('Formato inválido: Ingresa tu nombre y apellido (solo letras).');
        return;
    }

    const validarEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validarEmail.test(email)) {
        alert('Formato inválido: El correo electrónico no es correcto.');
        return;
    }

    const validarTelefono = /^\d{9}$/;
    if (!validarTelefono.test(telefono)){
        alert('Formato inválido: El teléfono debe tener exactamente 9 dígitos.');
        return;
    }

    if (mensaje.length < 10){
        alert('Formato inválido: Cuéntanos un poco más en tu mensaje (mínimo 10 caracteres).');
        return;
    }

    const encabezados=["Nombre", "Email", "Telefono", "Mensaje"];
    const filaDatos=[
        `"${nombre.replace(/"/g, '""')}"`,
        `"${email.replace(/"/g, '""')}"`,
        `"${telefono.replace(/"/g, '""')}"`,
        `"${mensaje.replace(/"/g, '""')}"`
    ];

    const contenidoCSV=encabezados.join(",") + "\n" + filaDatos.join(",");

    const blob=new Blob([contenidoCSV], { type:'text/csv;charset=utf-8;' });
    const url=URL.createObjectURL(blob);
    
    const enlace=document.createElement("a");
    enlace.setAttribute("href", url);
    enlace.setAttribute("download", "nueva-asesoria.csv");
    enlace.style.visibility='hidden';
    
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);

    alert('¡Validación correcta! los datos ya fueron enviados.');
    
    document.getElementById('formulario-asesoria').reset();
    ventana.style.display='none';
});