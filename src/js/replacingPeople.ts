import { choice } from "./choice";
import { readData, saveData } from "./editData";

interface TableData {
	[sheetName: string]: string[];
}

interface UserData {
	[key: string]: string
}

function setAllValues(data) {
	for (const key in data) {
		const value = data[key];
		if (Array.isArray(value)) {
			data[key] = [0, 0, 0, true];
		} else if (typeof value === 'object') {
			setAllValues(value);
		}
	}
}
async function createMethodologyForReplacing() {
	try {
		const sheetNames = await readData('./src/database/replacing/sheetNames.json')
		for (const sheetName in sheetNames) {
			const datajson = await readData(`./src/database/replacing/dataForMethodology/${sheetName}.json`)
			const refused = await readData(`./src/database/refused/${sheetName}.json`)
			const distinctive = (datajson.map(item => item.Code)).concat(refused);
			const completeData = await readData(`./src/database/completeData/${sheetName}.json`)
			const data = completeData.filter(item => !distinctive.includes(item[sheetNames[sheetName][0]]));
			saveData(`./src/database/replacing/completeData/${sheetName}.json`, data)
			saveData('./src/database/replacing/result/' + sheetName + '.json', [])
			let result = {};
			let convertedResult = (await readData(`./src/database/methodology/${sheetName}.json`))[0];
			setAllValues(convertedResult)
			for (const obj of datajson) {
				for (const key in obj) {
					if (convertedResult[key] && convertedResult[key][obj[key]]) {
						convertedResult[key][obj[key]][0]++;
					}
				}
			}

			result = [convertedResult, datajson.length];

			saveData('./src/database/replacing/methodology/' + sheetName + '.json', result)
		}
		choice("./src/database/replacing/")
	} catch (err) {
		console.error('Error processing data:', err);
		createMethodologyForReplacing()
	}
}

async function createMethodology(tablesData) {
	try {
		const sheetNames = await readData('./src/database/sheetNames.json');
		const replacingSheetNames = Object.keys(tablesData);
		const replacingSheetNamesJson = {}
		for (const replacingSheetName in replacingSheetNames) {
			const replacingPeopleDistinctive = tablesData[replacingSheetNames[replacingSheetName]]

			if (replacingPeopleDistinctive.length !== 0) {
				let refused = await readData(`./src/database/refused/${replacingSheetNames[replacingSheetName]}.json`)
				refused = (replacingPeopleDistinctive.concat(refused)).filter((value, index, self) => self.indexOf(value) === index);
				saveData('./src/database/refused/' + replacingSheetNames[replacingSheetName] + '.json', refused)
				const distinctive: string = sheetNames[replacingSheetNames[replacingSheetName]][0]
				replacingSheetNamesJson[replacingSheetNames[replacingSheetName]] = [distinctive]
				const resultData = await readData(`./src/database/result/${replacingSheetNames[replacingSheetName]}.json`);
				const data:UserData[] = []
				for (const distinctiveValueIndex in replacingPeopleDistinctive) {
					const distinctiveValue = replacingPeopleDistinctive[distinctiveValueIndex]
					for (const person of resultData) {
						if (person[distinctive] === distinctiveValue) {
							data.push(person);
						}
					}
				}
				saveData(`./src/database/replacing/dataForMethodology/${replacingSheetNames[replacingSheetName]}.json`, data)
			}

		}
		saveData(`./src/database/replacing/sheetNames.json`, replacingSheetNamesJson)
		createMethodologyForReplacing()
	} catch (err) {
		console.error('Error processing data:', err);
		createMethodology(tablesData)
	}
}
export function replacingPeople() {
	const checkboxes = document.querySelectorAll(".styled-table-result input[type='checkbox']");
	checkboxes.forEach((checkbox) => {
		const checkboxElement = checkbox as HTMLInputElement;
		checkboxElement.style.display = checkboxElement.style.display === "none" ? "initial" : "none";
		checkboxElement.checked = false
	});

	const confirm = document.getElementById("replaceing-people-confirm")
	const className = confirm.classList[0]
	if (className === "hide") {
		confirm.classList.remove(className)
		confirm.addEventListener("click", () => {
			const tables = document.querySelectorAll(".styled-table-result");
			const tablesData: TableData = {};

			tables.forEach((table) => {
				const sheetName = table.getAttribute("sheetName");
				if (!sheetName) return; // Skip tables without sheetName attribute

				const checkboxes = Array.from(table.querySelectorAll('input[type="checkbox"][distinctive]')) as HTMLInputElement[];
				const clickedCheckboxes = checkboxes.filter((checkbox) => checkbox.checked);

				tablesData[sheetName] = clickedCheckboxes.map((checkbox) => checkbox.getAttribute("distinctive") || "");
			});
			createMethodology(tablesData)

		});
	} else {
		confirm.classList.add("hide")
	}

}