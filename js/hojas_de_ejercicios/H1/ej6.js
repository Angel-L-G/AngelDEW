let date1 = new Date("02/04/2015"); // Formato mm/dd/yyyy en JavaScript
console.log(date1); // Resultado inesperado por formato ambiguo

let date2 = new Date("2015-04-02");
console.log(date2); // Correcto

let date3 = new Date("April 02, 2015");
console.log(date3); // Correcto también
