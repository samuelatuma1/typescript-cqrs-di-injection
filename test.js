///
///
class Discount {
    createdAt;
    constructor(date){
        this.createdAt = date;
    }
}
function sort(dataList){
    
    dataList.sort((a, b) => {
        let millisecondsForA = a.createdAt.getTime()
        let millisecondsForB = b.createdAt.getTime()
        return millisecondsForB - millisecondsForA;
    })

    return dataList.map(list => list.createdAt);
}

let a = new Date();
a.setFullYear(2022, 1, 1)
let b = new Date();
b.setFullYear(2023, 1, 1)
let c = new Date();
c.setFullYear(2024, 1, 1)
let dataList = [new Discount(a), new Discount(b), new Discount(c)];

console.log(sort(dataList));
