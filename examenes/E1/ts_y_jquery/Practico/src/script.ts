enum Colors {
    headerColor = "peru",
    oddRowColor = "lightgray",
    evenRowColor = "lightgreen",
    roadHover = "orange",
}

// Apartado 1
$("#tabla_ventas thead tr").css("background-color", Colors.headerColor);
$("#tabla_ventas tbody tr:even").css("background-color", Colors.evenRowColor);
$("#tabla_ventas tbody tr:odd").css("background-color", Colors.oddRowColor);

$("#tabla_ventas tbody tr").hover(function () {
    $(this).css("background-color", Colors.roadHover);
}, function () {
    $("#tabla_ventas tbody tr:even").css("background-color", Colors.evenRowColor);
    $("#tabla_ventas tbody tr:odd").css("background-color", Colors.oddRowColor);
});

// Apartado 2
function processRows(){
    $("#tabla_ventas tbody tr").each(function (index, element) {
        const $row = $(this);

        const $nombre = $row.find("td").eq(1);
        const $sexo = $row.find("td").eq(2);
        const $email = $row.find("td").eq(3);
        const $color = $row.find("td").eq(4);
        const $recoger = $row.find("td").eq(6);

        // Nombre
        $nombre.text($nombre.text().charAt(0).toUpperCase() + $nombre.text().slice(1).toLowerCase());

        // Sexo
        if ($sexo.text() === "M") {
            $sexo.text("Hombre");
        } else {
            $sexo.text("Mujer");
        }

        // Email
        const emailText = $email.text();
        $email.html(`<a href="mailto:${emailText}">${emailText}</a>`);

        // Color
        $color.css("background-color", $color.text());

        // Recoger
        const recogerText = $recoger.text().trim().toLowerCase();
        const imgSrc = `../assets/${recogerText}.svg`;
        $recoger.html(`<img src="${imgSrc}" alt="${recogerText}" title="${recogerText}">`);
 
    });
}

processRows();

// Apartado 3
function addTotalValueCol(){
    $("#tabla_ventas thead tr").append("<th>Precio_total</th>");

    $("#tabla_ventas tbody tr").each(function (index, element) {
        const $row = $(this);

        const $cuantityRow = $row.find("td").eq(7);
        const $priceRow = $row.find("td").eq(8);

        const cuantityValue = parseInt($cuantityRow.text());
        const priceValue = parseFloat($priceRow.text().slice(1));
        const totalValue = (cuantityValue * priceValue).toFixed(2);

        $row.append(`<td>${totalValue}</td>`);
    });
}

addTotalValueCol();

// Apartado 4
function addTotalValueRow() {
    let totalCuantity = 0;
    let totalValue = 0;

    $("#tabla_ventas tbody tr").each(function (index, element) {
        const $row = $(this);

        const $cuantityRow = $row.find("td").eq(7);
        const cuantityValue = parseInt($cuantityRow.text());
        totalCuantity += cuantityValue;

        const $totalRow = $row.find("td").eq(9);
        totalValue += parseFloat($totalRow.text());
    });

    const fixxedTotalValue = totalValue.toFixed(2);

    $("#tabla_ventas tbody").append(`<tr id='totalRow'><td colspan="7">Total</td><td colspan="2">${totalCuantity}</td><td>${fixxedTotalValue}</td></tr>`);
}

addTotalValueRow();

// Apartado 5
function addNewElements() {
    $("#tabla_ventas thead tr").prepend("<th colspan='1'></th>");
    $("#tabla_ventas tbody tr").prepend("<td class='checkbox-cell'><input type='checkbox'></td>");

    $("body").append("<button id='deleteSelectedRows'>Borrar</button>");
}

addNewElements();

function deleteSelectedRows() {
    let rowsToDelete: Array<JQuery<HTMLElement>> = [];

    $("#tabla_ventas tbody tr").each(function (index, element) {
        const $row = $(this);

        const $checkbox = $row.find("input[type='checkbox']");

        if($checkbox.is(":checked")) {
            rowsToDelete.push($row);
        }
    });

    rowsToDelete.forEach(row => row.remove());
}

$("#deleteSelectedRows").on("click", deleteSelectedRows);

// Apartado 6
function changeCuantityValue() {
    let $input: JQuery<HTMLInputElement>;

    $("#tabla_ventas tbody tr").each(function (index, element) {
        const $row = $(this);

        const $cuantityRow = $row.find("td").eq(8);

        $cuantityRow.on("click", function () {
            $input = $(`<input type='number' value=${parseInt($cuantityRow.text())}>`);

            onInputClicked($input, $cuantityRow);
        });
    });
}

function onInputClicked(input: JQuery<HTMLInputElement>, cuantityRow: JQuery<HTMLElement>) {
    console.log("click");
    
    cuantityRow.text("");
    cuantityRow.append(input);

    cuantityRow.off("click");

    onInputChanged(input, cuantityRow);
}

function onInputChanged(input: JQuery<HTMLInputElement>, cuantityRow: JQuery<HTMLElement>) {
    console.log("change");
    
    input!.on("change", function () {
        const newValue = $(this).val();
        cuantityRow.text(newValue!);

        cuantityRow.on("click", onInputClicked.bind(null, input, cuantityRow));

        updateTotalValue();
    });
}

function updateTotalValue() {
    $("#totalRow").remove();

    let totalCuantity = 0;
    let totalValue = 0;

    $("#tabla_ventas tbody tr").each(function (index, element) {
        const $row = $(this);

        const $cuantityRow = $row.find("td").eq(8);
        const cuantityValue = parseInt($cuantityRow.text());
        totalCuantity += cuantityValue;

        console.log($cuantityRow.text());

        const $totalRow = $row.find("td").eq(10);
        totalValue += parseFloat($totalRow.text());

        console.log(totalValue);
        
    });

    const fixxedTotalValue = totalValue.toFixed(2);

    $("#tabla_ventas tbody").append(`<tr id='totalRow'><td colspan="8">Total</td><td colspan="2">${totalCuantity}</td><td>${fixxedTotalValue}</td></tr>`);

}

changeCuantityValue();