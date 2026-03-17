




const fs = require('fs');
const file1  = fs.readFileSync("list1.txt", "utf8");
const file2 = fs.readFileSync ("list2.txt", "utf8");

const list1 = file1.split("\n");
const list2 = file2.split('\n');


for (const word of list1) {
    if (list2.includes(word)) {
        console.log(word);  // imprime las que se repiten
    }
}

