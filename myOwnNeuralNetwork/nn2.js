const lr = 0.5;
const Matrix = require('./Matrix.js').Matrix;

function sigmoid(x){
	return 1/(1 + Math.exp(-x));
}

function dsigmoid(fx){
	return fx*(1 - fx);
}

class NeuralNetwork{
	constructor(ninputs,nhiddens,noutputs){
		this.ninputs = ninputs;
		this.nhiddens = nhiddens;
		this.noutputs = noutputs;
		
		this.ihweights = new Matrix(this.nhiddens,this.ninputs);
		this.howeigths = new Matrix(this.noutputs,this.nhiddens);
		
		this.bias_h = new Matrix(this.nhiddens,1);
		this.bias_o = new Matrix(this.noutputs,1);
		
		this.ihweights.randomize(-1,1);
		this.howeigths.randomize(-1,1);
		
		this.bias_h.randomize(-1,1);
		this.bias_o.randomize(-1,1);
	}
	
	predict(inputs){
		inputs = new Matrix([inputs]).transpose();
		
		let hidden = Matrix.multiply(this.ihweights, inputs);
		hidden.add(this.bias_h);
		hidden.map(sigmoid);
		//apply sigmoid
		
		let outputs = Matrix.multiply(this.howeigths, hidden);
		outputs.add(this.bias_o);
		outputs.map(sigmoid);
		
		return outputs;
		
	}
	
	train(inputs,targets){
		
		inputs = new Matrix([inputs]).transpose();
	
		
		let hidden = Matrix.multiply(this.ihweights, inputs);
		
		
		hidden.add(this.bias_h);
		hidden.map(sigmoid);
		//apply sigmoid
		
		let outputs = Matrix.multiply(this.howeigths, hidden);
		outputs.add(this.bias_o);
		outputs.map(sigmoid);
		
		targets = new Matrix([targets]).transpose();
		
		let output_erro = targets.copy().subtract(outputs);
		
		let gradient = outputs.copy().map(dsigmoid);
		
		//console.log(outputs.copy().map(x=>x));
		
		gradient.hadamard(output_erro);
		let m1 = gradient.multiply(lr);
		let m2 = m1.multiply(hidden.transpose());
		this.howeigths.add(m2);
		this.bias_o.add(m1);
		
		let hidden_erro = Matrix.multiply(this.howeigths.transpose(), output_erro);
		
		let hidden_gradient = hidden.copy().map(dsigmoid);
		hidden_gradient.hadamard(hidden_erro);
		
		let m4 = hidden_gradient.multiply(lr);
		
		let weight_ih_deltas = m4.multiply(inputs.transpose());
		
		this.ihweights.add(weight_ih_deltas);
		this.bias_h.add(m4);
		
	}
	
}
module.exports = NeuralNetwork;
