import Card from './Card.js';
import CardHtml from './CardHtml.js';

export function mostrarCSV(archivo){
	let body = document.querySelector("body");
	let hojaA4Div = document.createElement("div");
	hojaA4Div.classList.add("hojaA4");
	body.appendChild(hojaA4Div);
	let hojaA4 = document.querySelector(".hojaA4");
	
	// Guardamos los datos del csv en cartas
	let cant = 0;
	fetch(archivo)
	.then(response => response.text())
	.then(data => {
		const rows = data.split('\n'); // Split the data into rows
			rows.forEach(row => {
				const columns = row.split(';'); // Split the row into columns
				let cartaAct = new Card(columns);
				cant++;
				if(cant == 10){
					cant = 1;
					let hojaA4_newDiv = document.createElement("div");
					hojaA4_newDiv.classList.add("hojaA4");
					body.appendChild(hojaA4_newDiv);
					let hojaA4_new = document.querySelector(".hojaA4");
					hojaA4_newDiv.style.background = "white";
					hojaA4 = hojaA4_newDiv;
					let cartaHtml = new CardHtml(cartaAct, hojaA4_newDiv);
				}
				else{
					let cartaHtml = new CardHtml(cartaAct, hojaA4);
				}                
			});
		});
}
