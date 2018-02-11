let dataset = LoadCSV("iris.csv");
let [trainingSet , testSet] = SplitDataset(dataset,0.67);

console.log(dataset);

console.log(`Split ${dataset.length} rows into train=${trainingSet.length} and test=${testSet.length} rows`);

let predictions = [];
let k = 3;

for(let i in testSet)
{
    let neighbors = GetNeighbors(trainingSet,testSet[i],k);
    let result = GetResponse(neighbors);
    predictions.push(result);
    console.log(`--> predicted = ${result} , actual = ${_.last(testSet[i])} <--`);
}

let accuracy = GetAccuracy(testSet, predictions)
console.log(`Accuracy = ${accuracy}%`);
