function isPar(){
    console.log("The number is even!")
}

function isImpar(){
    console.log("The number is odd!")
}

function checkNumber(number, callbackPar, callbackImpar) {
    if (number % 2 === 0) {
        callbackPar();    
    } else {
        callbackImpar(); 
    }
}

checkNumber(4, isPar, isImpar);  
checkNumber(7, isPar, isImpar); 