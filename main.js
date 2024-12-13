//  1. Creacion de variables, y asignacion en base a su ID del elemento HTML.

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let contadorProductos = document.getElementById("contadorProductos");
let totalProductos = document.getElementById("totalProductos");
let totalPrecio = document.getElementById("totalPrecio");

//Crear array para manejrar JSON
let datos = new Array();

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

//7.1 Creacion de variables en relacion a la tabla tablaListaCompras
let tablaListaCompras = document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

let cont=0;
let costoTotal = 0;
let nTotalProductos =0;


function validarCantidad(){
    if(txtNumber.value.length<=0){
        return false;
    }// primera validacion, si txtNumber es menor a cero.
    // segunda validacion, que sea numero no cadena de texto
    if(isNaN(txtNumber.value)){
        return false;
    }
//  Convertir el valor a numero y validar que sea mayor cero
    if(Number(txtNumber.value)<=0){
        return false;
    }
    // tercera validacion, 
    return true;
}// validarCantidad

function getPrecio(){
    return Math.round(Math.random()*10000)/100;
}

//  2. Creacion de evento y funcion que se ejecutara cuando se haga click en el boton

btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
    // Crear bandera,  al ser true permite agregar los datos  ala tabla
    let isValid =true;
    // codigo para quitar espacios a los campos txtName, txtNumber
    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();
    console.log("Clickme");

    //  4. Instrucciones para quitar alerta
    txtName.style.border="";
    txtNumber.style.border="";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";

    //  3. Crear las validaciones para el campo txtName

    if (txtName.value.length<3) { // Evaluar el numero de caracteres y ejecutar una accion
        
        // 4. Cambiar el borde de la caja de texto
        txtName.style.border = "solid red medium"; // son tres parametros distintos.
        
        // 1. Crear alerta y contenido de alerta
        alertValidacionesTexto.innerHTML = "<strong> Nombre del producto no es correcto </strong>";
        alertValidaciones.style.display = "block";
        isValid=false;
    }

    if(! validarCantidad()){
        txtNumber.style.border = "solid red medium"; // son tres parametros distintos.
        
        // 1. Crear alerta y contenido de alerta
        alertValidacionesTexto.innerHTML += "<br/> <strong> La cantidad no es correcta</strong>";
        alertValidaciones.style.display = "block";
        isValid=false;

    }
    6// Pasar datos a tabla
    if(isValid){
        //7.2 Crear datos en tabla
        cont ++;
        let precio = getPrecio();
        let row = ` <tr>
                    <td>${cont}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                    </tr>`;

                    let elemento = {
                        "cont" : cont,
                        "nombre": txtName.value,
                        "cantidad" : txtNumber,
                        "precio" : precio
                    };
                    datos.push(elemento);

                    localStorage.setItem("datos",JSON.stringify(datos)); // Toma el arreglo y lo convierte a String

                    cuerpoTabla.insertAdjacentHTML("beforeend",row);
                    costoTotal += precio*Number(txtNumber.value);
                    totalPrecio.innerText = "$" + costoTotal.toFixed(2);
                    contadorProductos.innerText = cont;
                    nTotalProductos += Number(txtNumber.value);
                    totalProductos.innerText = nTotalProductos;
                    //7.3 Poner campos vacios de tctName y Muber
                    txtName.value="";
                    txtNumber.value="";
                    txtName.focus();
        }//isValid
    });// btnAgregar

    btnClear.addEventListener("click", function (event){
        event.preventDefault();
        console.log("ClickMe Clear");
        
        txtName.value = "";
        txtNumber.value ="";

        cont =0;
        costoTotal=0;
        nTotalProductos=0;
        totalPrecio.innerText = "$" + costoTotal;
        contadorProductos.innerText = cont;
        totalProductos.innerText = nTotalProductos;

        cuerpoTabla.innerHTML="";

        txtName.style.border ="";
        txtNumber.style.border ="";
        alertValidacionesTexto.innerHTML ="";
        alertValidaciones.style.display="none";

    });

