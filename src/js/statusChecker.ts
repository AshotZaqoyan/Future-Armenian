import { readData, saveData } from "./editData";
import { createwindow } from "./window";
import { addtables } from "./methodologyTableAdd";
import { getMethodology } from "./getMethodology";
import { methodologyTableCreate } from "./methodologyTableCreator";
import { resultTableAdd } from "./resultTable";
import { pushError } from "./methodologyChecker";


export async function situationCheck(path = "./src/database/") {
	try {
		(<HTMLDivElement>document.getElementById("bgtransparent")).classList.add("hide");
		/*document.getElementById("startdiv").classList.add("hide");
		document.getElementById("result").classList.replace("hide", "result");*/
		let noResult = await readData(`${path}noResult.json`)
		const noResultSheets = Object.keys(noResult)
		if (noResultSheets.length !== 0) {
			let tables = []
			try {
				for (const noResultSheet of noResultSheets) {
					const methodology = await readData(`${path}methodology/${noResultSheet}.json`);
					const table = methodologyTableCreate(methodology)
					tables.push([table.outerHTML, methodology[1]])
				}
			} catch (error) {
				console.log("Error:", error.message);
				// Handle the error appropriately
			}

			createwindow("100vh", "80vh", `<div class="show-number-h">${path === "./src/database/" ? "Ընտրության" : "Փոփոխման"} մեթոդաբանություն</div><div class="show-number-p">Մենք չկարողացանք ընտրանք կատարել, խնդում ենք վերանայել ընտրության մեթոդաբանությունը</div><div class="next-back"><img src="src/img/back.svg" alt="back" class="next-back-btn" id="previousPage"><div id="table-container"></div><img src="src/img/back.svg" alt="back" class="next-back-btn" id="nextPage" style="transform: rotate(180deg);"></div><div id="error-div"></div><div class="dots-div" id="dots-div"></div><button class="method-button" id="method-button">Հաստատել</button>`);
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

			getMethodology(`${path}noResult.json`, path)

			const elements = document.getElementsByClassName('greater-or-equal') as HTMLCollectionOf<HTMLButtonElement>;

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
		} else {
			const sheetNamesJson = Object.keys(await readData(`${path}sheetNames.json`));
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
			}else{
				console.log("Final situation");
				if (path === "./src/database/") {
					resultTableAdd()
					situationCheck("./src/database/replacing/")
				}
			}

		}

	} catch (error) {
		console.log("Initial situation");
	}
}
