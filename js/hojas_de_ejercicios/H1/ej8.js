function hdec2hms(x) {
    let hours = Math.floor(x);
    let minutes = Math.floor((x - hours) * 60);
    let seconds = Math.floor((((x - hours) * 60) - minutes) * 60);
    return `${hours}:${minutes}:${seconds}`;
}

function hms2hdec(h, m, s) {
    return h + (m / 60) + (s / 3600);
}
