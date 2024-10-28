import SesionManager from "./classes/SesionManager";

function toggleForm() {
    const isRegister = document.getElementById('register').checked;
    const formTitle = document.getElementById('form-title');
    formTitle.textContent = isRegister ? 'Registrarse' : 'Iniciar Sesión';
}

async function formSubmitManager(){
    const form = document.getElementById('auth-form');
    const email = form.email.value;
    const password = form.password.value;
    const isRegister = document.getElementById('register').checked;
    let response = false;

    if(isRegister){
        response = await sesionManager.register(email, password);
        console.log("Register response: " + response);
    } else {
        response = await sesionManager.login(email, password);
        console.log("Login response: " + response);
    }

    if(response && localStorage.getItem("user") != null && localStorage.getItem("user") != undefined){
        window.location.href = "index.html";
    }else {
        console.error("No se ha podido iniciar sesión");
        return;
    }
}

document.getElementById("submitBtn").addEventListener("click", async function(event) {
    event.preventDefault();
    formSubmitManager();
});
document.getElementById("register").addEventListener("click", toggleForm);
const sesionManager = new SesionManager();