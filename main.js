//xor exemplo

let NeuralNetwork = require('./nn.js').NeuralNetwork;
function random(a = 0, b = 1){
    return a + Math.random()*(b - a);
}

console.log(NeuralNetwork);

let training_data = [{
    inputs: [0, 0],
    outputs: [0]
  },
  {
    inputs: [0, 1],
    outputs: [1]
  },
  {
    inputs: [1, 0],
    outputs: [1]
  },
  {
    inputs: [1, 1],
    outputs: [0]
  }
];

let nn = new NeuralNetwork(2, 4, 1);
nn.setLearningRate(0.5);


for (let i = 0; i < 10000; i++) {
	
    let index = Math.floor(random(0,training_data.length));
    //console.log(index);
    let data = training_data[index];;
    nn.train(data.inputs, data.outputs);
  }
      let inputs = [1, 1];
      let y = nn.predict(inputs);
      console.log(y);
