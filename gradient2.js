//encontrando o minino de funçoes de 3 variaveis
//com gradient descend

// x^2 - 4xy + 5z;

let g = [ //derivadas parciais
	(x,y) => 2*x - 4*y,
	(x) => -4*x,
	z => 5
];


let x = 1;
let y = 1;
let z = 1;

const err = 0.01
const n_iter = 100;
const gama = 0.1;

function derivate(x){
	return 2*x - 4;
}

for(let i = 0;i<n_iter;i++){
	x -= gama*g[0](x,y);
	y -= gama*g[1](x);
	z -= gama*g[2](z);
	
}
console.log(x);
console.log(y);
console.log(z);
