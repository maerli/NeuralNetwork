//Biblioteca para calculos de matrizes
class Matrix{
	constructor(nrows, ncols){
	   if(nrows instanceof Array){
	       this.nrows = nrows.length;
	       this.ncols = nrows[0].length;
	       this.data = nrows;
	   }else{
	
	    	  this.nrows = nrows;
         this.ncols = ncols;
		    this.data = new Array(this.nrows);
		    for(let i = 0;i<this.nrows;i++){
			      this.data[i] = new Array(this.ncols);
		    }
		    this.init();
		 }
	}
	init(){
		//iniciar matriz com valores 0
		for(let i = 0;i<this.nrows;i++){
			for(let j = 0;j<this.ncols;j++){
				this.data[i][j] = 0;
			}
		}
	}
	print(){
		for(let i = 0;i<this.nrows;i++){
			console.log(this.data[i].join(' '));
		}
		//console.table(this.data);

	}
	randomize(a,b,is_int = false){
		this.map(x => {
			let r = a + Math.random()*(b - a);
			return is_int?parseInt(r,10):r;
		});
	}
	map(func){
		for(let i = 0; i< this.nrows;i++){
			for(let j = 0;j<this.ncols;j++){
				this.data[i][j] = func(this.data[i][j],i,j);
			}
		}
		return this;
	}
	transpose(){
		let m = new Matrix(this.ncols,this.nrows);
		for(let i = 0;i<this.nrows;i++){
			for(let j = 0;j<this.ncols;j++){
				m.data[j][i] = this.data[i][j];
			}
		}
		return m;
	}
	getCol(index){
		let v1 = [];
		for(let i = 0;i<this.nrows;i++){
			v1.push(this.data[i][index]);
		}
		return v1;
	}
	setCol(index,v){
		for(let i = 0;i<this.nrows;i++){
			this.data[i][index] = v[i];
		}
	}
	getRow(index){
		let v1 = [];
		for(let i = 0;i<this.ncols;i++){
			v1.push(this.data[index][i]);
		}
		return v1;
	}
	setRow(index,v){
		this.data[index] = v;
	}
	static dot(v1,v2){
		let sum = 0;
		for(let i = 0;i<v1.length;i++){
			sum += v1[i] * v2[i];
		}
		return sum;
	}
	
	multiply(m1){
		if(m1 instanceof Matrix){
			let m_nrows = m1.nrows;
			let m_ncols = m1.ncols;
			if(m_nrows == this.ncols){
				let m2 = new Matrix(this.nrows,m_ncols);
				for(let i = 0;i<m2.nrows;i++){
					for(let j = 0;j<m2.ncols;j++){
						m2.data[i][j]= Matrix.dot(this.getRow(i),m1.getCol(j));
					}
				}
			return m2;
			}
		}else{
			let m2 = this.copy().map(x=>x*m1);
			return m2;
		}
	}
	
	static multiply(m1,m2){
		//produto matrcial this.data x m1
		if(m1 instanceof Matrix){
			let m_nrows = m2.nrows;
			let m_ncols = m2.ncols;
			if(m_nrows == m1.ncols){
				
				let m3 = new Matrix(m1.nrows,m_ncols);
				for(let i = 0;i<m3.nrows;i++){
					for(let j = 0;j<m3.ncols;j++){
						m3.data[i][j]= Matrix.dot(m1.getRow(i),m2.getCol(j));
					}
				}
			return m3;
			}
		}
	}
	
	
	hadamard(m1){//hadamard product
		for(let i = 0;i<m1.nrows;i++){
			for(let j = 0;j<m1.ncols;j++){
				this.data[i][j] = this.data[i][j] * m1.data[i][j]; 
			}
		}
		return this;
		
	}
	
	subtract(m1){
		for(let i = 0;i<m1.nrows;i++){
			for(let j = 0;j<m1.ncols;j++){
				this.data[i][j] -= m1.data[i][j]; 
			}
		}
		return this;
	}
	
	add(m1){
		for(let i = 0;i<m1.nrows;i++){
			for(let j = 0;j<m1.ncols;j++){
				this.data[i][j] += m1.data[i][j]; 
			}
		}
		return this;
	}
	
	static indentity(nrows,ncols){
		let m = new Matrix(nrows,ncols);
		m.map((x,i,j) => i == j?1:0);
		return m;
	}
	getIndex(i,j){
		return (i + j)%2 == 0?1:-1;
	}
	Adjunta(a,b){
		let m = [];
		let m1 = new Matrix(this.nrows - 1,this.ncols - 1);
		for(let i = 0;i<this.nrows;i++){
			let v1 = [];
			for(let j = 0;j<this.ncols;j++){
				if(!(i == a || j == b)) v1.push(this.data[i][j]);
			}
			if(i != a){
				m.push(v1);
			}
		}
		m1.data = m;
		return m1;
	}
	det(m1){
		if(m1 != undefined && m1.nrows == 1){
			return m1.data[0][0];
		}else if(m1 != undefined && m1.nrows == 2){
			let d = m1.data;
			return d[0][0]*d[1][1] - d[0][1]*d[1][0];
		}else if(m1 !== undefined){
			let sum = 0;
			for(let i = 0;i<m1.nrows;i++){
				let ad = m1.Adjunta(0,i);
				sum += m1.getIndex(0,i) * m1.data[0][i] * m1.det(ad);
			}
			return sum;
		}else{
			let sum = 0;
			for(let i = 0;i<this.ncols;i++){
				let ad = this.Adjunta(0,i);
				sum += this.getIndex(0,i) * this.data[0][i]*this.det(ad);
			}
			return sum;
		}
	}
	matrix_adjunta(){
		let m = new Matrix(this.nrows,this.ncols);
		m.map((x,i,j) => this.getIndex(i,j)*this.det(this.Adjunta(i,j)));
		m = m.transpose();
		return m;
	}
	copy(){
		let m = new Matrix(this.nrows, this.ncols);
		for(let i = 0;i<this.nrows;i++){
			for(let j = 0;j<this.ncols;j++){
				m.data[i][j] = this.data[i][j];
			}
		}
		return m;
	}
	solve(){
		//retorna matriz inversa
		//let m = new Matrix(this.nrows,this.ncols);
		let det = this.det();
		let ad = this.matrix_adjunta();
		ad.map(x => x * 1/det);
		return ad;
	}
}
module.exports = {
	'Matrix':Matrix
}