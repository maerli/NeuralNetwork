//saber se um número é par ou impar

let NeuralNetwork = require('.././nn.js').NeuralNetwork;
function random(a = 0, b = 1){
    return a + Math.random()*(b - a);
}

let nn = new NeuralNetwork(1,4,2);
nn.setLearningRate(0.8);
//treinar rede
for(let i = 0;i<100000;i++){
	let x = Math.floor(random(0,5));
	let output;
	if(x % 2 == 0){
		output = 1; //par
	}else{
		output = 0; //impar
	}
	//console.log(output);
	nn.train([x/5],[output,1 - output]);
}


console.log(nn.predict([4]));