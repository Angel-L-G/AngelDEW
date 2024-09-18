// a)

function deg2rad(x) {
    return x * Math.PI / 180;
}

deg2rad(10);

function rad2deg(x) {
    return x * 180 / Math.PI;
}

rad2deg(10);

// b)

function sinDeg(x) {
    return Math.sin(deg2rad(x));
}

sinDeg(10);

function cosDeg(x) {
    return Math.cos(deg2rad(x));
}

cosDeg(10);

// c)

function sinDegAlt(x) {
    return Math.sqrt(1 - Math.pow(cosDeg(x), 2));
}

sinDegAlt(10);

function cosDegAlt(x) {
    return Math.sqrt(1 - Math.pow(sinDeg(x), 2));
}

cosDegAlt(10);