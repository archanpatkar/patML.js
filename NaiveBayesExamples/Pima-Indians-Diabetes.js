let dataset = LoadCSV("pima.csv");
let splitRatio = 0.67;
let [ trainingSet , testSet ] = SplitDataset(dataset, splitRatio);
console.log(`Split ${dataset.length} rows into train=${trainingSet.length} and test=${testSet.length} rows`);
let summaries = SummarizeByClass(trainingSet)
let predictions = GetPredictions(summaries, testSet)
let accuracy = GetAccuracy(testSet, predictions)
console.log(`Accuracy: ${accuracy}%`);
