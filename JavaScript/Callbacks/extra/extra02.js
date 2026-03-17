const list1 = ["Ana", "Luis", "Pedro"];
const list2 = ["Luis", "Maria", "Ana"];


function showMatch(name) {
    console.log(name);
}


function findMatches(arr1, arr2, callback) {
    for (const name of arr1) {       
        if (arr2.includes(name)) {    
            callback(name);           
        }
    }
}

findMatches(list1, list2, showMatch);