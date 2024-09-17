function timeSince(dateString, unit = 'd') {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMs = now - past;
    let result;

    switch (unit) {
        case 's':
            result = diffInMs / 1000;
            break;
        case 'm':
            result = diffInMs / (1000 * 60);
            break;
        case 'h':
            result = diffInMs / (1000 * 60 * 60);
            break;
        case 'd':
            result = diffInMs / (1000 * 60 * 60 * 24);
            break;
        default:
            console.error('Unidad no válida');
            return;
    }

    console.log(`Han pasado ${result} ${unit === 's' ? 'segundos' : unit === 'm' ? 'minutos' : unit === 'h' ? 'horas' : 'días'}.`);
}
