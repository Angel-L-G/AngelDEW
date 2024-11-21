/*
*/

function chooseRadio(){
    var radios = document.getElementsByName('radio');
    let divResults = document.getElementById("textDiv");
    let value;
    
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            value = radios[i].value;
            console.log("Value: ", value);
            break;
        }
    }

    let chechkboxDiv = document.getElementById("checkboxGroup")
    switch (value) {
        case "perros":
            console.log("1");
            chechkboxDiv.innerHTML = `
                <input type="checkbox" id="check1" value="Chi">Chiguagua</input>
                <input type="checkbox" id="check2" value="Pas">Pastor Aleman</input>
                <input type="checkbox" id="check3" value="Mas">Mastin</input>
            `;

            
            break;
        case "gatos":
            console.log("2");
            chechkboxDiv.innerHTML = `
                <input type="checkbox" id="check1" value="Per">Persa</input>
                <input type="checkbox" id="check2" value="Ang">Angora</input>
                <input type="checkbox" id="check3" value="Sia">Siames</input>
            `;
            break;
        default:
            console.log("3");
            chechkboxDiv.innerHTML = ``;
            divResults.innerHTML = "";
            break;
    }

    document.getElementById("check1").addEventListener("change", (e) => {
        divResults.innerHTML = "Se selecciono el: " + e.target.value;
    });
    document.getElementById("check2").addEventListener("change", (e) => {
        divResults.innerHTML = "Se selecciono el: " + e.target.value;
    });
    document.getElementById("check3").addEventListener("change", (e) => {
        divResults.innerHTML = "Se selecciono el: " + e.target.value;
    });
}

document.getElementsByName('radio').forEach(radio => {
    radio.addEventListener('change', chooseRadio);
});