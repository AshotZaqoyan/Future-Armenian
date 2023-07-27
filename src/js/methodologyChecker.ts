import { readData } from "./editData";
import { showPage } from "./methodologyTableAdd";
import { choice } from "./choice";

export function pushError(error: string, pageNumber: number) {
	document.getElementById('errorText' + pageNumber).innerHTML = error
}

export function methodologyChecker(sheetNamesPath = './src/database/sheetNames.json', path = "./src/database/") {
	const sheetNamesJson = readData(sheetNamesPath);
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
					choice(path);
				}
				return;
			}

			const sheetPath = readData(`${path}methodology/` + sheetNames[currentIndex] + '.json');

			sheetPath.then((sheetData) => {
				let errors: string[] = [];
				let numberEnteredOrNot = true;
				const criteria = sheetData[0];
				const numPeople = sheetData[1];

				if (numPeople !== 0) {
					for (const key in criteria) {
						const values = criteria[key];
						let equalSum = 0;
						let greaterSum = 0;

						for (const subKey in values) {
							const subValues = values[subKey];

							if (subValues[0]) {
								if (subValues[3]) {
									equalSum += subValues[0];
								} else {
									greaterSum += subValues[0];
								}
							}
							if (!(equalSum === numPeople || ((equalSum + greaterSum >= numPeople) && equalSum <= numPeople))) {
								errors.push(key);
							}
						}
					}
				} else {
					pushError("Խնդրում ենք մուտքագրել մարդկանց թվաքանակը (0-ից մեծ)", currentIndex + 1);
					pagesWithErrors.push(currentIndex + 1);
					numberEnteredOrNot = false;
				}

				if (numberEnteredOrNot) {
					if (errors.length !== 0) {
						pagesWithErrors.push(currentIndex + 1);
						pushError(`Խնդրում ենք Ներմուծել ${errors.join(', ')} շարքի/շարքերի թվերը այնպես որ նրանց գումարը հավասար լինին ${numPeople}-ի`, currentIndex + 1);
					} else {
						pushError(``, currentIndex + 1);
					}
				}


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
