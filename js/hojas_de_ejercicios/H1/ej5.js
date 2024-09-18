function showDateTime() {
    let now = new Date();
    let date = now.toLocaleDateString('es-ES');
    let time = now.toLocaleTimeString('es-ES', { timeZoneName: 'short' });
    console.log(`${date} ${time}`);
}

showDateTime(); // Ejecutar la función para mostrar la fecha y hora actual.
