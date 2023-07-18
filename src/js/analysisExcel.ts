import { start } from "../renderer";
import { getMethodology } from "./getMethodology";
import { saveData } from "./editData";
import { addtables } from "./methodologyTableCreator";
import { createwindow } from "./window";

const xlsx = require('xlsx');

export function analysisExcel(file: File) {
	const reader = new FileReader();

	reader.onload = (event) => {
		let tables = []
		const arrayBuffer = event.target.result as ArrayBuffer;
		const data = new Uint8Array(arrayBuffer);
		const wb = xlsx.read(data, { type: 'array' });

		let sheetNames = wb.SheetNames;

		let sheetNameJSON = {};

		for (const sheetName of sheetNames) {
			sheetNameJSON[sheetName] = [];
			const ws = wb.Sheets[sheetName];
			const datajson = xlsx.utils.sheet_to_json(ws);

			saveData('./src/database/completeData/' + sheetName + '.json', datajson)
			saveData('./src/database/result/' + sheetName + '.json', [])

			let result: { [key: string]: string[] } = {};

			datajson.forEach(obj => {
				for (const key in obj) {
					if (obj.hasOwnProperty(key)) {
						if (!result[key]) {
							result[key] = [];
						}
						const value = obj[key];
						if (!result[key].includes(value)) {
							result[key].push(value);
						}
					}
				}
			});

			for (const property in result) {
				if (datajson.length === result[property].length) {
					sheetNameJSON[sheetName].push(property);
					delete result[property];
				}
			}
			if (sheetNameJSON[sheetName].length === 0) {
				start()
				document.getElementById("TypeError").innerText = "Ձեր վերբեռնած Excel ֆայլում մարդկանց տրված չէ եզակի կոդը որը թույլ կտա տարբերակել մարդկանց";
				throw new Error(`promise chain cancelled because there was no unique code (${sheetName})`);
			}

			// Create the table element
			const table = document.createElement('table');
			table.setAttribute("class", "styled-table");
			// Create the table header
			const thead = document.createElement('thead');
			const headerRow = document.createElement('tr');

			for (const key in result) {
				if (result.hasOwnProperty(key)) {
					const th = document.createElement('th');
					th.textContent = key;
					headerRow.appendChild(th);
					// Add a column header for the input fields
					const inputTh = document.createElement('th');
					inputTh.textContent = '№';
					headerRow.appendChild(inputTh);
				}
			}

			thead.appendChild(headerRow);
			table.appendChild(thead);

			// Create the table body
			const tbody = document.createElement('tbody');

			// Get the maximum length among the arrays
			const maxLength = Math.max(...Object.values(result).map(arr => arr.length));

			for (let i = 0; i < maxLength; i++) {
				const row = document.createElement('tr');

				for (const key in result) {
					if (result.hasOwnProperty(key)) {
						const td = document.createElement('td');
						const value = result[key][i] || ''; // Handle empty values
						td.textContent = value;
						row.appendChild(td);

						if (value) { // Skip creating and appending empty td elements
							const inputTd = document.createElement('td');
							const div = document.createElement('div')
							const input = document.createElement('input');
							const greaterOrEqual = document.createElement('button');
							div.setAttribute("class", "input-div");
							input.type = 'number';
							input.dataset.key = key;
							input.dataset.index = value; // Set the data-index as the td name
							input.value = '0';
							input.setAttribute("min", "0");
							input.setAttribute("id", "tableinput");
							div.appendChild(input);

							greaterOrEqual.setAttribute("id", `${key}${value}`);
							greaterOrEqual.setAttribute("class", "greater-or-equal");
							greaterOrEqual.innerText = "="
							greaterOrEqual.setAttribute("data-text", "=")
							div.appendChild(greaterOrEqual);
							inputTd.appendChild(div);
							row.appendChild(inputTd);
						} else { // Handle empty value, leave the input field blank
							const inputTd = document.createElement('td');
							row.appendChild(inputTd);
						}
					}
				}

				tbody.appendChild(row);
			}

			table.appendChild(tbody);
			tables.push(table.outerHTML)
		}
		saveData("./src/database/sheetNames.json", sheetNameJSON)
		//document.getElementById("method-button").addEventListener("click", (even: Event) => { checking(datajson, savedNumbers) });
		createwindow("80vw", "80vh", `<img src="src/img/back.svg" alt="back" class="btn-back" id="back"><div class="show-number-h">Ընտրության մեթոդաբանություն</div><div class="show-number-p">Ուշադրություն դարձնել որ բոլոր չափորոշիչների գումարը հավասար լինի միմյանց</div><div class="next-back"><img src="src/img/back.svg" alt="back" class="next-back-btn" id="previousPage"><div id="table-container"></div><img src="src/img/back.svg" alt="back" class="next-back-btn" id="nextPage" style="transform: rotate(180deg);"></div><div id="error-div"></div><div class="dots-div" id="dots-div"></div><button class="method-button" id="method-button">Հաստատել</button>`);
		document.getElementById('back').addEventListener('click', start)
		addtables(tables)
		getMethodology()

		const elements = document.getElementsByClassName('greater-or-equal') as HTMLCollectionOf<HTMLInputElement>;

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

	/*
		let jsonData = [{ "Country": "Russia", "Gender": "Male", "Education": "Professional or vocational", "Code": "ZZZ0", "AGEGroup": "46-60", "CountryFinal": "Russia" }, { "Country": "France", "Gender": "Male", "Education": "Professional or vocational", "Code": "YGH4", "AGEGroup": "61+", "CountryFinal": "France" }, { "Country": "Argentina", "Gender": "Female", "Education": "Professional or vocational", "Code": "UJY9", "AGEGroup": "61+", "CountryFinal": "Latin America" }, { "Country": "France", "Gender": "Male", "Education": "Professional or vocational", "Code": "CWA6", "AGEGroup": "61+", "CountryFinal": "France" }, { "Country": "USA", "Gender": "Female", "Education": "Professional or vocational", "Code": "LIK8", "AGEGroup": "46-60", "CountryFinal": "USA" }, { "Country": "Russia", "Gender": "Male", "Education": "Professional or vocational", "Code": "QJP0", "AGEGroup": "31-45", "CountryFinal": "Russia" }, { "Country": "Ukraine", "Gender": "Male", "Education": "Professional or vocational", "Code": "FVD5", "AGEGroup": "61+", "CountryFinal": "Former SU (excl. RU & Geo)" }, { "Country": "France", "Gender": "Male", "Education": "Professional or vocational", "Code": "UBR5", "AGEGroup": "61+", "CountryFinal": "France" }, { "Country": "Georgia", "Gender": "Male", "Education": "Professional or vocational", "Code": "ERS9", "AGEGroup": "31-45", "CountryFinal": "Georgia" }, { "Country": "Belarus", "Gender": "Female", "Education": "Professional or vocational", "Code": "GRZ5", "AGEGroup": "31-45", "CountryFinal": "Former SU (excl. RU & Geo)" }, { "Country": "Russia", "Gender": "Female", "Education": "Professional or vocational", "Code": "RZO0", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "France", "Gender": "Male", "Education": "Professional or vocational", "Code": "NXN5", "AGEGroup": "31-45", "CountryFinal": "France" }, { "Country": "Georgia", "Gender": "Female", "Education": "Professional or vocational", "Code": "XWM0", "AGEGroup": "46-60", "CountryFinal": "Georgia" }, { "Country": "France", "Gender": "Female", "Education": "Professional or vocational", "Code": "RRO3", "AGEGroup": "31-45", "CountryFinal": "France" }, { "Country": "France", "Gender": "Female", "Education": "Professional or vocational", "Code": "QHK2", "AGEGroup": "46-60", "CountryFinal": "France" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "FJI9", "AGEGroup": "46-60", "CountryFinal": "USA" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "UYD4", "AGEGroup": "61+", "CountryFinal": "USA" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "EKY6", "AGEGroup": "31-45", "CountryFinal": "USA" }, { "Country": "Russia", "Gender": "Female", "Education": "Professional or vocational", "Code": "HJO0", "AGEGroup": "46-60", "CountryFinal": "Russia" }, { "Country": "Ukraine", "Gender": "Male", "Education": "Professional or vocational", "Code": "CHN5", "AGEGroup": "31-45", "CountryFinal": "Former SU (excl. RU & Geo)" }, { "Country": "Italy", "Gender": "Female", "Education": "Professional or vocational", "Code": "DDY3", "AGEGroup": "61+", "CountryFinal": "Europe (excl. France)" }, { "Country": "Georgia", "Gender": "Female", "Education": "Professional or vocational", "Code": "DQH4", "AGEGroup": "31-45", "CountryFinal": "Georgia" }, { "Country": "Russia", "Gender": "Male", "Education": "Professional or vocational", "Code": "DAL3", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "JFO8", "AGEGroup": "46-60", "CountryFinal": "USA" }, { "Country": "Georgia", "Gender": "Male", "Education": "Professional or vocational", "Code": "RRM1", "AGEGroup": "46-60", "CountryFinal": "Georgia" }, { "Country": "UK", "Gender": "Male", "Education": "Professional or vocational", "Code": "MER0", "AGEGroup": "46-60", "CountryFinal": "Europe (excl. France)" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "GYX7", "AGEGroup": "61+", "CountryFinal": "USA" }, { "Country": "Germany", "Gender": "Male", "Education": "Professional or vocational", "Code": "GGO0", "AGEGroup": "31-45", "CountryFinal": "Europe (excl. France)" }, { "Country": "Russia", "Gender": "Female", "Education": "Professional or vocational", "Code": "MWL7", "AGEGroup": "31-45", "CountryFinal": "Russia" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "SAV0", "AGEGroup": "31-45", "CountryFinal": "USA" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "NCR0", "AGEGroup": "31-45", "CountryFinal": "USA" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "EVQ6", "AGEGroup": "61+", "CountryFinal": "USA" }, { "Country": "Russia", "Gender": "Female", "Education": "Professional or vocational", "Code": "STS3", "AGEGroup": "31-45", "CountryFinal": "Russia" }, { "Country": "Australia", "Gender": "Male", "Education": "Professional or vocational", "Code": "AUS8", "AGEGroup": "61+", "CountryFinal": "Other" }, { "Country": "Russia", "Gender": "Male", "Education": "Professional or vocational", "Code": "SVK3", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Georgia", "Gender": "Female", "Education": "Professional or vocational", "Code": "LJA7", "AGEGroup": "18-30", "CountryFinal": "Georgia" }, { "Country": "Russia", "Gender": "Male", "Education": "Professional or vocational", "Code": "RZA4", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "ZFK9", "AGEGroup": "46-60", "CountryFinal": "USA" }, { "Country": "USA", "Gender": "Female", "Education": "Professional or vocational", "Code": "JGV4", "AGEGroup": "31-45", "CountryFinal": "USA" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "MFG2", "AGEGroup": "61+", "CountryFinal": "USA" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "JFZ7", "AGEGroup": "61+", "CountryFinal": "USA" }, { "Country": "USA", "Gender": "Male", "Education": "University or postgraduate", "Code": "EMK0", "AGEGroup": "46-60", "CountryFinal": "USA" }, { "Country": "Russia", "Gender": "Male", "Education": "University or postgraduate", "Code": "OTK2", "AGEGroup": "31-45", "CountryFinal": "Russia" }, { "Country": "USA", "Gender": "Female", "Education": "University or postgraduate", "Code": "VHO3", "AGEGroup": "31-45", "CountryFinal": "USA" }, { "Country": "USA", "Gender": "Female", "Education": "University or postgraduate", "Code": "BOL9", "AGEGroup": "31-45", "CountryFinal": "USA" }, { "Country": "Russia", "Gender": "Male", "Education": "University or postgraduate", "Code": "LIU3", "AGEGroup": "61+", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Male", "Education": "University or postgraduate", "Code": "WRB3", "AGEGroup": "61+", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Male", "Education": "University or postgraduate", "Code": "ISI5", "AGEGroup": "46-60", "CountryFinal": "Russia" }, { "Country": "Canada", "Gender": "Female", "Education": "University or postgraduate", "Code": "ATJ9", "AGEGroup": "46-60", "CountryFinal": "Other" }, { "Country": "Russia", "Gender": "Male", "Education": "University or postgraduate", "Code": "ZIH0", "AGEGroup": "61+", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "PCR1", "AGEGroup": "46-60", "CountryFinal": "Russia" }, { "Country": "Canada", "Gender": "Female", "Education": "University or postgraduate", "Code": "GSB7", "AGEGroup": "61+", "CountryFinal": "Other" }, { "Country": "Sweden", "Gender": "Female", "Education": "University or postgraduate", "Code": "XTZ9", "AGEGroup": "61+", "CountryFinal": "Europe (excl. France)" }, { "Country": "Poland", "Gender": "Female", "Education": "University or postgraduate", "Code": "OOR4", "AGEGroup": "18-30", "CountryFinal": "Europe (excl. France)" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "FOS6", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "GGB9", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Belgium", "Gender": "Female", "Education": "University or postgraduate", "Code": "KMY8", "AGEGroup": "18-30", "CountryFinal": "Europe (excl. France)" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "GNH9", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "PKP4", "AGEGroup": "46-60", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "DZN4", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "KJW8", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "AHH3", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "WYO9", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "QMH9", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "JGA2", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "FEO4", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "TVS7", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "NOK3", "AGEGroup": "46-60", "CountryFinal": "Russia" }]
		function jsonToTable(jsonData) {
			let table = document.getElementById("styled-table-result");
	
	
			let thead = document.createElement("thead");
			let tbody = document.createElement("tbody");
	
			let headers = Object.keys(jsonData[0]);
			let headerRow = document.createElement("tr");
	
			headers.forEach(function (header) {
				let th = document.createElement("th");
				th.textContent = header;
				headerRow.appendChild(th);
			});
	
			thead.appendChild(headerRow);
			table.appendChild(thead);
	
			jsonData.forEach(function (rowData) {
				let row = document.createElement("tr");
	
				headers.forEach(function (header) {
					let cell = document.createElement("td");
					cell.textContent = rowData[header];
					row.appendChild(cell);
				});
	
				tbody.appendChild(row);
			});
	
			table.appendChild(tbody);
	
			return table;
		}
		document.getElementById('method-button').addEventListener('click', () => {
			document.getElementById('result').classList.remove("hide");
			document.getElementById('result').classList.add("result");
			document.getElementById("bgtransparent").classList.add("hide");
			document.getElementById("startdiv").classList.add("hide");
			// Convert JSON to HTML table and append it to the container
			jsonToTable(jsonData);
		})
	
	*/
}