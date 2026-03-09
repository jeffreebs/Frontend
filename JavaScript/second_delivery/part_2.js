function eliminated(numbers){
    let result = [];
    for (const num of numbers){
        if (!result.includes(num)){
            result.push(num);
        }
    }

    return result; 
}

console.log(eliminated([1,2,2,3,4,5,5,6]));