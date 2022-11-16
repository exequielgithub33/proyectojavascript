
const permisos = [
    {usuario:"omarexe", permiso:"lectura"},
    {usuario:"ramon" , permiso:"escritura"},
    {usuario:"raulperez", permiso:"escritura"},
    {usuario:"jaimito", permiso:"administraor"},


]
 


function ingreso() {
    let usuario = {
        usuarioIngresado : null,
        contrasenaIngresada : null,
        permiso:null
    }


     usuario.usuarioIngresado = prompt(`Ingrese Nombre de Usuario`);
     usuario.contrasenaIngresada = prompt(`Ingrese Contraseña`);
    if  (usuario.usuarioIngresado=="omarexe" && usuario.contrasenaIngresada=="123") {
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
    let tipopermiso = permisos.find(permiso =>permiso.usuario ==="omarexe")
    h1resp.innerHTML = `Bienvenido al sitio : Usuario  ${tipopermiso.usuario} tiene permiso de :${tipopermiso.permiso}` 
}
else {
    h1resp.innerHTML = "ingresaste mal Usuario o Contraseña"
}
console.log(h1resp.innerHTML);

