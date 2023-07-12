import { readData } from "./editData";
import { showPage } from "./methodologyTableCreator";
import { selection } from "./selection";

function pushError(error:string, pageNumber:number) {
	document.getElementById('errorText'+pageNumber).innerHTML = error
}

export function methodologyChecker() {
	const sheetPath = readData('./src/data/methodology.json');
	sheetPath.then((sheetData) => {
		let pagesWithErrors=[]
		for (let i = 0; sheetData.length > i; i++) {
			let errors = []
			let tf = true;
			const criteria = sheetData[i][0]
			const numPeople = sheetData[i][1]
			if (numPeople !== 0) {
				for (const key in criteria) {
					if (criteria.hasOwnProperty(key)) {
						const values = criteria[key];
						let sum = 0;
						for (const subKey in values) {
							if (values.hasOwnProperty(subKey)) {
								const subValues = values[subKey];
								sum += subValues[0];
							}
						}
						if (sum !== numPeople) {
							errors.push(key);
						}
					}
				}
			} else {
				pushError("Խնդրում ենք մուտքագրել մարդկանց թվաքանակը (0-ից մեծ)", i + 1)
				pagesWithErrors.push(i+1)
				tf=false
			}
			if (tf) {
				if (errors.length !== 0) {
					pagesWithErrors.push(i+1)
					pushError(`Խնդրում ենք Ներմուծել ${errors.join(', ')} շարքի/շարքերի<br>թվերը այնպես որ նրանց գումարը հավասարլ ինին ${numPeople}-ի`, i + 1)
				} else { pushError(``, i + 1) }
			}
		}
		if(pagesWithErrors.length!==0){
			showPage(Math.min.apply(Math, pagesWithErrors) )
		}else{
			(<HTMLDivElement>document.getElementById("bgtransparent")).classList.add("hide")
			document.getElementById("startdiv").classList.add("hide")
			document.getElementById("result").classList.remove("hide")
			document.getElementById("result").classList.add("result")
			selection()
		}

	}).catch((error) => {
		console.error('Error reading data:', error);
	});
}