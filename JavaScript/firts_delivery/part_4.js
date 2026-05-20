const string_1 = "My first time with JS";

const result = [];

let string_2 = "";

for (let  i = 0; i < string_1.length; i++){  
    if (string_1[i]==" "){
        result.push(string_2);
        string_2 = "";

    } else { 

        string_2= string_2 + string_1[i];

    }

}

result.push(string_2);
console.log (result);
