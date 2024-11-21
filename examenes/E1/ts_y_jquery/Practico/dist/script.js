"use strict";
var Colors;
(function (Colors) {
    Colors["headerColor"] = "peru";
    Colors["oddRowColor"] = "lightgray";
    Colors["evenRowColor"] = "lightgreen";
    Colors["roadHover"] = "orange";
})(Colors || (Colors = {}));
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
function processRows() {
    $("#tabla_ventas tbody tr").each(function (index, element) {
        var $row = $(this);
        var $nombre = $row.find("td").eq(1);
        var $sexo = $row.find("td").eq(2);
        var $email = $row.find("td").eq(3);
        var $color = $row.find("td").eq(4);
        var $recoger = $row.find("td").eq(6);
        // Nombre
        $nombre.text($nombre.text().charAt(0).toUpperCase() + $nombre.text().slice(1).toLowerCase());
        // Sexo
        if ($sexo.text() === "M") {
            $sexo.text("Hombre");
        }
        else {
            $sexo.text("Mujer");
        }
        // Email
        var emailText = $email.text();
        $email.html("<a href=\"mailto:".concat(emailText, "\">").concat(emailText, "</a>"));
        // Color
        $color.css("background-color", $color.text());
        // Recoger
        var recogerText = $recoger.text().trim().toLowerCase();
        var imgSrc = "../assets/".concat(recogerText, ".svg");
        $recoger.html("<img src=\"".concat(imgSrc, "\" alt=\"").concat(recogerText, "\" title=\"").concat(recogerText, "\">"));
    });
}
processRows();
// Apartado 3
function addTotalValueCol() {
    $("#tabla_ventas thead tr").append("<th>Precio_total</th>");
    $("#tabla_ventas tbody tr").each(function (index, element) {
        var $row = $(this);
        var $cuantityRow = $row.find("td").eq(7);
        var $priceRow = $row.find("td").eq(8);
        var cuantityValue = parseInt($cuantityRow.text());
        var priceValue = parseFloat($priceRow.text().slice(1));
        var totalValue = (cuantityValue * priceValue).toFixed(2);
        $row.append("<td>".concat(totalValue, "</td>"));
    });
}
addTotalValueCol();
// Apartado 4
function addTotalValueRow() {
    var totalCuantity = 0;
    var totalValue = 0;
    $("#tabla_ventas tbody tr").each(function (index, element) {
        var $row = $(this);
        var $cuantityRow = $row.find("td").eq(7);
        var cuantityValue = parseInt($cuantityRow.text());
        totalCuantity += cuantityValue;
        var $totalRow = $row.find("td").eq(9);
        totalValue += parseFloat($totalRow.text());
    });
    var fixxedTotalValue = totalValue.toFixed(2);
    $("#tabla_ventas tbody").append("<tr id='totalRow'><td colspan=\"7\">Total</td><td colspan=\"2\">".concat(totalCuantity, "</td><td>").concat(fixxedTotalValue, "</td></tr>"));
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
    var rowsToDelete = [];
    $("#tabla_ventas tbody tr").each(function (index, element) {
        var $row = $(this);
        var $checkbox = $row.find("input[type='checkbox']");
        if ($checkbox.is(":checked")) {
            rowsToDelete.push($row);
        }
    });
    rowsToDelete.forEach(function (row) { return row.remove(); });
}
$("#deleteSelectedRows").on("click", deleteSelectedRows);
// Apartado 6
function changeCuantityValue() {
    var $input;
    $("#tabla_ventas tbody tr").each(function (index, element) {
        var $row = $(this);
        var $cuantityRow = $row.find("td").eq(8);
        $cuantityRow.on("click", function () {
            $input = $("<input type='number' value=".concat(parseInt($cuantityRow.text()), ">"));
            onInputClicked($input, $cuantityRow);
        });
    });
}
function onInputClicked(input, cuantityRow) {
    console.log("click");
    cuantityRow.text("");
    cuantityRow.append(input);
    cuantityRow.off("click");
    onInputChanged(input, cuantityRow);
}
function onInputChanged(input, cuantityRow) {
    console.log("change");
    input.on("change", function () {
        var newValue = $(this).val();
        cuantityRow.text(newValue);
        cuantityRow.on("click", onInputClicked.bind(null, input, cuantityRow));
        updateTotalValue();
    });
}
function updateTotalValue() {
    $("#totalRow").remove();
    var totalCuantity = 0;
    var totalValue = 0;
    $("#tabla_ventas tbody tr").each(function (index, element) {
        var $row = $(this);
        var $cuantityRow = $row.find("td").eq(8);
        var cuantityValue = parseInt($cuantityRow.text());
        totalCuantity += cuantityValue;
        console.log($cuantityRow.text());
        var $totalRow = $row.find("td").eq(10);
        totalValue += parseFloat($totalRow.text());
        console.log(totalValue);
    });
    var fixxedTotalValue = totalValue.toFixed(2);
    $("#tabla_ventas tbody").append("<tr id='totalRow'><td colspan=\"8\">Total</td><td colspan=\"2\">".concat(totalCuantity, "</td><td>").concat(fixxedTotalValue, "</td></tr>"));
}
changeCuantityValue();
