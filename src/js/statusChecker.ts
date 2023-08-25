import { readData, saveData } from "./editData";
import { createwindow } from "./window";
import { addtables } from "./methodologyTableAdd";
import { getMethodology } from "./getMethodology";
import { methodologyTableCreate } from "./methodologyTableCreator";
import { resultTableAdd } from "./resultTable";
import { pushError } from "./methodologyChecker";
import { start } from "../renderer";
import { newExcelUpload } from "./newExcel";

export async function showMethodology(path, sheetNamesJson) {
	(<HTMLDivElement>document.getElementById("bgtransparent")).classList.add("hide");
	let noResult = await readData(`${path}noResult.json`)
	const noResultSheets = Object.keys(noResult)
	if (noResultSheets.length !== 0) {
		let tables = []
		try {
			for (const noResultSheet of noResultSheets) {
				const methodology = await readData(`${path}methodology/${noResultSheet}.json`);
				const table = methodologyTableCreate(methodology)
				tables.push([table.outerHTML, methodology[1], noResultSheet])
			}
		} catch (error) {
			console.log("Error:", error.message);
		}
		const changeOrChoice = path === "./src/database/" ? true : false;
		createwindow("100vh", "80vh", `${changeOrChoice ? '<img src="src/img/back.svg" alt="back" class="btn-back cursor-pointer" id="back">' : ""}<div class="methodology-window-title">${changeOrChoice ? "Ընտրության" : "Փոփոխման"} մեթոդաբանություն</div><div class="methodology-text">Մենք չկարողացանք ընտրանք կատարել, խնդրում ենք վերանայել ընտրության մեթոդաբանությունը</div><div class="next-back"><img src="src/img/back.svg" alt="back" class="next-back-btn cursor-pointer" id="previousPage"><div id="table-container"></div><img src="src/img/back.svg" alt="back" class="next-back-btn right-arrow cursor-pointer" id="nextPage"></div><div id="error-div"></div><div class="dots-div" id="dots-div"></div>${changeOrChoice ? '<button class="save-only-method" id="save-only-method">Չկատարել ընտրանք</button>' : ""}<button class="method-button" id="method-button">Հաստատել</button>`);
		if (changeOrChoice) {
			document.getElementById('back').addEventListener('click', () => { start() })
			document.getElementById('save-only-method').addEventListener('click', ()=>{getMethodology('./src/database/sheetNames.json', "./src/database/", true)})
		}
		addtables(tables)
		outerloop: for (let i = 0; noResultSheets.length > i; i++) {
			let errorText = null
			const criteria = noResult[noResultSheets[i]];
			if (criteria === "methodology") {
				break outerloop
			}
			for (const criteriaObj in criteria) {
				const criteriaParent = (Object.keys(criteria[criteriaObj]))[0]
				const criteriaParentArr = criteria[criteriaObj][criteriaParent]
				const criteriaChilds = criteriaParentArr.join("-ի, ") + "-ի"
				errorText = (errorText === null ? " " : `${errorText}, `) + `${criteriaParent} շարքի ${criteriaChilds}`
			}
			pushError(`${errorText} թվերով չկարողացանք ընտրանք կատարել, խնդրում ենք փոխել այդ թվերը`, i + 1)
		}
		
		document.getElementById("method-button").addEventListener("click", () => {getMethodology(`${path}noResult.json`, path)})

		const elements = document.getElementsByClassName('greater-or-equal') as HTMLCollectionOf<HTMLButtonElement>;

		for (let i = 0; i < elements.length; i++) {
			elements[i].addEventListener('click', () => {
				const value = elements[i].getAttribute("data-text")
				if (value === '=') {
					elements[i].innerText = "≤"
					elements[i].setAttribute("data-text", "≤");
				} else {
					elements[i].innerText = "="
					elements[i].setAttribute("data-text", "=");
				}
			});
		}
	} else {

		let noResult = {}
		for (const sheetName in sheetNamesJson) {
			const result = await readData(`${path}result/${sheetNamesJson[sheetName]}.json`)
			if (result.length === 0) {
				noResult[sheetNamesJson[sheetName]] = "methodology"
			}
		}
		if (Object.keys(noResult).length !== 0) {
			saveData(`${path}noResult.json`, noResult)
			situationCheck(path)
		} else {
			console.log("Final situation");
			if (path === "./src/database/") {
				resultTableAdd()
				situationCheck("./src/database/replacing/")
			}
		}
	}


}
export async function situationCheck(path = "./src/database/") {
	try {
		const sheetNamesJson = Object.keys(await readData(`${path}sheetNames.json`));
		if (sheetNamesJson.length !== 0) {
			const excelUpload = await readData('./src/database/newExcelUpload.json')
			if (!excelUpload) {
				if (path === "./src/database/") {
					document.getElementById("start-div").classList.remove("hide");
					document.getElementById('btn-start').addEventListener('click', () => { start() });
				}
				showMethodology(path, sheetNamesJson)
			 } else {
				newExcelUpload()
				for (const sheetName of sheetNamesJson) {
					const sheetData = readData(`./src/database/methodology/${sheetName}.json`);
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

							}
							if (!(equalSum === numPeople || ((equalSum + greaterSum >= numPeople) && equalSum < numPeople))) {
								errors.push(key);
							}
						}
					} else {
						showMethodology(path, sheetNamesJson)
					}
				}
			}
		}else{
			if (path === "./src/database/") {
				document.getElementById("start-div").classList.remove("hide");
				document.getElementById('btn-start').addEventListener('click', () => { start() });
			}
		}
		
	} catch (error) {
		console.log("Initial situation");
		if (path === "./src/database/") {
			document.getElementById("start-div").classList.remove("hide");
			document.getElementById('btn-start').addEventListener('click', () => { start() });
		}
	}
}
