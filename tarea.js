
let dbusuario = "omarexe";
let dbclave="123";


function ingreso() {
    let usuarioIngresado = prompt(`Ingrese Nombre de Usuario`);
    let contrasenaIngresada = prompt(`Ingrese Contraseña`);
    if  (usuarioIngresado=="omarexe" && contrasenaIngresada=="123") {
           return   true

    }
    else {
        return  false
    }
}






let intentos = 3;
let res= false;
do {
    alert(`Tienes  ${intentos} posibilidades de ingresar correctamente Usuario y Contraseña`)
    intentos = intentos - 1;
    res  = ingreso();
    
    
    
} while (intentos > 0 &&  res == false );


let h1resp =  document.getElementById("h1respuesta");
if  (res == true) {
    h1resp.innerHTML = "Bienvenido al sitio "
}
else {
    h1resp.innerHTML = "ingresaste mal Usuario o Contraseña"
}
console.log(h1resp.innerHTML);
