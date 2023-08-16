import { readData } from "./editData"

export async function mentionReplacedPeople() {
	const sheetNamesAndDistinctive = await readData("./src/database/sheetNames.json");
	const sheetNames = Object.keys(sheetNamesAndDistinctive);
	for (const sheetName of sheetNames) {
		try {
			const replacedPeopleAllData = await readData(`./src/database/replacing/result/${sheetName}.json`);
			const distinctive = sheetNamesAndDistinctive[sheetName][0]
			const replacedPeople = []
			replacedPeopleAllData.forEach((person) => replacedPeople.push(person[distinctive]))
			if (replacedPeople.length) {
				for (const person of replacedPeople) {
					const mentionContainer = document.getElementsByClassName(`${sheetName}-${person}`)[0]
					mentionContainer.innerHTML="<div class='mention-replaced-people'></div>"
				}
			}
		}
		catch (err) {
			console.log('Error Mention Replaced People', err);
		}
	}
}