var fs = require("fs");

function LoadCSV(filename)
{
    let records = [];
    let data = fs.readFileSync(filename).toString();
    var lines = data.split('\n');
    for(let record of lines)
    {
        let columns = record.split(',');
        let stock = [];
        stock.push(new Date(columns[0]).getTime());
        stock.push(parseFloat(columns[1]))
        records.push(stock);
    }
    return records;
}


var LinearModel = require("./Regression").LinearModel;

let dataset = LoadCSV("google.csv");

let google = new LinearModel(dataset);

google.train();

console.log(google);
console.log(google.predict(new Date("8-2-2018").getTime()));
