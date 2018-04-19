//encontrando o minino de funcçoes de uma variavel
//com gradient descend

// x^2 - 4x + 5;

let x0 = 1;
const err = 0.01
const n_iter = 10;
const gama = 0.5;

function derivate(x){
	return 2*x - 4;
}

for(let i = 0;i<n_iter;i++){
	x0 -= gama*derivate(x0);
}
console.log(x0);