import {saveData} from './editData'
import { methodologyChecker } from './methodologyChecker';

export function getMethodology() {
	document.getElementById("methodButton").addEventListener('click', () => {
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

				// Set the value in the object using the dataKey and dataIndex
				obj[dataKey][dataIndex] = [value, 0];
			});

			let methodology=[]
			// Save resulting
			methodology.push(obj)
			methodology.push(inputValue)

			data.push(methodology)
		}
		saveData('./src/data/methodology.json', data)
		methodologyChecker();
	})
}