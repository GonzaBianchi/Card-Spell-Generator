export default class CardHtml{
		constructor(carta, hojaA4) {
			this.card = document.createElement("div");
			this.card.classList.add("card");
			this.hechizoTitle = document.createElement("h3");
			this.hechizoTitle.classList.add("hechizoTitle");
			this.casteoDiv = document.createElement("div");
			this.labelCasteo = document.createElement("p");
			this.casteoP = document.createElement("p");
			this.casteoDiv.classList.add("casteoDiv");
			this.labelCasteo.classList.add("labelCasteo");
			this.casteoP.classList.add("casteoP");
			this.rangoDiv = document.createElement("div");
			this.labelRango = document.createElement("p");
			this.rangoP = document.createElement("p");
			this.rangoDiv.classList.add("rangoDiv");
			this.labelRango.classList.add("labelRango");
			this.rangoP.classList.add("rangoP");
			this.componentesDiv = document.createElement("div");
			this.labelComponentes = document.createElement("p");
			this.componentesP = document.createElement("p");
			this.componentesDiv.classList.add("componentesDiv");
			this.labelComponentes.classList.add("labelComponentes");
			this.componentesP.classList.add("componentesP");
			this.duracionDiv = document.createElement("div");
			this.labelDuracion = document.createElement("p");
			this.duracionP = document.createElement("p");
			this.duracionDiv.classList.add("duracionDiv");
			this.labelDuracion.classList.add("labelDuracion");
			this.duracionP.classList.add("duracionP");
			this.descripcionDiv = document.createElement("div");
			this.descripcionP = document.createElement("p");
			this.descripcionDiv.classList.add("descripcionDiv");
			this.descripcionDiv.setAttribute("data-bs-toggle","modal");
			this.descripcionDiv.setAttribute("data-bs-target","#exampleModal")
			this.descripcionP.classList.add("descripcionP");
			this.nivelYTipoHechizo = document.createElement("p");
			this.nivelYTipoHechizo.classList.add("nivelYTipoHechizo");
	
			this.labelCasteo.innerHTML = "Casting Time";
			this.labelRango.innerHTML = "Range";
			this.labelComponentes.innerHTML = "Components";
			this.labelDuracion.innerHTML = "Duration";
	
			hojaA4.appendChild(this.card);      
			this.card.appendChild(this.hechizoTitle);
			this.card.appendChild(this.casteoDiv);
			this.casteoDiv.appendChild(this.labelCasteo);
			this.casteoDiv.appendChild(this.casteoP);
			this.card.appendChild(this.rangoDiv);
			this.rangoDiv.appendChild(this.labelRango);
			this.rangoDiv.appendChild(this.rangoP);
			this.card.appendChild(this.componentesDiv);
			this.componentesDiv.appendChild(this.labelComponentes);
			this.componentesDiv.appendChild(this.componentesP);
			this.card.appendChild(this.duracionDiv);
			this.duracionDiv.appendChild(this.labelDuracion);
			this.duracionDiv.appendChild(this.duracionP);
			this.card.appendChild(this.descripcionDiv);
			this.descripcionDiv.appendChild(this.descripcionP);
			this.card.appendChild(this.nivelYTipoHechizo);

			this.hechizoTitle.innerHTML = carta.name;
			this.casteoP.innerHTML = carta.cast;
			this.rangoP.innerHTML = carta.range;
			this.componentesP.innerHTML = carta.components;
			this.duracionP.innerHTML = carta.duration;
			this.descripcionP.innerHTML = carta.description;
			this.nivelYTipoHechizo.innerHTML = "Level " + carta.level + "    -    " + carta.type;
			//.01em -> 0.16px
			this.modificarTamanioLetra();
			
			//this.descripcionP.style.fontSize();


			this.containerSpellEditor = document.createElement("div");
			this.containerSpellEditor.classList.add("editSpellDescContainer");
			this.editDescSpell = document.createElement("div");
			this.editDescSpell.classList.add("editDescSpell");
			this.topEditDescSpell = document.createElement("div");
			this.topEditDescSpell.classList.add("topEditDescSpell");
			this.spellTitle = document.createElement("h2");
			this.spellTitle.classList.add("spellTitle");
			this.xMark = document.createElement("i");
			this.xMark.classList.add("fa-regular", "fa-circle-xmark");
			this.midEditDescSpell = document.createElement("div");
			this.midEditDescSpell.classList.add("midEditDescSpell");
			this.spellDesc = document.createElement("textarea");
			this.spellDesc.setAttribute("id", "spellDesc");
			this.bottomEditDescSpell = document.createElement("div");
			this.bottomEditDescSpell.classList.add("bottomEditDescSpell");
			this.close = document.createElement("button");
			this.close.classList.add("close");
			this.close.innerHTML = "Close"
			this.updateSpell = document.createElement("button");
			this.updateSpell.classList.add("updateSpell");
			this.updateSpell.innerHTML = "Update";

			let cuerpo = document.querySelector("body");
			cuerpo.appendChild(this.containerSpellEditor);
			this.containerSpellEditor.appendChild(this.editDescSpell);
			this.editDescSpell.appendChild(this.topEditDescSpell);
			this.topEditDescSpell.appendChild(this.spellTitle);
			this.topEditDescSpell.appendChild(this.xMark);
			this.editDescSpell.appendChild(this.midEditDescSpell);
			this.midEditDescSpell.appendChild(this.spellDesc);
			this.editDescSpell.appendChild(this.bottomEditDescSpell);
			this.bottomEditDescSpell.appendChild(this.close);
			this.bottomEditDescSpell.appendChild(this.updateSpell);
			// let editSpellDescContainer = document.querySelector(".editSpellDescContainer");
			// this.containerSpellEditor = editSpellDescContainer.cloneNode(true);
			// cuerpo.appendChild(this.containerSpellEditor);
			// this.spellTitle = document.querySelector(".spellTitle");
			// this.spellDesc = document.querySelector("#spellDesc");
			// this.updateSpell = document.querySelector(".updateSpell");
			// this.close = document.querySelector(".close");
			// this.xMark = document.querySelector(".fa-circle-xmark");
			

			this.descripcionDiv.addEventListener("click", () => {
				this.containerSpellEditor.style.display = "block";
				this.spellTitle.innerHTML = this.hechizoTitle.innerHTML;
				this.spellDesc.value = this.descripcionP.innerHTML.replace("<br>", "\n");
				this.updateSpell.addEventListener("click", () => {
					console.log("Button clicked for card:", this.hechizoTitle.innerHTML);
					this.descripcionP.innerHTML = this.spellDesc.value.replace("\n", "<br>");
					this.containerSpellEditor.style.display = "none";
					this.modificarTamanioLetra()
				})
			})
			this.close.addEventListener("click", () => {
				this.containerSpellEditor.style.display = "none";
			})
			this.xMark.addEventListener("click", () => {
				this.containerSpellEditor.style.display = "none";
			})
			window.addEventListener("click", (event) => {
				if (event.target == this.containerSpellEditor) {
					this.containerSpellEditor.style.display = "none";
				}
			});			
	}

	modificarTamanioLetra(){
		let fontSize = 1;
		this.descripcionP.style.fontSize = fontSize + "em";
		while(this.descripcionP.offsetHeight + 10 > this.descripcionDiv.offsetHeight){
			fontSize-=0.01;
			this.descripcionP.style.fontSize = fontSize + "em";
		}
		if(fontSize <= 0.5){
			console.log(this.hechizoTitle.innerHTML + " no se lee correctamente");
		}
	};
}