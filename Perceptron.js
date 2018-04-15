//learning rate
const lr = .001;
function random(a = 0, b = 1){

    return a + Math.random()*(b - a);

}

class Perceptron{

    constructor(ninputs){

        //bias is w[0]

        this.weigths = [
            random(-1,1),
            random(-1,1),
            random(-1,1)
        ];
    }
    activate(x,y){
        let w0 = this.weigths[0];
        let w1 = this.weigths[1];
        let w2 = this.weigths[2];
        return w0 + w1 * x + w2 * y;
    }
    guess(x,y){
        if(this.activate(x,y) > 0){
            return 1;
        }else{
            return -1;
        }
    }
    train(x,y,output){
        let guess = this.guess(x,y);
        let err = output - guess;
        this.weigths[0] += lr * err;
        this.weigths[1] += lr * x * err;
        this.weigths[2] += lr * y * err;
    }

}

// 
//training
let p = new Perceptron();
const tam = 100;
for(let i = 0;i<tam;i++){
    let x = random(0,tam);
    let y = random(0,tam);
    let output;
    if(x < y){
        output = -1;
    }else{
        output = -1;
    }
    p.train(x,y,output);
}

//making guesses
let total = 50;
let score = 0;
for(let i = 0;i<total;i++){
    let x = random(0,tam);
    let y = random(0,tam);
    let output;
    if(x < y){
        output = -1;
    }else{
        output = 1;
    }
    let guess = p.guess(x,y);
    if( guess == output){
        score += 1;
    }
}

console.log("Porcentagem de acertos" + (100*score/total));
