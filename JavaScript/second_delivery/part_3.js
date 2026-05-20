function wordCounter (text){
    let result = {};
    let cleaned = text.toLowerCase().replace(/[.,!?;:]/g, "");
    let words = cleaned.split(" ");

    for (const word of words){
        if (result[word]){
            result[word]= result[word]+1;
        } else {
            result[word]= 1;
        }   
    }

    return result;


}



console.log(wordCounter("This is a test. This test is simple."));