import { readData } from "./editData";
const dialog = require('dialog');
const xlsx = require('xlsx');

function createExcelSheet(workBook, sheetName, jsonData) {
	var workSheet = xlsx.utils.json_to_sheet(jsonData, { sheet: sheetName });
	xlsx.utils.book_append_sheet(workBook, workSheet, sheetName);
}

export async function createExcelFile() {
	const sheetNamesFilePath = './src/database/sheetNames.json';
	const allDataWorkbook = xlsx.utils.book_new();

	try {
		const sheetNamesData = await readData(sheetNamesFilePath);
		const sheetNames = Object.keys(sheetNamesData);

		for (const sheetName of sheetNames) {
			const jsonFilePath = `./src/database/result/${sheetName}.json`;
			const jsonData = await readData(jsonFilePath);

			// Add data to the workbook
			createExcelSheet(allDataWorkbook, sheetName, jsonData);
		}

		const filename = 'Result.xlsx';
		xlsx.writeFile(allDataWorkbook, filename);
	} catch (error) {
		console.error('Error creating Excel file:', error);
	}
}