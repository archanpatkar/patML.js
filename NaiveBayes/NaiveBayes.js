var _ = require("underscore");
var fs = require("fs");
var { Mean , PopulationStandardDeviation } = require("./Stats");

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function LoadCSV(filename)
{
    let records = [];
    let data = fs.readFileSync(filename).toString();
    var lines = data.split('\n');
    for(let record of lines)
    {
        let columns = record.split(',');
        for(let c in columns)
        {
            columns[c] = parseFloat(columns[c]); 
        }
        records.push(columns);
    }
    return records;
}

function SplitDataset(dataset,splitRatio)
{
	let trainSize = parseInt(dataset.length * splitRatio)
	let trainSet = [];
    let testSet = _.extend(dataset);
    let index = 0;
    let record = null;
    while(trainSet.length < trainSize)
    {
        index = randint(0 , testSet.length - 1);
        record = testSet[index];
        trainSet.push(record);
        testSet.splice(index,1);
    }
	return [ trainSet , testSet ]
}

function SeparateByClass(dataset)	
{
    let separated = {};
    for(let i in dataset)
    {
        let record = dataset[i];
        let cat = record[ record.length - 1 ];
        if(!(cat in separated))
        {
            separated[cat] = [];
        }
        separated[cat].push(record);
    }
    return separated;
}

function Summarize(dataset)
{
    let summaries = [];
    let zipped = _.zip(...dataset);
    zipped.map( (at) => at.map( (n) => parseFloat(n) ) );
    for(let attribute of zipped)
    {
        summaries.push([ Mean(attribute) , PopulationStandardDeviation(attribute) ]);
    }
    summaries.pop();
    return summaries;
}

function SummarizeByClass(dataset)
{
    let separated = SeparateByClass(dataset);
	let summaries = {}
    for (let key in separated)
    {
        summaries[key] = Summarize(separated[key]);
    }
	return summaries
}

function CalculateProbability(x,mean,stdev)
{
    let exponent = Math.exp( - ( (x-mean) ** 2 ) / (2 * ( stdev ** 2 ) ) );
    return ( 1 / ( Math.sqrt( 2 * Math.PI ) * stdev ) ) * exponent
}

function CalculateClassProbabilities(summaries, record)
{
    let probabilities = {};
    for(let key in summaries)
    {
        let classValue = key
        let classSummaries = summaries[key];
        probabilities[classValue] = 1
        for(let i in classSummaries)
        {
            let [mean, stdev] = classSummaries[i]
			let x = record[i]
			probabilities[classValue] *= CalculateProbability(x, mean, stdev)
        }
    }
	return probabilities
}

function Predict(summaries, record)
{
    let probabilities = CalculateClassProbabilities(summaries, record);
	let bestLabel = null , bestProb =  -1;
    for(let key in probabilities)
    {
        let probability = probabilities[key];
        if (bestLabel === null || probability > bestProb)
        {
            bestProb = probability;
			bestLabel = key;
        }	
    }	
	return bestLabel;
}

function GetPredictions(summaries,records)
{
    let predictions = [];
    for(let record of records)
    {
        predictions.push(Predict(summaries,record));
    }
    return predictions;
}

function GetAccuracy(testSet,predictions)
{
    let correct = 0;
    let classification = testSet[0].length - 1;
    for(let i in testSet)
    {
        if(testSet[i][classification] == predictions[i])
        {
            correct++;
        }
    }
    return ( correct / parseFloat(testSet.length) )  * 100;
}
