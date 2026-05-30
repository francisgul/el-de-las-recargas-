const modal=document.getElementById('ventana-modal');
const btnAbrir=document.getElementById('btn-abrir');
const btnCerrar=document.getElementById('btn-cerrar');

btnAbrir.addEventListener('click', () => {
    modal.style.display='flex';
});

btnCerrar.addEventListener('click', () => {
    modal.style.display='none';
});

window.addEventListener('click', (evento) => {
    if (evento.target===modal) {
        modal.style.display='none';
    }
});

document.getElementById('formulario-asesoria').addEventListener('submit', function(evento) {
    evento.preventDefault();

    const nombre=document.getElementById('nombre').value.trim();
    const email=document.getElementById('email').value.trim();
    const telefono=document.getElementById('telefono').value.trim();
    const mensaje=document.getElementById('mensaje').value.trim();

    // Validaciones de formato
    const regexNombre=/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)+$/;
    if (!regexNombre.test(nombre)) {
        alert('Formato inválido: Ingresa tu nombre y apellido (solo letras).');
        return;
    }

    const regexEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        alert('Formato inválido: El correo electrónico no es correcto.');
        return;
    }

    const regexTelefono = /^\d{9}$/;
    if (!regexTelefono.test(telefono)){
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
    modal.style.display='none';
});