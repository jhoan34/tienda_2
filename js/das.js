function findFirstRepeated(gifts) {

    for (let i = 0; i < gifts.length; i++) {
        for(let j = i + 1; j < gifts.length; j++) {
            if(gifts[i] === gifts[j]) {
                console.log(gifts[i])
            }
        }
    }

    console.log("no hay repeticiones")
}
  
  findFirstRepeated([1,3,2,3,5])