const numbers = [1,2,3,4,5,6,7,8,9,10];

const twins = [];

for ( const numb of numbers){
    if  (numb % 2 === 0){
            twins.push(numb);
    }
            
}

console.log (twins);