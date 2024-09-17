function toJulianDate(dateString) {
    const unixTimeMs = new Date(dateString).getTime();
    const unixDays = unixTimeMs / (1000 * 60 * 60 * 24);
    const julianDate = unixDays + 2440587.5;
    return julianDate;
}
console.log(toJulianDate("2018-09-20"));
