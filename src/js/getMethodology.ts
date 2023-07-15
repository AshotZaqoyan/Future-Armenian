import {saveData, readData} from './editData'
import { methodologyChecker } from './methodologyChecker';

export function getMethodology() {
	document.getElementById("method-button").addEventListener('click', () => {
		let tables = document.getElementsByClassName("styled-table");
		let data=[]
		for (let i = 0; i < tables.length; i++) {
			let table = tables[i]
			const inputTag=(<HTMLInputElement>document.getElementById(`${i+1}`));
			const inputValue=inputTag.value!==''?Number(inputTag.value):0;
			let inputs = Array.from(table.getElementsByTagName("input"));
			const obj = {};

			// Iterate over each input element
			inputs.forEach(input => {
				// Get the data attributes from the input element
				const dataKey = input.getAttribute('data-key');
				const dataIndex = input.getAttribute('data-index');
				const value = input.value!==''?Number(input.value):0;

				// Check if the dataKey already exists in the object
				if (!obj[dataKey]) {
					obj[dataKey] = {};
				}
				const greaterOrEqualElement = document.getElementById(`${dataKey}${dataIndex}`).getAttribute("data-text")
				let greaterOrEqual=greaterOrEqualElement==="="
				// Set the value in the object using the dataKey and dataIndex
				obj[dataKey][dataIndex] = [value, 0, 0, greaterOrEqual];
			});

			let methodology=[]
			// Save resulting
			methodology.push(obj)
			methodology.push(inputValue)

			data.push(methodology)
		}
		const sheetNamesJson=readData('./src/database/sheetNames.json');

		sheetNamesJson.then((sheetNamesJson) => {
			const sheetNames=Object.keys(sheetNamesJson);
			for (let i in sheetNames){
				saveData('./src/database/methodology/'+sheetNames[i]+'.json', data[i])
			}
		})

		methodologyChecker();
	})
}