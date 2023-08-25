import { start } from "../renderer";
import { saveData, readData } from "./editData";
import { choice } from "./choice";

const xlsx = require('xlsx');

export function excelChecker(files, situation = "Initial") {
	const file = files[0];
	const reader = new FileReader();

	reader.onload = async (event) => {
		const arrayBuffer = event.target.result as ArrayBuffer;
		const data = new Uint8Array(arrayBuffer);
		const wb = xlsx.read(data, { type: 'array' });
		let sheetNames = wb.SheetNames;
		let sheetNameJSON = {};

		const oldSheetNamesAndDistinctive = await readData(`./src/database/sheetNames.json`)
		const oldSheetNames = Object.keys(oldSheetNamesAndDistinctive)

		if (oldSheetNames.every(item => sheetNames.includes(item))) {
			for (const sheetName of oldSheetNames) {
				sheetNameJSON[sheetName] = [];
				const ws = wb.Sheets[sheetName];
				const datajson = xlsx.utils.sheet_to_json(ws);

				let methodology = {};

				datajson.forEach(obj => {
					for (const key in obj) {
						if (!methodology[key]) {
							methodology[key] = [];
						}
						const value = obj[key];
						if (!methodology[key].includes(value)) {
							methodology[key].push(value);
						}
					}
				});

				for (const property in methodology) {
					if (datajson.length === methodology[property].length) {
						sheetNameJSON[sheetName].push(property);
						delete methodology[property];
					}
				}

				if (sheetNameJSON[sheetName].length === 0) {
					start("uploadExcel")
					document.getElementById("TypeError").innerText = "Ձեր վերբեռնած Excel ֆայլում մարդկանց տրված չէ եզակի կոդը որը թույլ կտա տարբերակել մարդկանց";
					throw new Error(`promise chain cancelled because there was no unique code (${sheetName})`);
				} else {
					if (sheetNameJSON[sheetName].includes(oldSheetNamesAndDistinctive[sheetName][0])) {
						const oldMethodologyKeys = Object.keys((await readData(`./src/database/methodology/${sheetName}.json`))[0]);
						const methodologyKeys = Object.keys(methodology)
						if (!(oldMethodologyKeys.every(item => methodologyKeys.includes(item)))) {
							start("uploadExcel")
							document.getElementById("TypeError").innerText = "Ձեր վերբեռնած Excel ֆայլում բացակայում են որոշ ֆիլդեր";
							return
						}
					} else {
						start("uploadExcel")
						document.getElementById("TypeError").innerText = "Ձեր վերբեռնած Excel ֆայլում մարդկանց տրված չէ եզակի կոդը որը թույլ կտա տարբերակել մարդկանց";
						throw new Error(`promise chain cancelled because there was no unique code (${sheetName})`);
					}
				}
			}
			for (const sheetName of oldSheetNames) {
				const ws = wb.Sheets[sheetName];
				const datajson = xlsx.utils.sheet_to_json(ws);
				saveData(`./src/database/completeData/${sheetName}.json`, datajson)
				saveData(`./src/database/result/${sheetName}.json`, [])
				saveData(`./src/database/refused/${sheetName}.json`, [])
				saveData(`./src/database/result/${sheetName}.json`, [])
			}
			saveData('./src/database/noResult.json', [])
			saveData('./src/database/replacing/noResult.json', [])
			await choice()
			saveData('./src/database/newExcelUpload.json', false)
			document.getElementById("bgtransparent").classList.add("hide")
		} else {
			start("uploadExcel")
			document.getElementById("TypeError").innerText = `Ձեր վերբեռնած Excel ֆայլում չկա որոշ բազան կամ բազաներ`;
			return
		}
	};
	reader.onerror = (event) => {
		console.error('Error reading the file:', event.target.error);
	};

	reader.readAsArrayBuffer(file);
}

export function newExcelUpload() {
	document.getElementById("start-div").classList.remove("hide");
	document.getElementById("result").classList.add("hide");
	document.getElementById('btn-start').addEventListener('click', () => { start("uploadExcel") });
}