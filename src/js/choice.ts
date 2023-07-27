import _ from 'lodash';
import { readData, saveData } from "./editData";
import { resultTableAdd } from "./resultTable";
import { situationCheck } from './statusChecker';
import { waitingAnimation } from './waitingAnimation';

interface UserData {
	[key: string]: string
}

interface criteria {
	[key: string]: { [key: string]: [number, number, number, boolean] };
}

interface noResult {
	[country: string]: {
		[property: string]: string[];
	};
}

let distinctive = "";
let chosenPeople: UserData[] = [];
let data: UserData[] = [];
let criteria: criteria = {};
let tf = true;

function findArrayDifference(arr1: UserData[], arr2: UserData[], distinctive: string) {
	const arr1Set = new Set(arr1.map((obj) => obj[distinctive]));
	const arr2Set = new Set(arr2.map((obj) => obj[distinctive]));

	return [...arr1.filter((obj) => !arr2Set.has(obj[distinctive])), ...arr2.filter((obj) => !arr1Set.has(obj[distinctive]))];
}

function dataAnalysis() {
	// Reset the counts in the criteria object
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

function incrementCriteriaValue(person: UserData) {
	for (const key in criteria) {
		const value = person[key];
		const index = data.findIndex((p) => p === person);

		if (index >= 0 && criteria[key][value]) {
			criteria[key][value][1]++;
		}
	}
}

function getRandomPersonByCriteria(key: string, keyValue: string) {
	const filteredCandidates = data.filter((person) => person[key] === keyValue);
	if (filteredCandidates.length === 0) {
		return null;
	}
	const randomIndex = _.random(0, filteredCandidates.length - 1);
	chosenPeople.push(filteredCandidates[randomIndex]);
	incrementCriteriaValue(filteredCandidates[randomIndex]);

	const randomPersonCode = filteredCandidates[randomIndex][distinctive];
	const index = data.findIndex((person) => person[distinctive] === randomPersonCode);

	data.splice(index, 1);
}

function little() {
	let minValue = Infinity;
	let minKey = null;
	let parentKey = null;
	let breakOrNot = false;

	outerLoop: for (const key in criteria) {
		const value = criteria[key];
		if (typeof value === 'object') {
			for (const childKey in value) {
				const childValue = value[childKey];
				if (childValue[2] < minValue && childValue[0] !== childValue[1] && childValue[3]) {
					minValue = childValue[2];
					minKey = childKey;
					parentKey = key;
					if (childValue[2] <= 0) {
						breakOrNot = true;
					}
				}
			}
		}
	}
	if (breakOrNot) {
		tf = false;
		return { [parentKey]: minKey };
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
		const value = criteria[key];
		if (typeof value === 'object') {
			for (const childKey in value) {
				const childValue = value[childKey];
				if (childValue[0] === childValue[1]) {
					equalPairs.push({ [key]: childKey });
				}
			}
		}
	}
	if (equalPairs.length !== 0) {
		dataCleaning(equalPairs);
	}
}

function mergeErrors(arr: string[]) {
	console.log(arr)
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

export async function choice(path: string = "./src/database/") {
	try {
		waitingAnimation();
		const sheetNames: string = await readData(`${path}sheetNames.json`);
		const onlySheetNames = Object.keys(sheetNames)
		let noResult: noResult[] = [];
		for (const sheetName of onlySheetNames) {
			const result = await readData(`${path}result/${sheetName}.json`)
			if (result.length === 0) {
				const completeData = await readData(`${path}completeData/${sheetName}.json`);
				const methodologyData = await readData(`${path}methodology/${sheetName}.json`);
				const numPeople = methodologyData[1]
				let i = 0
				distinctive = sheetNames[sheetName][0]
				let criteriaErrors: any[] = [];

				while (i < 50) {
					chosenPeople = []
					data = [...completeData];
					criteria = _.cloneDeep(methodologyData[0]);
					tf = true;

					dataAnalysis();

					while (chosenPeople.length !== numPeople && tf === true) {
						dataAnalysis();
						equal();
						little();
					}
					if (chosenPeople.length === numPeople) {
						break;
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
					await saveData(`${path}result/${sheetName}.json`, chosenPeople)
					if (path !== "./src/database/") {
						const result = await readData(`./src/database/result/${sheetName}.json`)
						const replaceablePeople = await readData(`${path}dataForMethodology/${sheetName}.json`)
						const differences = [...findArrayDifference(replaceablePeople, result, distinctive), ...chosenPeople];
						await saveData(`./src/database/result/${sheetName}.json`, differences)
					}
				}
			}
		}
		if (Object.keys(noResult).length === 0) {
			if (path === "./src/database/") {
				resultTableAdd()
				saveData("./src/database/noResult.json", [])
			} else {
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