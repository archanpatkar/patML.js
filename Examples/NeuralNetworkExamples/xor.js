let training_data = [
    {inputs:[0,1] , target:[1]},
    {inputs:[1,0] , target:[1]},
    {inputs:[1,1] , target:[0]},
    {inputs:[0,0] , target:[0]},
];


let xor = new NeuralNetwork(2,2,1,0.1);

xor.addClassifier((output) => output[0] > 0.5 ? true : false);

for(let i = 0; i < 15000; i++)
{
    for(let data of training_data)
    {
        xor.train(data.inputs,data.target);
    }
}

console.log(xor.predict([0,0]));
console.log(xor.predict([0,1]));
console.log(xor.predict([1,0]));
console.log(xor.predict([1,1]));
