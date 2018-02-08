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

        for(let i = 0; i < weights + 1; i++)
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

    predict(x)
    {
        let w0 = this.weights[0];
        let w1 = this.weights[1];
        let wb = this.weights[2];
        return - (w2/w1) - (w0/w1) * x;
    }
}
