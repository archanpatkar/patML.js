let points = getRandomPoints(1000,0,1,(pt) => { 
    if(pt.x == 1 && pt.y == 1) 
    {
        return 1;
    }
    else 
    {
        return -1;
    }
});
let andgate = new Perceptron(2,0.02);


console.log(points);

for(let i = 0; i < 100; i++)
{
    let correct = 0;
    let wrong = 0;

    for(let p of points)
    {
        let inputs = [ p.x , p.y , 1];
        andgate.train(inputs , p.label);

        let guess = andgate.guess(inputs);

        if(guess == p.label)
        {
            correct += 1;
        }
        else
        {
            wrong += 1;
        }
    }

    console.log("Correct = " + correct);
    console.log("Wrong = " + wrong);
}

console.log(andgate.guess([0,0,1]));
console.log(andgate.guess([0,1,1]));
console.log(andgate.guess([1,0,1]));
console.log(andgate.guess([1,1,1]));

console.log(andgate);
