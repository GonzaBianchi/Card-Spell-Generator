export async function mainSpellsList() {
    const fileUrl = './dndspells.xlsx';  
    try {
        const response = await fetch(fileUrl);
        const data = await response.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const resultados = [];

        // Recorre las filas del archivo Excel
        for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i];
            // Check if the second column has content.
            if (row[1]) {
                // Create an <li> element and add the value from the second column.
                resultados.push(row[1]);
            }
        }

        // Sort <li> elements alphabetically
        resultados.sort();

        return resultados;

    } catch (error) {
        console.error('Error al obtener el archivo:', error);
        throw error;
    }
}
