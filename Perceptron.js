function random(min, max) {
    return Math.random() * (max - min) + min;
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function sign(i)
{
    if(i > 0)
    {
        return 1;
    }
    else if (i < 0)
    {
        return -1;
    }
}

function sum(inputs,weights)
{
    let sum = 0;
    for(let i in weights)
    {
        sum += inputs[i] * weights[i];
    }
    return sum;
}


function getRandomPoints(n,min,max,label)
{
    let points = [];

    for(let i = 0; i < n;i++)
    {
        let point =  { x: randint(min,max) , y: randint(min,max) }
        point.label = label(point);
        points.push(point);
    }

    return points;
}



class Perceptron
{
    constructor(weights,learing_rate)
    {
        this.weights = [];

        this.learing_rate = learing_rate;

        for(let i = 0; i < weights; i++)
        {
            this.weights.push(random(-1,1));
        }
    }

    guess(inputs)
    {
        return sign(sum(inputs,this.weights));
    }

    train(inputs,target)
    {
        let guess = this.guess(inputs);
        let error = target - guess;
        for(let i in this.weights)
        {
            this.weights[i] += error * inputs[i] * this.learing_rate;
        }
    }
}

let p1 = new Perceptron(2,0.01)

console.log(p1);

let points = getRandomPoints(100 , 0 , 500 , (point) => point.x > point.y ? 1 : -1 );

console.log(points);


let correct = 0;
let wrong = 0;

for(let p of points)
{
    let inputs = [ p.x , p.y ];

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


correct = 0;
wrong = 0;

for(let p of points)
{
    let inputs = [ p.x , p.y ];
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
