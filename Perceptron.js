function random(a = 0, b = 1){
    return a + Math.random()*(b - a);
}
class Perceptron{
    constructor(ninputs){
        //bias is w[0]
        this.weights = new Array(ninputs);
        for(let i = 0;i<ninputs;i++){
            this.weights[i] = random(-1,1);
        }
        
    }
}