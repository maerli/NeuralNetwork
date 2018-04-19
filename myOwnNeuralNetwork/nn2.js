const Matrix = require('./matrix.js')

function sigmoid(){
	returm 1/(1 + Math.exp(-x));
}

function dsigmoid(fx){
	return fx*(1 - fx*fx);
}

class NeuralNetwork{
	constructor(ninputs,nhiddens,noutputs){
		this.ninputs = ninputs;
		this.nhiddens = nhiddens;
		this.noutputs = noutputs;
		
		this.ihweights = new Matrix(this.ninputs,this.nhiddens);
		this.howeigths = new Matrix(this.nhiddens,this.noutputs);
		
		this.bias_h = new Matrix(this.nhiddens,1);
		this.bias_o = new Matrix(this.noutputs,1);
		
		this.ihweights.randomize(-1,1);
		this.howeigths.randomize(-1,1);
		
		this.bias_h.randomize(-1,1);
		this.bias_o.randomize(-1,1);
	}
	
	predict(inputs){
		let inputs = new Matrix([inputs]).transpose();
		
		let hidden = Matrix.multiply(this.ihweights, inputs);
		hidden.add(this.bias_h);
		hidden.map(sigmoid);
		//apply sigmoid
		
		let output = Matrix.multiply(this.howeigths, hidden);
		output.add(this.bias_o);
		output.map(sigmoid);
		
		return output;
		
	}
	
	train(inputs,targets){
		let targets = new Matrix([targets]).transpose();
		let outputs = this.predict(inputs);
		let output_erro = tagets.subtract(outputs);
		
		
		
	}
	
}