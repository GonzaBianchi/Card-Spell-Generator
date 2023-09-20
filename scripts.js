import { mainSpellsList } from "./spellList.js";
import { returnSpells, recursivexd } from "./yourList&Show.js";

try {
    const spellList = await mainSpellsList();
    const spellUL = document.querySelector(".mainSpellList");

    spellList.forEach(spell => {
        let spellPlus = document.createElement("div");
        spellPlus.classList.add("spellPlus");
        let spellItem = document.createElement('li');
        let plus = document.createElement('i');
        plus.classList.add("fa-solid", "fa-circle-plus");
        spellItem.classList.add("spell");
        spellItem.textContent = spell;
        spellUL.appendChild(spellPlus);
        spellPlus.appendChild(plus);
        spellPlus.appendChild(spellItem);
    });
} catch (error) {
    console.error('Error:', error);
}

// Obtener referencias a los elementos del DOM
const searchInput = document.querySelector('.spellFilter');
let spellPlus = document.querySelectorAll(".spellPlus");
// Agregar un evento de escucha al campo de entrada de texto
searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toUpperCase();
    const mainUl = document.querySelector('.mainSpellList');

    // Iterar a través de los elementos .spellPlus y mostrar/ocultar según el término de búsqueda
    spellPlus.forEach(spellPlus => {
        const text = spellPlus.textContent.toUpperCase();
        if (text.includes(searchTerm)) {
            spellPlus.style.display = 'flex'; // Mostrar .spellPlus
        } else {
            spellPlus.style.display = 'none'; // Ocultar .spellPlus
            mainUl.style.alignContent = 'start';
        }
    });
});


const setSpells = new Set();
let yourSpellList = document.querySelector(".yourSpellList");
let mainSpellList = document.querySelector(".mainSpellList");

recursivexd(setSpells, mainSpellList, yourSpellList);


let buttonGenerate = document.querySelector(".generateCards");
buttonGenerate.addEventListener('click', async () => {
    if(setSpells.size > 0){
        await returnSpells(setSpells);
        alert("Click on the spell's description to edit them");
    }else{
        alert("Add spells to your list!");
    }
    
})


let label = document.querySelector("label");
let lupa = document.querySelector(".fa-magnifying-glass");
function checkInput(searchInput, label, lupa) {
    if (searchInput.value !== '') {
      label.classList.add('active-label1');
      lupa.classList.add("active-label2")
    } else {
      label.classList.remove('active-label1');
      lupa.classList.remove("active-label2")
    }
}

searchInput.addEventListener('input', () => {
    checkInput(searchInput, label, lupa);
});

document.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement !== searchInput) {
      checkInput(searchInput, label, lupa);
    }
});