import Card from './Card.js';
import CardHtml from './CardHtml.js';

export async function spellsShow(spellList) {
	const fileUrl = './dndspells.xlsx';
	spellList.sort();
	console.log(spellList);
  
	try {
	
	const response = await fetch(fileUrl);
	const data = await response.arrayBuffer();
	const workbook = XLSX.read(data, { type: 'array' });
	const sheetName = workbook.SheetNames[0];
	const sheet = workbook.Sheets[sheetName];
	const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

	const resultados = [];
	
	for (let i = 0; i < spellList.length; i++) {
		for(let j = 0; j < jsonData.length; j++) {
		if(jsonData[j][1] == spellList[i]) {
			const row = jsonData[j];
			const spell = {
				level: row[0],
				nombre: row[1],
				school: row[2],
				castingTime: row[3],
				range: row[4],
				components: row[5],
				duration: row[6],
				details: row[7].replace("<br><br>", "<br>").replace("<br> <br>", "<br>").replace("’", "'").replace("\n", "<br>").replace("\n \n", "<br>").replace("—", "-")
		  };
		  resultados.push(spell);
		  break;
		}
		}
	}

	console.log(resultados);

	return resultados;

	} catch (error) {
		console.error('Error al obtener el archivo:', error);
		throw error;
	}
}

export async function returnSpells(setSpells) {
	let main = document.querySelector("main");
	main.style.display = "none";
	let body = document.querySelector("body");
	body.style.height = "100%";
	body.style.backgroundColor = "white";
	let hojaA4Div = document.createElement("div");
	hojaA4Div.classList.add("hojaA4");
	body.appendChild(hojaA4Div);
	let hojaA4 = document.querySelector(".hojaA4");
  

	try {
		const array = Array.from(setSpells);
	  	const spellsObjects = await spellsShow(array);
	  	let cant = 0;
  
	  	spellsObjects.forEach(spell => {
			let cartaAct = new Card(spell);
			cant++;
			if (cant == 10) {
				cant = 1;
				let hojaA4_newDiv = document.createElement("div");
				hojaA4_newDiv.classList.add("hojaA4");
				body.appendChild(hojaA4_newDiv);
				hojaA4_newDiv.style.background = "white";
				hojaA4 = hojaA4_newDiv;
				let cartaHtml = new CardHtml(cartaAct, hojaA4_newDiv);
			} else {
				let cartaHtml = new CardHtml(cartaAct, hojaA4);
			}
	  	});
	} catch (error) {
	  	console.error('Error en returnSpells:', error);
	}
  }

export function listOfSpells(set, main, your, spell){
	set.add(spell.textContent);
	console.log(set);
	let yourSpellX = document.createElement("div");
	yourSpellX.classList.add("yourSpellX");
	let xMark = document.createElement("i");
	xMark.classList.add("fa-solid", "fa-circle-xmark");
	let yourSpell = document.createElement("li");
	yourSpell.classList.add("yourSpell");
	yourSpell.textContent = spell.textContent;
	if(spell && spell.parentElement === main){
		main.removeChild(spell);
		your.appendChild(yourSpellX);
		yourSpellX.appendChild(xMark);
		yourSpellX.appendChild(yourSpell);
		agregarElementoALaLista2(your);
	}
	let yourSpellX2 = document.querySelectorAll(".yourSpellX");
	yourSpellX2.forEach(spellX => {
		spellX.addEventListener('click', () => {
			let spellPlus = document.createElement("div");
			spellPlus.classList.add("spellPlus");
			let spellItem = document.createElement('li');
			let plus = document.createElement('i');
			plus.classList.add("fa-solid", "fa-circle-plus");
			spellItem.classList.add("spell");
			spellItem.textContent = spellX.textContent;
			if(spellX && spellX.parentElement === your){
				if(set.has(spellX.textContent)){
					set.delete(spellX.textContent);
				}
				console.log(set);
				your.removeChild(spellX);
				main.appendChild(spellPlus);
				spellPlus.appendChild(plus);
				spellPlus.appendChild(spellItem);
				agregarElementoALaLista(main);
				recursivexd(set, main, your);
			}
		})
	})
}


export function recursivexd(set, main, your){
	let spellPlus2 = document.querySelectorAll(".spellPlus");
	spellPlus2.forEach(spell => {
		spell.addEventListener('click', () => {
				listOfSpells(set, main, your, spell)
		})
	})  
}

function agregarElementoALaLista(main) {
  const elementosLi = Array.from(main.querySelectorAll('.spellPlus'));

  // Sort the elements alphabetically.
  elementosLi.sort((a, b) => a.textContent.localeCompare(b.textContent));

  // Delete all current <li> elements from the <ul>.
  elementosLi.forEach(li => main.removeChild(li));

  // Add the sorted elements back to the <ul>.
  elementosLi.forEach(li => main.appendChild(li));
  elementosLi.length = 0;
}

function agregarElementoALaLista2(main) {
  const elementosLi = Array.from(main.querySelectorAll('.yourSpellX'));

  // Sort the elements alphabetically.
  elementosLi.sort((a, b) => a.textContent.localeCompare(b.textContent));

  // Delete all current <li> elements from the <ul>.
  elementosLi.forEach(li => main.removeChild(li));

  // Add the sorted elements back to the <ul>.
  elementosLi.forEach(li => main.appendChild(li));
  elementosLi.length = 0;
}
