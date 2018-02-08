function f(x)
{
    return x * 0.3 + 0.1;
}

let p1 = new Perceptron(2,0.01)

console.log(p1);

let points = getRandomPoints(100 , 0 , 500 , (point) => f(point.x) > point.y ? 1 : -1 );

console.log(points);


let correct = 0;
let wrong = 0;

for(let p of points)
{
    let inputs = [ p.x , p.y , 1];

    let guess = p1.guess(inputs);

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

for(let i = 0; i < 100; i++)
{
    correct = 0;
    wrong = 0;

    for(let p of points)
    {
        let inputs = [ p.x , p.y , 1];
        p1.train(inputs , p.label);

        let guess = p1.guess(inputs);

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


console.log(p1);
