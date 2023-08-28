import { saveData, readData } from './editData'
import { methodologyChecker } from './methodologyChecker';

interface MethodologyData {
	[key: string]: {
		[key: string]: [number, number, number, boolean];
	};
}

type Methodology = Array<[MethodologyData, number]>;

export function getMethodology(sheetNamesPath = './src/database/sheetNames.json', path = "./src/database/", onlyMethodology = false) {
	let tables = document.getElementsByClassName("styled-table");
	let data: Methodology = [];

	for (let i = 0; i < tables.length; i++) {
		let table = tables[i];
		const inputTag = <HTMLInputElement>document.getElementById(`${i + 1}`);
		const inputValue = Number(inputTag.value);
		let inputs = Array.from(table.getElementsByTagName("input"));
		const obj: MethodologyData = {};

		// Iterate over each input element
		inputs.forEach((input) => {
			// Get the data attributes from the input element
			const dataKey = input.getAttribute("data-key");
			const dataIndex = input.getAttribute("data-index");
			const value = Number(input.value);

			// Check if the dataKey already exists in the object
			if (!obj[dataKey]) {
				obj[dataKey] = {};
			}
			const greaterOrEqualElement = document
				.getElementById(`${dataKey}${dataIndex}`)
				.getAttribute("data-text");
			let greaterOrEqual = greaterOrEqualElement === "=";
			// Set the value in the object using the dataKey and dataIndex
			obj[dataKey][dataIndex] = [value, 0, 0, greaterOrEqual];
		});

		let methodology: [MethodologyData, number] = [obj, inputValue];
		data.push(methodology);
	}

	const sheetNamesJson = readData(sheetNamesPath);

	sheetNamesJson.then((sheetNamesJson) => {
		const sheetNames = Object.keys(sheetNamesJson);
		for (let i in sheetNames) {
			saveData(`${path}methodology/` + sheetNames[i] + '.json', data[i]);
		}
	});

	methodologyChecker(sheetNamesPath, path, onlyMethodology);

}