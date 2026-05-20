function success(number) {
    console.log("Valid number: " + number);
}

function error(number) {
    console.log("Invalid number: " + number);
}

function validateInput(number, callbackSuccess, callbackError) {
    if ( number > 0) {
        callbackSuccess(number);
    } else {
        callbackError(number);
    }
}

validateInput(5,success,error);
validateInput(-3, success, error);
validateInput(0,success,error);





function showMessage(message,number) {
    console.log(message , number);
}



function validateInput(number, callback ) {
    if ( number > 0) {
        callback("Valid number", number);
    } else {
        callback("Invalid number ", number);
    }
}

validateInput(5,showMessage);
validateInput(-3, showMessage);
validateInput(0,showMessage);
