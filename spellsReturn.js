import Card from './Card.js';
import CardHtml from './CardHtml.js';

export async function spellsArray(archivoTxt) {
    try {
        let array = [];
        const response = await fetch(archivoTxt);
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo.');
        }
        const textoDelArchivo = await response.text();
        // Dividir el contenido del archivo por saltos de línea y almacenarlo en un arreglo
        const lineas = textoDelArchivo.split('\n').map(linea => linea.replace(/\r$/, ''));
        // Ahora tienes un arreglo llamado "lineas" que contiene cada línea del archivo
        console.log(lineas);
        let set =  new Set(lineas);
        array = Array.from(set);
        return array;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function spellsShow(archivoTxt) {
    const fileUrl = './dndspells.xlsx';
    let spellList;
  
    try {
        // Llamar a spellsArray y esperar su resolución antes de continuar
        const result = await spellsArray(archivoTxt);
        spellList = result;
    
        const response = await fetch(fileUrl);
        const data = await response.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        console.log(jsonData);

        const resultados = [];
    
        const nombresNoEncontrados = []; // Array para almacenar nombres no encontrados

        for (let i = 0; i < spellList.length; i++) {
            let control = false;
            for(let j = 0; j < jsonData.length; j++) {
                if(jsonData[j][1] == spellList[i]) {
                    control = true;
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
            if(control == false){
              nombresNoEncontrados.push(spellList[i]);
            }
        }

        console.log(resultados);

        if (nombresNoEncontrados.length > 0) {
          const mensaje = "Los siguientes nombres no se encuentran en el Excel:\n" + nombresNoEncontrados.join("\n");
          alert(mensaje);
        }

        return resultados;

    } catch (error) {
        console.error('Error al obtener el archivo:', error);
        throw error;
    }
}

export async function returnSpells(archivoTxt) {
    let main = document.querySelector("main");
    main.style.display = "none";
    let body = document.querySelector("body");
    body.style.height = "100%";
    let hojaA4Div = document.createElement("div");
    hojaA4Div.classList.add("hojaA4");
    body.appendChild(hojaA4Div);
    let hojaA4 = document.querySelector(".hojaA4");
  
    try {
      const spellsObjects = await spellsShow(archivoTxt);
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
  
  