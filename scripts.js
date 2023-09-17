import { returnSpells } from "./spellsReturn.js";

// Obtén referencias a los elementos HTML
const fileInput = document.getElementById('fileInput');
const loadFileButton = document.getElementById('loadFileButton');

// Agrega un evento de cambio al input de archivo
fileInput.addEventListener('change', handleFileUpload);

// Función para manejar la carga del archivo
function handleFileUpload(event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
        // Crea una URL para el archivo seleccionado
        const fileURL = URL.createObjectURL(selectedFile);

        // Llama a spellsArray con la URL del archivo
        // spellsArray(fileURL)
        returnSpells(fileURL)
            .then(result => {
                // returnSpells(fileURL);
                console.log("godines");
            })
            .catch(error => {
                console.error('Error al cargar el archivo:', error);
            });
    }
}

// Agrega un evento al botón para cargar el archivo
loadFileButton.addEventListener('click', () => {
    // Abre el cuadro de diálogo para seleccionar un archivo
    fileInput.click();
});


