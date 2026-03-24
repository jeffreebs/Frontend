const strings=["very","dogs","cute","are"] 

async function getWords() {
    const [p1,p2,p3,p4]= await Promise.all([
        new Promise(resolve => setTimeout(()=>resolve("very"),3000)),
        new Promise(resolve => setTimeout(()=>resolve("dogs"),3000)),
        new Promise(resolve => setTimeout(()=>resolve("cute"),3000)),
        new Promise(resolve => setTimeout(()=>resolve("are"),3000)),
    ]);

    console.log(`${p2} ${p4} ${p1} ${p3}`);

}

getWords();   
