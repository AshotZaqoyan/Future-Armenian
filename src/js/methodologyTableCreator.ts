export function methodologyTableCreate(methodologyAndNumber) {
	let methodology = methodologyAndNumber[0]
	// Create the table element
	const table = document.createElement('table');
	table.setAttribute("class", "styled-table");
	// Create the table header
	const thead = document.createElement('thead');
	const headerRow = document.createElement('tr');

	for (const key in methodology) {
		const th = document.createElement('th');
		th.textContent = key;
		headerRow.appendChild(th);
		// Add a column header for the input fields
		const inputTh = document.createElement('th');
		inputTh.textContent = '№';
		headerRow.appendChild(inputTh);
	}

	thead.appendChild(headerRow);
	table.appendChild(thead);

	const tbody = document.createElement('tbody');

	const maxLength = Math.max(...Object.values(methodology).map(arr => Object.keys(arr).length));

	for (let i = 0; i < maxLength; i++) {

		const row = document.createElement('tr');

		for (const key in methodology) {
			const td = document.createElement('td');
			const value = Object.keys(methodology[key])[i] || ''; // Handle empty values
			const inputValue = String((Object.values(methodology[key])[i] || [0])[0])
			const greaterOrEqualValue = (Object.values(methodology[key])[i] || [0, 0, 0, true])[3]
			td.textContent = value;
			row.appendChild(td);

			if (value) { // Skip creating and appending empty td elements
				const inputTd = document.createElement('td');
				const div = document.createElement('div')
				const input = document.createElement('input');
				const greaterOrEqual = document.createElement('button');
				div.setAttribute("class", "input-div");
				input.type = 'number';
				input.dataset.key = key;
				input.dataset.index = value; // Set the data-index as the td name
				input.setAttribute("value", inputValue);
				input.setAttribute("min", "0");
				input.setAttribute("id", "tableinput");
				div.appendChild(input);

				greaterOrEqual.setAttribute("id", `${key}${value}`);
				greaterOrEqual.setAttribute("class", "greater-or-equal");
				if (greaterOrEqualValue) {
					greaterOrEqual.innerText = "="
					greaterOrEqual.setAttribute("data-text", "=")
				} else {
					greaterOrEqual.innerText = "≥"
					greaterOrEqual.setAttribute("data-text", "≥")
				}
				div.appendChild(greaterOrEqual);
				inputTd.appendChild(div);
				row.appendChild(inputTd);
			} else { // Handle empty value, leave the input field blank
				const inputTd = document.createElement('td');
				row.appendChild(inputTd);
			}
		}
		tbody.appendChild(row);
	}
	table.appendChild(tbody);
	return table
}