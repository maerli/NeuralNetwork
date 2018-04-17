//AND exemplo
let NeuralNetwork = require('./nn.js').NeuralNetwork;
function random(a = 0, b = 1){
    return a + Math.random()*(b - a);
}

//console.log(NeuralNetwork);

let training_data = [{
    inputs: [0, 0],
    outputs: [0]
  },
  {
    inputs: [0, 1],
    outputs: [0]
  },
  {
    inputs: [1, 0],
    outputs: [0]
  },
  {
    inputs: [1, 1],
    outputs: [1]
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
  
console.log('inputs \t outupt');

let inputs1 = [1, 1];       // true | true -> true
let y1 = nn.predict(inputs1);
console.log(inputs1 , y1);

let inputs2 = [1, 0];       // true | false -> false
let y2 = nn.predict(inputs2);// 
console.log(inputs2 , y2);

let inputs3 = [0, 0];       // false| false -> false
let y3 = nn.predict(inputs3);// 
console.log(inputs3 , y3);

let inputs4 = [0, 1];       // false | true -> false
let y4 = nn.predict(inputs4);// 
console.log(inputs4 , y4);
