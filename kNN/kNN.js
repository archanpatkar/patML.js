var _ = require("underscore");
var fs = require("fs");

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
            if(c == columns.length - 1){}
            else columns[c] = parseFloat(columns[c]); 
        }
        records.push(columns);
    }
    return records;
}

function SplitDataset(dataset,splitRatio)
{
	let trainSize = parseInt(dataset.length * splitRatio)
	let trainSet = [];
    let testSet = Array.of(...dataset);
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

function EuclideanDistance(instance1 , instance2 , length)
{
    let distance = 0;
    for(let i = 0; i < length; i++)
    {
        distance += Math.pow( ( instance1[i] - instance2[i] ) , 2);
    }
    return Math.sqrt( distance );
}

// let data1 = [2, 2, 2, 'a'];
// let data2 = [4, 4, 4, 'b'];
// let distance = EuclideanDistance(data1, data2, 3);
// console.log(distance);

function GetNeighbors(trainingSet, testInstance, k)
{
    let distances = [];
    length = testInstance.length - 1;
	for(let x in trainingSet)
	{
        let dist = EuclideanDistance( testInstance , trainingSet[x] , length);
		distances.push([ trainingSet[x] , dist ]);
    }
    distances = _.sortBy(distances, 1);
    console.log("After");
    console.log(distances);
	let neighbors = [];
    for(let x = 0; x < k; x++)
    {
        neighbors.push(distances[x][0]);
    }
	return neighbors;
}

// let trainSet = [[2, 2, 2, 'a'], [4, 4, 4, 'b']];
// let testInstance = [5, 5, 5];
// let k = 1;
// let neighbors = GetNeighbors(trainSet, testInstance, 1);
// console.log(neighbors);

function GetResponse(neighbors)
{
    let classVotes = {}
    for (let x in neighbors)
    {
        let response = _.last(neighbors[x]);
        if( response in classVotes ) classVotes[response] += 1
		else classVotes[response] = 1
    }
    console.log("Before");
    console.log(classVotes);
    let sortedVotes = _.sortBy( _.pairs(classVotes) , 1).reverse();
    console.log("After");
    console.log(sortedVotes);
	return sortedVotes[0][0];
}

// let neighbors = [[1,1,1,'a'], [2,2,2,'a'], [3,3,3,'b']]
// let response = GetResponse(neighbors)
// console.log(response)

function GetAccuracy(testSet, predictions)
{
    let correct = 0;
    for(let x in testSet)
    {
        if ( _.last(testSet[x]) === predictions[x]) correct += 1
    }
	return ( correct / parseFloat( testSet.length ) ) * 100.0
}

// let testSet = [[1,1,1,'a'], [2,2,2,'a'], [3,3,3,'b']];
// let predictions = ['a', 'a', 'b'];
// let accuracy = GetAccuracy(testSet, predictions)
// console.log(accuracy);
