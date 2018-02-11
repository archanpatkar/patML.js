let Matrix = require("./Matrix");

function ColVector(array)
{
    let output = [];
    for(let i of array)
    {
        output.push([i]);
    }
    return new Matrix(output);
}

let Sigmoid = (x) => 1 / ( 1 + Math.exp( - x ) );

let DerivativeSigmoid = (x) => Sigmoid( x ) * ( 1 - Sigmoid( x ) );

let Correction = (y) => y * ( 1 - y );

class NeuralNetwork
{
    constructor(input_nodes,hidden_nodes,output_nodes,learning_rate = 0.1,classifier = null)
    {
        // Init
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        // Weights
        this.weights_hidden = new Matrix(null,this.hidden_nodes,this.input_nodes,true);
        this.weights_output = new Matrix(null,this.output_nodes,this.hidden_nodes,true);

        // Randomizing Weights
        this.weights_hidden.randomize();
        this.weights_output.randomize();

        // Bias
        this.bias_hidden = new Matrix(null,this.hidden_nodes,1,true);
        this.bias_output = new Matrix(null,this.output_nodes,1,true);

        // Randomizing Bias
        this.bias_hidden.randomize();
        this.bias_output.randomize();

        this.learning_rate = learning_rate;
        if(classifier == null || classifier == undefined || typeof classifier != "function")
        {
            this.classifier = (output) => output[0] > 0.5 ? 1 : 0;
        }
        else
        {
            this.classifier = classifier;
        }

    }

    addClassifier(func)
    {
        this.classifier = func;
    }

    // Feed Forward
    feedForward(inputs)
    {
        // Generating the Hidden Layer's Output
        let vector = ColVector(inputs);

        let hidden = this.weights_hidden.dot(vector);
        hidden = hidden.add(this.bias_hidden);

        // Applying Activation Function
        hidden.transform(Sigmoid);

        // Generating Output
        let output = this.weights_output.dot(hidden);
        output = output.add(this.bias_output);

        // Applying Activation Function
        output.transform(Sigmoid);

        // Returing the Output
        return output.flatMap();
    }

    predict(inputs)
    {
        let output = this.feedForward(inputs);
        return this.classifier(output);
    }

    train(inputs,targets)
    {
        // Training...!
        // Generating the Hidden Layer's Output
        inputs = ColVector(inputs);

        let hidden = this.weights_hidden.dot(inputs);
        hidden = hidden.add(this.bias_hidden);
    
        // Applying Activation Function
        hidden.transform(Sigmoid);
    
        // Generating Output
        let outputs = this.weights_output.dot(hidden);
        outputs = outputs.add(this.bias_output);
    
        // Applying Activation Function
        outputs.transform(Sigmoid);
    
        // Training Process Starts --------------------------

        // Converting Array to Column Vector
        targets = ColVector(targets);

        // Calculating the Errors in Output
        // ERROR = TARGETS - OUTPUTS
        let error_output = targets.subtract(outputs);

        // Calculating Gradients
        let gradient = outputs.clone().transform(Correction);
        gradient = gradient.multiply(error_output);
        gradient = gradient.multiply(this.learning_rate);

        // Calculating Deltas
        let hidden_delta = gradient.dot(hidden.clone().transpose());

        // Updating Weights and Bias
        this.weights_output = this.weights_output.add(hidden_delta);
        this.bias_output = this.bias_output.add(gradient);

        // Calculating the Errors in Hiddens
        let error_hidden = this.weights_output.clone().transpose().dot(error_output);

        // Calculating Hidden Gradients
        let gradient_hidden = hidden.clone().transform(Correction);
        gradient_hidden = gradient_hidden.multiply(error_hidden);
        gradient_hidden = gradient_hidden.multiply(this.learning_rate);

        // Calculating Input Deltas
        let input_delta = gradient_hidden.dot(inputs.clone().transpose());

        // Updating Weights
        this.weights_hidden = this.weights_hidden.add(input_delta);
        this.bias_hidden = this.bias_hidden.add(gradient_hidden);
    }

}
