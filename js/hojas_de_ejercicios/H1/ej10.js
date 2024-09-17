// a)

function deg2rad(x) {
    return x * Math.PI / 180;
}

function rad2deg(x) {
    return x * 180 / Math.PI;
}

// b)

function sinDeg(x) {
    return Math.sin(deg2rad(x));
}

function cosDeg(x) {
    return Math.cos(deg2rad(x));
}


// c)

function sinDegAlt(x) {
    return Math.sqrt(1 - Math.pow(cosDeg(x), 2));
}

function cosDegAlt(x) {
    return Math.sqrt(1 - Math.pow(sinDeg(x), 2));
}
