import { readData } from "./editData";
import { showPage } from "./methodologyTableCreator";
import { selection } from "./selection";

function pushError(error: string, pageNumber: number) {
	document.getElementById('errorText' + pageNumber).innerHTML = error
}

export function methodologyChecker() {
	const sheetNamesJson = readData('./src/database/sheetNames.json');

	sheetNamesJson.then((sheetNamesJson) => {
		const sheetNames = Object.keys(sheetNamesJson);
		let pagesWithErrors = [];
		let currentIndex = 0;

		function processNextSheet() {
			if (currentIndex >= sheetNames.length) {
				// All sheets processed
				if (pagesWithErrors.length !== 0) {
					showPage(Math.min.apply(Math, pagesWithErrors));
				} else {
					(<HTMLDivElement>document.getElementById("bgtransparent")).classList.add("hide");
					document.getElementById("startdiv").classList.add("hide");
					document.getElementById("result").classList.remove("hide");
					document.getElementById("result").classList.add("result");
					selection();
				}
				return;
			}

			const sheetPath = readData('./src/database/methodology/' + sheetNames[currentIndex] + '.json');

			sheetPath.then((sheetData) => {
				let errors = [];
				let tf = true;
				const criteria = sheetData[0];
				const numPeople = sheetData[1];

				if (numPeople !== 0) {
					for (const key in criteria) {
						if (criteria.hasOwnProperty(key)) {
							const values = criteria[key];
							let equalSum = 0;
							let greaterSum = 0;

							for (const subKey in values) {
								if (values.hasOwnProperty(subKey)) {
									const subValues = values[subKey];

									if (subValues[0]) {
										equalSum += subValues[0];
									} else {
										greaterSum += subValues[0];
									}
								}
							}

							if (equalSum < numPeople && !(equalSum + greaterSum >= numPeople)) {
								errors.push(key);
							}
						}
					}
				} else {
					pushError("Խնդրում ենք մուտքագրել մարդկանց թվաքանակը (0-ից մեծ)", currentIndex + 1);
					pagesWithErrors.push(currentIndex + 1);
					tf = false;
				}

				if (tf) {
					if (errors.length !== 0) {
						pagesWithErrors.push(currentIndex + 1);
						pushError(`Խնդրում ենք Ներմուծել ${errors.join(', ')} շարքի/շարքերի<br>թվերը այնպես որ նրանց գումարը հավասարլ ինին ${numPeople}-ի`, currentIndex + 1);
					} else {
						pushError(``, currentIndex + 1);
					}
				}

				console.clear()
				currentIndex++;
				processNextSheet(); // Process the next sheet
			}).catch((error) => {
				console.error('Error reading data:', error);
				console.log("Retrying...");
				processNextSheet(); // Retry processing the next sheet
			});
		}

		processNextSheet(); // Start processing the first sheet
	});
}
