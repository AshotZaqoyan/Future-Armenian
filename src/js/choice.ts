import _ from 'lodash'
import { readData, saveData, deleteFolderRecursive } from "./editData";
import { resultTableAdd } from "./resultTable";
import { situationCheck } from './statusChecker';
import { waitingAnimation } from './waitingAnimation';

let distinctive = ""
let chosenPeople = []
let data = []
let criteria = {}
let tf = true

function findArrayDifference(arr1, arr2, distinctive) {
	const differences = [];

	// Find objects unique to arr1
	for (const obj1 of arr1) {
		if (!arr2.some(obj2 => obj2[distinctive] === obj1[distinctive])) {
			differences.push(obj1);
		}
	}

	// Find objects unique to arr2
	for (const obj2 of arr2) {
		if (!arr1.some(obj1 => obj1[distinctive] === obj2[distinctive])) {
			differences.push(obj2);
		}
	}

	return differences;
}
// Initialize the counts in the criteria object
function dataAnalysis() {
	for (const key in criteria) {
		for (const option in criteria[key]) {
			criteria[key][option][2] = 0;
		}
	}

	// Count the objects based on the criteria
	for (const obj of data) {
		for (const key in obj) {
			if (criteria[key] && criteria[key][obj[key]]) {
				criteria[key][obj[key]][2]++;
			}
		}
	}
}

function incrementCriteriaValue(person) {
	for (const key in criteria) {
		if (criteria.hasOwnProperty(key) && person.hasOwnProperty(key)) {
			const value = person[key];
			const index = data.findIndex((p) => p === person);

			if (index >= 0 && criteria[key][value]) {
				criteria[key][value][1]++;
			}
		}
	}
};

function getRandomPersonByCriteria(key, keyValue) {
	const filteredCandidates = data.filter((person) => person[key] === keyValue);
	if (filteredCandidates.length === 0) {
		return null;
	}
	const randomIndex = _.random(0, filteredCandidates.length - 1);
	chosenPeople.push(filteredCandidates[randomIndex]);
	incrementCriteriaValue(filteredCandidates[randomIndex]);

	const randomPersonCode = filteredCandidates[randomIndex][distinctive]
	const index = data.findIndex((person) => person[distinctive] === randomPersonCode);

	const selectedPerson = data.splice(index, 1)[0];

};

function little() {
	let minValue = Infinity;
	let minKey = null;
	let parentKey = null;
	let breakOrNot = false
	outerLoop: for (const key in criteria) {
		if (criteria.hasOwnProperty(key)) {
			const value = criteria[key];
			if (typeof value === 'object') {
				for (const childKey in value) {
					if (value.hasOwnProperty(childKey)) {
						const childValue = value[childKey];
						if (childValue[2] < minValue && childValue[0] !== childValue[1] && childValue[3]) {
							minValue = childValue[2];
							minKey = childKey;
							parentKey = key;
							if (childValue[2] <= 0) {
								breakOrNot = true
							}
						}
					}
				}
			}
		}
	}
	if (breakOrNot) {
		tf = false
		return { [parentKey]: minKey }
	} else {
		getRandomPersonByCriteria(parentKey, minKey);
	}
}

function dataCleaning(keysToDelete) {
	data = data.filter(obj => {
		for (const keyObj of keysToDelete) {
			const [key] = Object.keys(keyObj);
			if (obj[key] === keyObj[key]) {
				return false; // Exclude object from filtered array
			}
		}
		return true; // Include object in filtered array
	});
}

function equal() {
	const equalPairs = [];

	for (const key in criteria) {
		if (criteria.hasOwnProperty(key)) {
			const value = criteria[key];
			if (typeof value === 'object') {
				for (const childKey in value) {
					if (value.hasOwnProperty(childKey)) {
						const childValue = value[childKey];
						if (childValue[0] === childValue[1]) {
							equalPairs.push({ [key]: childKey });
						}
					}
				}
			}
		}
	}
	if (equalPairs.length !== 0) {
		dataCleaning(equalPairs)
	}
}

function mergeErrors(arr) {
	const result = {};

	arr.forEach((obj) => {
		const key = Object.keys(obj)[0];
		const value = Object.values(obj)[0];

		if (result.hasOwnProperty(key)) {
			if (Array.isArray(result[key])) {
				if (!result[key].includes(value)) {
					result[key].push(value);
				}
			} else {
				if (result[key] !== value) {
					result[key] = [result[key], value];
				}
			}
		} else {
			result[key] = value;
		}
	});

	return Object.entries(result).map(([key, value]) => ({ [key]: Array.isArray(value) ? value : [value] }));
}

export async function choice(path = "./src/database/") {
	try {
		waitingAnimation()
		const sheetNames = await readData(`${path}sheetNames.json`);
		const onlySheetNames = Object.keys(sheetNames)
		let noResult = {}
		for (const sheetName of onlySheetNames) {
			const result: string[] = await readData(`${path}result/${sheetName}.json`)
			if (result.length === 0) {
				const completeData = await readData(`${path}completeData/${sheetName}.json`);
				const methodologyData = await readData(`${path}methodology/${sheetName}.json`);
				const numPeople = methodologyData[1]
				let i = 0
				distinctive = sheetNames[sheetName][0]
				let criteriaErrors = []

				while (i < 50) {
					chosenPeople = []
					// With .slice() or [... ] it doesn't work, that's why I used JSON.stringify() and JSON.parse()
					data = [...completeData];
					criteria = _.cloneDeep(methodologyData[0]);
					tf = true

					dataAnalysis();

					while (chosenPeople.length !== numPeople && tf === true) {
						dataAnalysis();
						equal();
						little();
					}
					if (chosenPeople.length === numPeople) {
						break
					}
					criteriaErrors.push(little())
					chosenPeople = []
					data = []
					criteria = {}
					i++
				}

				if (chosenPeople.length === 0) {
					noResult[sheetName] = mergeErrors(criteriaErrors)
				} else {
					saveData(`${path}result/${sheetName}.json`, chosenPeople)
					if (path !== "./src/database/") {
						const result = await readData(`./src/database/result/${sheetName}.json`)
						const replaceablePeople = await readData(`${path}dataForMethodology/${sheetName}.json`)
						const differences = [...findArrayDifference(replaceablePeople, result, distinctive), ...chosenPeople];
						saveData(`./src/database/result/${sheetName}.json`, differences)
					}
				}
			}
		}
		if (Object.keys(noResult).length === 0) {
			if (path === "./src/database/") {
				resultTableAdd()
				saveData("./src/database/noResult.json", [])
			} else {
				deleteFolderRecursive("./src/database/replacing")
				saveData('./src/database/replacing/sheetNames.json', [])
				resultTableAdd()
				window.location.reload();
			}
		} else {
			saveData(`${path}noResult.json`, noResult)
			situationCheck(path)
		}
	} catch (err) {
		console.error('Error processing data:', err);
		choice(path)
	}
	console.log("ok");
	waitingAnimation()
}