import { readData, saveData } from "./editData";
import { createwindow } from "./window";
import { addtables } from "./methodologyTableAdd";
import { getMethodology } from "./getMethodology";
import { methodologyTableCreate } from "./methodologyTableCreator";

export async function situationCheck() {
	try {
		const sheetNamesJson = await readData("./src/database/sheetNames.json");

		(<HTMLDivElement>document.getElementById("bgtransparent")).classList.add("hide");
		document.getElementById("startdiv").classList.add("hide");
		document.getElementById("result").classList.replace("hide", "result");

		let noResult = {};
		const sheetNames = Object.keys(sheetNamesJson);

		for (const sheetName of sheetNames) {
			const result = await readData("./src/database/result/" + sheetName + ".json");
			if (result.length === 0) {
				noResult[sheetName] = sheetNamesJson[sheetName];
			}
		}
		saveData("./src/database/noResult.json", noResult)
		const noResultSheets = Object.keys(noResult)
		if (noResultSheets.length !== 0) {
			console.log("No choice situation")
			let tables = []
			try {
				for (const noResultSheet of noResultSheets) {
					const methodology = await readData("./src/database/methodology/" + noResultSheet + ".json");
					const table = methodologyTableCreate(methodology)
					tables.push([table.outerHTML, methodology[1]])
				}
			} catch (error) {
				console.log("Error:", error.message);
				// Handle the error appropriately
			}

			createwindow("80vw", "80vh", `<div class="show-number-h">Ընտրության մեթոդաբանություն</div><div class="show-number-p">Մենք չկարողացանք ընտրանք կատարել, խնդում ենք վերանայել ընտրության մեթոդաբանությունը</div><div class="next-back"><img src="src/img/back.svg" alt="back" class="next-back-btn" id="previousPage"><div id="table-container"></div><img src="src/img/back.svg" alt="back" class="next-back-btn" id="nextPage" style="transform: rotate(180deg);"></div><div id="error-div"></div><div class="dots-div" id="dots-div"></div><button class="method-button" id="method-button">Հաստատել</button>`);
			addtables(tables)

			getMethodology("./src/database/noResult.json")

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
			console.log("Final situation");
		}

	} catch (error) {
		console.log("Initial situation");
	}
}
