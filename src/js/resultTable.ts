import { readData, deleteFolderRecursive } from "./editData";
import { replacingPeople } from "./replacingPeople";
import { createExcelFile } from "./createExcelFile";
import { createwindow } from "./window";

function jsonToTable(result, distinctive, sheetName) {
	let table = document.createElement("table");
	table.setAttribute("sheetName", sheetName);
	table.classList.add("styled-table-result");

	let thead = document.createElement("thead");
	let tbody = document.createElement("tbody");

	let headers = Object.keys(result[0]);
	let headerRow = document.createElement("tr");

	["", ...headers, ""].forEach(function (header) {
		let th = document.createElement("th");
		th.textContent = header;
		headerRow.appendChild(th);
	});

	thead.appendChild(headerRow);
	table.appendChild(thead);

	result.forEach(function (rowData) {
		let row = document.createElement("tr");

		// Add a hidden checkbox to each row
		let checkboxCell = document.createElement("td");
		let checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.setAttribute("distinctive", rowData[distinctive]);

		checkbox.style.display = "none"; // Hide the checkbox initially

		checkboxCell.appendChild(checkbox);
		row.appendChild(checkboxCell);

		headers.forEach(function (header) {
			let cell = document.createElement("td");
			cell.textContent = rowData[header];
			row.appendChild(cell);
		});

		row.appendChild(document.createElement("td"));
		tbody.appendChild(row);

		// Add click event listener to each row
		row.addEventListener("click", function () {
			// Toggle the checkbox state
			checkbox.checked = !checkbox.checked;

			// Change the background color of the row when clicked
			row.style.backgroundColor = checkbox.checked ? "#ff5f5f1a" : "";
		});

		// Add click event listener to each checkbox
		checkbox.addEventListener("click", function (event) {
			// Prevent the row click event from firing when clicking the checkbox
			event.stopPropagation();
			row.style.backgroundColor = checkbox.checked ? "#ff5f5f1a" : "";
		});
	});

	table.appendChild(tbody);

	// Create the search input element
	let searchInput = document.createElement("input");
	searchInput.type = "text";
	searchInput.placeholder = "Որոնել...";
	searchInput.classList.add("search-input");

	// Add event listener for the keyup event on the search input
	searchInput.addEventListener("keyup", function () {
		var val = this.value.trim().replace(/ +/g, " ").toLowerCase();

		// Loop through each table row and apply the filtering logic
		tbody.querySelectorAll("tr").forEach(function (row) {
			var text = row.textContent.replace(/\s+/g, " ").toLowerCase();
			if (!~text.indexOf(val)) {
				row.style.display = "none";
			} else {
				row.style.display = "";
			}
		});
	});

	// Create a div to hold the search input
	let searchDiv = document.createElement("div");
	searchDiv.style.display = "flex"
	let searchIcon = document.createElement("img")
	searchIcon.src = "src/img/search.svg"
	searchIcon.classList.add("search-icon")
	searchDiv.appendChild(searchInput);
	searchDiv.appendChild(searchIcon)

	// Create a div to wrap the table and search input
	let tableWrapper = document.createElement("div");
	tableWrapper.classList.add("table-wrapper");
	tableWrapper.appendChild(searchDiv);
	tableWrapper.appendChild(table);

	return tableWrapper;
}


export async function resultTableAdd() {
	try {
		const sheetNames = await readData('./src/database/sheetNames.json');
		const onlySheetNames = Object.keys(sheetNames);
		const resultDiv = document.getElementById("result-tables");

		for (const sheetName of onlySheetNames) {
			const result = await readData(`./src/database/result/${sheetName}.json`);
			const title = document.createElement("h2");
			title.innerText = sheetName;
			title.classList.add("table-title");

			// Create a div to hold the table and search input
			const tableContainer = document.createElement("div");
			tableContainer.appendChild(title);
			tableContainer.appendChild(jsonToTable(result, sheetNames[sheetName][0], sheetName));

			resultDiv.appendChild(tableContainer);
		}

		document.getElementById("startdiv").classList.add("hide");
		document.getElementById("result").classList.replace("hide", "result");

		const showHideButton = document.getElementById("replaceing-people");
		document.getElementById("export").addEventListener("click", createExcelFile);
		document.getElementById("reset").addEventListener("click", () => {
			createwindow("436px", "200px", "<div class='reset-div'><h2 style='margin-bottom: 10px;color: #27958f;'>Վերագործարկում</h2><p>Սեղմելով հաստատել կջնջվի ամբողջ տվյալները և այլևս չեք կարողանա վերականգնել դրանք</p><button id='reset-confirm'>Հաստատել<buttton></div>")
			document.getElementById("reset-confirm").addEventListener("click", () => {
				deleteFolderRecursive("./src/database");
				window.location.reload()
			})
		})
		showHideButton.addEventListener("click", function () {
			const icon = document.getElementById("replaceing-people-img") as HTMLImageElement;
			if (icon.src.includes("src/img/replacingPeople.svg")) {
				icon.src = "src/img/close.svg";
			} else {
				icon.src = "src/img/replacingPeople.svg";
				const rows = resultDiv.getElementsByTagName('tr');
				// Loop through all rows and reset the background color
				for (let i = 0; i < rows.length; i++) {
					rows[i].style.backgroundColor = '';
				}
			}
			replacingPeople();
		});
	} catch (err) {
		console.error('Error processing data:', err);
	}
}