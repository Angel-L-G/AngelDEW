function showDateTime() {
    let now = new Date();
    let date = now.toLocaleDateString('es-ES');
    let time = now.toLocaleTimeString('es-ES', { timeZoneName: 'short' });
    console.log(`${date} ${time}`);
}
