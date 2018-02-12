var _ = require("underscore");

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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

function EuclideanDistance(instance1 , instance2)
{
    let distance = 0;
    for(let i in instance1)
    {
        distance += Math.pow( ( instance1[i] - instance2[i] ) , 2);
    }
    return Math.sqrt( distance );
}

function BMU(codebooks, test_row)
{
    let distances = [];
    for(let codebook of codebooks)
    {
        let dist = EuclideanDistance(codebook, test_row);
		distances.push([codebook, dist]);
    }
    distances = _.sortBy(distances, 1);
	return distances[0][0];
}

function RandomCodebook(train)
{
    let n_records = train.length - 1;
    let n_features = train[0].length;
    let codebook = [];
    for(let i = 0; i < n_features; i++)
    {
        codebook.push(train[randint(0,n_records)][i]);
    }
	return codebook;
}

function RandomCodebooks(train,n)
{
    let books = [];
    for(let i = 0; i < n; i++) books.push(RandomCodebook(train));
    return books;
}

function TrainCodebooks(train,n,learning_rate,epochs)
{
    let codebooks = RandomCodebooks(train,n);
    for(let e = 0; e < epochs; e++)
    {
        let rate = learning_rate * ( 1.0 - ( e / parseFloat(epochs) ) );
        let sum_error = 0.0;
        for(let row of train)
        {
            let bmu = BMU(codebooks,row);
            console.log(bmu);
            for(let i in row)
            {
                let error = row[i] - bmu[i];
                sum_error += error ** 2;
                if( _.last(bmu) == _.last(row) )
                {
                    bmu[i] += rate * error;
                }
                else 
                {
                    bmu[i] -= rate * error;
                }
            }
        }
        console.log(`>epoch=${e}, learning_rate=${rate}, error=${sum_error}`);
    }
    return codebooks;
}

function GetAccuracy(testSet, predictions)
{
    let correct = 0;
    for(let x in testSet)
    {
        if ( _.last(testSet[x]) === predictions[x]) correct += 1
    }
	return ( correct / parseFloat( testSet.length ) ) * 100.0
}

function Predict(codebooks,row)
{
    let bmu = BMU(codebooks,row);
    return _.last(bmu);
}

function LearningVectorQuantization(train,n,learning_rate,epochs)
{
    return TrainCodebooks(train,n,learning_rate,epochs);
}
