
const valores = ["0","1","2","3","4","5","6","7","8","9",'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];



function convertir() {
    const numeroAConvertir = document.querySelector("#numero").value.trim().toUpperCase();
    const fromBase = parseInt(document.querySelector("#from-base").value);
    const toBase = parseInt(document.querySelector("#to-base").value);

    if(!verificarNumero(numeroAConvertir)) return;
    if(!verificarValidez(numeroAConvertir, fromBase)) return;

    if(fromBase === 10){
        equivalente = frombase10(numeroAConvertir, toBase);
        console.log("from 10");
    }else if(toBase === 10){
        equivalente = tobase10(numeroAConvertir, fromBase);
    }else{
        temp = tobase10(numeroAConvertir, fromBase);
        equivalente = frombase10(temp, toBase);
    }

    var resultado = document.querySelector("#resultado");
    resultado.textContent = numeroAConvertir.toString() + "(Base " + fromBase.toString() + ") = " +  equivalente + "(Base " + toBase.toString() + ")";
}

function tobase10(number, base) {
    var resultado = 0;
    let decimal = number.indexOf('.');
    if(decimal == -1) decimal = number.length;
    for(const i in number) {
        if(number[i]=='.') continue;
        resultado += valores.indexOf(number[i]) * (base**(decimal - 1))
        decimal--;
    }
    resultado = resultado.toFixed(decimal * (-1));
    return resultado;
}

function frombase10(number, base) {
    let resultado = "";
    const arrayNumbers = number.split(".");

    let entero = parseInt(arrayNumbers[0]);
    
    let fraccion = parseFloat("0."+arrayNumbers[1]);
    
    while(entero > base - 1) {
        resultado = valores[entero % base] + resultado;
        entero = Math.floor(entero / base);
    }

    resultado = valores[entero] + resultado;

    if(arrayNumbers.length === 1) return resultado;

    resultado += "."
    
    for (const i in arrayNumbers[1]) {

        fraccion = fraccion * base;
        let digito = Math.floor(fraccion);
        resultado += valores[digito];
        fraccion = fraccion - digito;
        if(fraccion == 0) break;
    }

    return resultado;   
}

function verificarNumero(number){
    if (number === ""){
        alert("Ingrese un número.")
        return false;
    }
    return true;
}

function verificarValidez(number, base){
    const entradasValidas = valores.slice(0, base)
    for(const i in number){
        if(number[i] === ".") continue;
        if(!entradasValidas.includes(number[i])){
            alert("Entrada no valida, el número no corresponde a la base indicada.");
            console.log("? ")
            return false;
        }
    }
    return true;
}