import { start } from "../renderer";
import { getMethodology } from "./getMethodology";
import { saveData } from "./editData";
import { addtables } from "./methodologyTableAdd";
import { createwindow } from "./window";
import { methodologyTableCreate } from "./methodologyTableCreator";

interface sheetName {
	[key: string]: string[];
}

interface Methodology {
	[key: string]: string[];
}

interface convertedResult {
	[key: string]: { [key: string]: [string, number, number, boolean] };
}

interface MethodologyAndNumber {
	0: convertedResult;
	1: number;
}

const xlsx = require('xlsx');

export function analysisExcel(files: FileList) {
	const github conflict = files[0];
	const reader = new FileReader();

	reader.onload = (event) => {
		let tables = []
		const arrayBuffer = event.target.result as ArrayBuffer;
		const data = new Uint8Array(arrayBuffer);
		const wb = xlsx.read(data, { type: 'array' });

		let sheetNames = wb.SheetNames;

		let sheetNameJSON: sheetName = {};

		for (const sheetName of sheetNames) {
			sheetNameJSON[sheetName] = [];
			const ws = wb.Sheets[sheetName];
			const datajson = xlsx.utils.sheet_to_json(ws);

			saveData(`./src/database/completeData/${sheetName}.json`, datajson)
			saveData(`./src/database/result/${sheetName}.json`, [])
			saveData(`./src/database/refused/${sheetName}.json`, [])
			saveData('./src/database/noResult.json', [])
			saveData('./src/database/replacing/noResult.json', [])
			saveData('./src/database/replacing/sheetNames.json', [])

			let result: Methodology = {};

			datajson.forEach(obj => {
				for (const key in obj) {
					if (!result[key]) {
						result[key] = [];
					}
					const value = obj[key];
					if (!result[key].includes(value)) {
						result[key].push(value);
					}
				}
			});

			for (const property in result) {
				if (datajson.length === result[property].length) {
					sheetNameJSON[sheetName].push(property);
					delete result[property];
				}
			}

			const convertedResult: convertedResult = {};

			for (const key in result) {
				convertedResult[key] = {};

				for (const value of result[key]) {
					convertedResult[key][value] = ["", 0, 0, true];
				}
			}

			let methodology: MethodologyAndNumber = [convertedResult, 0];
			saveData("./src/database/methodology/" + sheetName + ".json", JSON.parse(JSON.stringify(methodology).replace(/""/g, "0")))

			if (sheetNameJSON[sheetName].length === 0) {
				start()
				document.getElementById("TypeError").innerText = "Ձեր վերբեռնած Excel ֆայլում մարդկանց տրված չէ եզակի կոդը որը թույլ կտա տարբերակել մարդկանց";
				throw new Error(`promise chain cancelled because there was no unique code (${sheetName})`);
			}


			const table = methodologyTableCreate(methodology)

			tables.push([table.outerHTML, ''])
		}
		saveData("./src/database/sheetNames.json", sheetNameJSON)

		createwindow("100vh", "80vh", `<img src="src/img/back.svg" alt="back" class="btn-back" id="back"><div class="show-number-h">Ընտրության մեթոդաբանություն</div><div class="show-number-p">Ուշադրություն դարձնել որ բոլոր չափորոշիչների գումարը հավասար լինի միմյանց</div><div class="next-back"><img src="src/img/back.svg" alt="back" class="next-back-btn" id="previousPage"><div id="table-container"></div><img src="src/img/back.svg" alt="back" class="next-back-btn right-arrow" id="nextPage"></div><div id="error-div"></div><div class="dots-div" id="dots-div"></div><button class="method-button" id="method-button">Հաստատել</button>`);

		document.getElementById('back').addEventListener('click', start)
		addtables(tables)
		getMethodology()

		const elements = document.getElementsByClassName('greater-or-equal') as HTMLCollectionOf<HTMLButtonElement>;

		for (let i = 0; i < elements.length; i++) {
			elements[i].addEventListener('click', () => {
				const value = elements[i].getAttribute("data-text")
				if (value === '=') {
					elements[i].innerText = "≥"
					elements[i].setAttribute("data-text", "≥");
				} else {
					elements[i].innerText = "="
					elements[i].setAttribute("data-text", "=");
				}
			});
		}
	};
	reader.onerror = (event) => {
		console.error('Error reading the file:', event.target.error);
	};

	reader.readAsArrayBuffer(file);
}