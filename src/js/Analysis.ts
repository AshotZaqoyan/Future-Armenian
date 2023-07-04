export function analysiss() {

	let currentPage: number = 1;
	let totalPages: number = 1;

	function createPages(num: string[]): void {
		const pagesDiv: HTMLElement | null = document.getElementById("table-container");
		const dotsDiv: HTMLElement | null = document.getElementById("dots-div");
		if (pagesDiv) {
			for (let i: number = 1; i <= num.length; i++) {
				// Pages
				const pageDiv: HTMLElement = document.createElement("div");
				pageDiv.setAttribute("class", "page");
				pageDiv.setAttribute("id", "page" + i);
				pageDiv.innerHTML = num[i - 1]
				pagesDiv.appendChild(pageDiv);
				if (num.length !== 1) {
					// Dots
					const dot: HTMLElement = document.createElement("div");
					dot.setAttribute("class", "dot");
					dot.setAttribute("id", "dot" + i);
					dotsDiv.appendChild(dot);

				}
			}
			totalPages = num.length;
			functiondot()
		}
		if (num.length === 1) {
			document.getElementById("previousPage").classList.add("hide")
			document.getElementById("nextPage").classList.add("hide")
		}
	}

	function showPage(pageNumber: number): void {
		const pages: HTMLCollectionOf<Element> = document.getElementsByClassName("page");
		const dots: HTMLCollectionOf<Element> = document.getElementsByClassName("dot");
		for (let i: number = 0; i < pages.length; i++) {
			(pages[i] as HTMLElement).style.display = "none";
			if (pages.length != 1) {
				(dots[i] as HTMLElement).classList.remove("dot-a")
			}
		}
		const page: HTMLElement | null = document.getElementById("page" + pageNumber);
		const dot: HTMLElement | null = document.getElementById("dot" + pageNumber);
		if (page) {
			page.style.display = "table-caption";
			if (pages.length != 1) {
				dot.classList.add("dot-a")
			}
		}
	}

	function previousPage(): void {
		if (currentPage > 1) {
			currentPage--;
			showPage(currentPage);
		}else{
			const pages: HTMLCollectionOf<Element> = document.getElementsByClassName("page");
			showPage(pages.length);
		}
	}

	function nextPage(): void {
		if (currentPage < totalPages) {
			currentPage++;
			showPage(currentPage);
		} else{
			showPage(1);
		}
	}


	function functiondot() {
		// Get all elements with the same class
		const elements = document.getElementsByClassName('dot');

		// Convert the HTMLCollection to an array for easier manipulation
		const elementsArray = Array.from(elements);
		// Add event listener to each element
		elementsArray.forEach((element, index) => {
			element.addEventListener('click', (event) => {
				showPage(index + 1);
				currentPage = index + 1;
			});
		});
	}

	createPages([`<table class="styled-table"><thead><tr><th>Country</th><th>№</th><th>Gender</th><th>№</th><th>Education</th><th>№</th><th>Area</th><th>№</th><th>AGEGroup</th><th>№</th><th>RegionFinal</th><th>№</th></tr></thead><tbody><tr><td>Armenia</td><td><input type="number" data-key="Country" data-index="0" min="0" id="tableinput" max="1"></td><td>Female</td><td><input type="number" data-key="Gender" data-index="0" min="0" id="tableinput" max="1"></td><td>University or postgraduate</td><td><input type="number" data-key="Education" data-index="0" min="0" id="tableinput" max="1"></td><td>Urban</td><td><input type="number" data-key="Area" data-index="0" min="0" id="tableinput" max="1"></td><td>18-30</td><td><input type="number" data-key="AGEGroup" data-index="0" min="0" id="tableinput" max="1"></td><td>Tavush</td><td><input type="number" data-key="RegionFinal" data-index="0" min="0" id="tableinput" max="1"></td></tr><tr><td></td><td></td><td>Male</td><td><input type="number" data-key="Gender" data-index="1" min="0" id="tableinput" max="1"></td><td>Secondary or unfinished secondary</td><td><input type="number" data-key="Education" data-index="1" min="0" id="tableinput" max="1"></td><td>Rural</td><td><input type="number" data-key="Area" data-index="1" min="0" id="tableinput" max="1"></td><td>31-45</td><td><input type="number" data-key="AGEGroup" data-index="1" min="0" id="tableinput" max="1"></td><td>Kotayk</td><td><input type="number" data-key="RegionFinal" data-index="1" min="0" id="tableinput" max="1"></td></tr><tr><td></td><td></td><td></td><td></td><td>Professional or vocational</td><td><input type="number" data-key="Education" data-index="2" min="0" id="tableinput" max="1"></td><td>Yerevan</td><td><input type="number" data-key="Area" data-index="2" min="0" id="tableinput" max="1"></td><td>46-60</td><td><input type="number" data-key="AGEGroup" data-index="2" min="0" id="tableinput" max="1"></td><td>Gegharkunik</td><td><input type="number" data-key="RegionFinal" data-index="2" min="0" id="tableinput" max="1"></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>61+</td><td><input type="number" data-key="AGEGroup" data-index="3" min="0" id="tableinput" max="1"></td><td>Ararat</td><td><input type="number" data-key="RegionFinal" data-index="3" min="0" id="tableinput" max="1"></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>Armavir</td><td><input type="number" data-key="RegionFinal" data-index="4" min="0" id="tableinput" max="1"></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>Syunik</td><td><input type="number" data-key="RegionFinal" data-index="5" min="0" id="tableinput" max="1"></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>Aragatsotn</td><td><input type="number" data-key="RegionFinal" data-index="6" min="0" id="tableinput" max="1"></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>Shirak</td><td><input type="number" data-key="RegionFinal" data-index="7" min="0" id="tableinput" max="1"></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>Lori</td><td><input type="number" data-key="RegionFinal" data-index="8" min="0" id="tableinput" max="1"></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>Vayots Dzor</td><td><input type="number" data-key="RegionFinal" data-index="9" min="0" id="tableinput" max="1"></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>Yerevan</td><td><input type="number" data-key="RegionFinal" data-index="10" min="0" id="tableinput" max="1"></td></tr></tbody></table>`, `<table class="styled-table"><thead><tr><th>Country</th><th>№</th><th>Gender</th><th>№</th><th>Education</th><th>№</th><th>Area</th><th>№</th><th>AGEGroup</th><th>№</th></tr></thead><tbody><tr><td>Artsakh</td><td><input type="number" data-key="Country" data-index="0" min="0" id="tableinput" max="2"></td><td>Male</td><td><input type="number" data-key="Gender" data-index="0" min="0" id="tableinput" max="2"></td><td>University or postgraduate</td><td><input type="number" data-key="Education" data-index="0" min="0" id="tableinput" max="2"></td><td>Urban</td><td><input type="number" data-key="Area" data-index="0" min="0" id="tableinput" max="2"></td><td>31-45</td><td><input type="number" data-key="AGEGroup" data-index="0" min="0" id="tableinput" max="2"></td></tr><tr><td></td><td></td><td>Female</td><td><input type="number" data-key="Gender" data-index="1" min="0" id="tableinput" max="2"></td><td>Professional or vocational</td><td><input type="number" data-key="Education" data-index="1" min="0" id="tableinput" max="2"></td><td>Rural</td><td><input type="number" data-key="Area" data-index="1" min="0" id="tableinput" max="2"></td><td>61+</td><td><input type="number" data-key="AGEGroup" data-index="1" min="0" id="tableinput" max="2"></td></tr><tr><td></td><td></td><td></td><td></td><td>Secondary or unfinished secondary</td><td><input type="number" data-key="Education" data-index="2" min="0" id="tableinput" max="2"></td><td></td><td></td><td>46-60</td><td><input type="number" data-key="AGEGroup" data-index="2" min="0" id="tableinput" max="2"></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>18-30</td><td><input type="number" data-key="AGEGroup" data-index="3" min="0" id="tableinput" max="2"></td></tr></tbody></table>`, `<table class="styled-table"><thead><tr><th>Country</th><th>№</th><th>Gender</th><th>№</th><th>Education</th><th>№</th><th>AGEGroup</th><th>№</th><th>CountryFinal</th><th>№</th></tr></thead><tbody><tr><td>Russia</td><td><input type="number" data-key="Country" data-index="0" min="0" id="tableinput" max="5"></td><td>Male</td><td><input type="number" data-key="Gender" data-index="0" min="0" id="tableinput" max="5"></td><td>Professional or vocational</td><td><input type="number" data-key="Education" data-index="0" min="0" id="tableinput" max="5"></td><td>46-60</td><td><input type="number" data-key="AGEGroup" data-index="0" min="0" id="tableinput" max="5"></td><td>Russia</td><td><input type="number" data-key="CountryFinal" data-index="0" min="0" id="tableinput" max="5"></td></tr><tr><td>France</td><td><input type="number" data-key="Country" data-index="1" min="0" id="tableinput" max="5"></td><td>Female</td><td><input type="number" data-key="Gender" data-index="1" min="0" id="tableinput" max="5"></td><td>University or postgraduate</td><td><input type="number" data-key="Education" data-index="1" min="0" id="tableinput" max="5"></td><td>61+</td><td><input type="number" data-key="AGEGroup" data-index="1" min="0" id="tableinput" max="5"></td><td>France</td><td><input type="number" data-key="CountryFinal" data-index="1" min="0" id="tableinput" max="5"></td></tr><tr><td>Argentina</td><td><input type="number" data-key="Country" data-index="2" min="0" id="tableinput" max="5"></td><td></td><td></td><td></td><td></td><td>31-45</td><td><input type="number" data-key="AGEGroup" data-index="2" min="0" id="tableinput" max="5"></td><td>Latin America</td><td><input type="number" data-key="CountryFinal" data-index="2" min="0" id="tableinput" max="5"></td></tr><tr><td>USA</td><td><input type="number" data-key="Country" data-index="3" min="0" id="tableinput" max="5"></td><td></td><td></td><td></td><td></td><td>18-30</td><td><input type="number" data-key="AGEGroup" data-index="3" min="0" id="tableinput" max="5"></td><td>USA</td><td><input type="number" data-key="CountryFinal" data-index="3" min="0" id="tableinput" max="5"></td></tr><tr><td>Ukraine</td><td><input type="number" data-key="Country" data-index="4" min="0" id="tableinput" max="5"></td><td></td><td></td><td></td><td></td><td></td><td></td><td>Former SU (excl. RU &amp; Geo)</td><td><input type="number" data-key="CountryFinal" data-index="4" min="0" id="tableinput" max="5"></td></tr><tr><td>Georgia</td><td><input type="number" data-key="Country" data-index="5" min="0" id="tableinput" max="5"></td><td></td><td></td><td></td><td></td><td></td><td></td><td>Georgia</td><td><input type="number" data-key="CountryFinal" data-index="5" min="0" id="tableinput" max="5"></td></tr><tr><td>Belarus</td><td><input type="number" data-key="Country" data-index="6" min="0" id="tableinput" max="5"></td><td></td><td></td><td></td><td></td><td></td><td></td><td>Europe (excl. France)</td><td><input type="number" data-key="CountryFinal" data-index="6" min="0" id="tableinput" max="5"></td></tr><tr><td>Italy</td><td><input type="number" data-key="Country" data-index="7" min="0" id="tableinput" max="5"></td><td></td><td></td><td></td><td></td><td></td><td></td><td>Other</td><td><input type="number" data-key="CountryFinal" data-index="7" min="0" id="tableinput" max="5"></td></tr><tr><td>UK</td><td><input type="number" data-key="Country" data-index="8" min="0" id="tableinput" max="5"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>Germany</td><td><input type="number" data-key="Country" data-index="9" min="0" id="tableinput" max="5"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>Australia</td><td><input type="number" data-key="Country" data-index="10" min="0" id="tableinput" max="5"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>Canada</td><td><input type="number" data-key="Country" data-index="11" min="0" id="tableinput" max="5"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>Sweden</td><td><input type="number" data-key="Country" data-index="12" min="0" id="tableinput" max="5"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>Poland</td><td><input type="number" data-key="Country" data-index="13" min="0" id="tableinput" max="5"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>Belgium</td><td><input type="number" data-key="Country" data-index="14" min="0" id="tableinput" max="5"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>`]);
	showPage(currentPage);

	document.getElementById('nextPage').addEventListener('click', nextPage);
	document.getElementById("previousPage").addEventListener('click', previousPage)

	let jsonData = [{ "Country": "Russia", "Gender": "Male", "Education": "Professional or vocational", "Code": "ZZZ0", "AGEGroup": "46-60", "CountryFinal": "Russia" }, { "Country": "France", "Gender": "Male", "Education": "Professional or vocational", "Code": "YGH4", "AGEGroup": "61+", "CountryFinal": "France" }, { "Country": "Argentina", "Gender": "Female", "Education": "Professional or vocational", "Code": "UJY9", "AGEGroup": "61+", "CountryFinal": "Latin America" }, { "Country": "France", "Gender": "Male", "Education": "Professional or vocational", "Code": "CWA6", "AGEGroup": "61+", "CountryFinal": "France" }, { "Country": "USA", "Gender": "Female", "Education": "Professional or vocational", "Code": "LIK8", "AGEGroup": "46-60", "CountryFinal": "USA" }, { "Country": "Russia", "Gender": "Male", "Education": "Professional or vocational", "Code": "QJP0", "AGEGroup": "31-45", "CountryFinal": "Russia" }, { "Country": "Ukraine", "Gender": "Male", "Education": "Professional or vocational", "Code": "FVD5", "AGEGroup": "61+", "CountryFinal": "Former SU (excl. RU & Geo)" }, { "Country": "France", "Gender": "Male", "Education": "Professional or vocational", "Code": "UBR5", "AGEGroup": "61+", "CountryFinal": "France" }, { "Country": "Georgia", "Gender": "Male", "Education": "Professional or vocational", "Code": "ERS9", "AGEGroup": "31-45", "CountryFinal": "Georgia" }, { "Country": "Belarus", "Gender": "Female", "Education": "Professional or vocational", "Code": "GRZ5", "AGEGroup": "31-45", "CountryFinal": "Former SU (excl. RU & Geo)" }, { "Country": "Russia", "Gender": "Female", "Education": "Professional or vocational", "Code": "RZO0", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "France", "Gender": "Male", "Education": "Professional or vocational", "Code": "NXN5", "AGEGroup": "31-45", "CountryFinal": "France" }, { "Country": "Georgia", "Gender": "Female", "Education": "Professional or vocational", "Code": "XWM0", "AGEGroup": "46-60", "CountryFinal": "Georgia" }, { "Country": "France", "Gender": "Female", "Education": "Professional or vocational", "Code": "RRO3", "AGEGroup": "31-45", "CountryFinal": "France" }, { "Country": "France", "Gender": "Female", "Education": "Professional or vocational", "Code": "QHK2", "AGEGroup": "46-60", "CountryFinal": "France" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "FJI9", "AGEGroup": "46-60", "CountryFinal": "USA" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "UYD4", "AGEGroup": "61+", "CountryFinal": "USA" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "EKY6", "AGEGroup": "31-45", "CountryFinal": "USA" }, { "Country": "Russia", "Gender": "Female", "Education": "Professional or vocational", "Code": "HJO0", "AGEGroup": "46-60", "CountryFinal": "Russia" }, { "Country": "Ukraine", "Gender": "Male", "Education": "Professional or vocational", "Code": "CHN5", "AGEGroup": "31-45", "CountryFinal": "Former SU (excl. RU & Geo)" }, { "Country": "Italy", "Gender": "Female", "Education": "Professional or vocational", "Code": "DDY3", "AGEGroup": "61+", "CountryFinal": "Europe (excl. France)" }, { "Country": "Georgia", "Gender": "Female", "Education": "Professional or vocational", "Code": "DQH4", "AGEGroup": "31-45", "CountryFinal": "Georgia" }, { "Country": "Russia", "Gender": "Male", "Education": "Professional or vocational", "Code": "DAL3", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "JFO8", "AGEGroup": "46-60", "CountryFinal": "USA" }, { "Country": "Georgia", "Gender": "Male", "Education": "Professional or vocational", "Code": "RRM1", "AGEGroup": "46-60", "CountryFinal": "Georgia" }, { "Country": "UK", "Gender": "Male", "Education": "Professional or vocational", "Code": "MER0", "AGEGroup": "46-60", "CountryFinal": "Europe (excl. France)" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "GYX7", "AGEGroup": "61+", "CountryFinal": "USA" }, { "Country": "Germany", "Gender": "Male", "Education": "Professional or vocational", "Code": "GGO0", "AGEGroup": "31-45", "CountryFinal": "Europe (excl. France)" }, { "Country": "Russia", "Gender": "Female", "Education": "Professional or vocational", "Code": "MWL7", "AGEGroup": "31-45", "CountryFinal": "Russia" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "SAV0", "AGEGroup": "31-45", "CountryFinal": "USA" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "NCR0", "AGEGroup": "31-45", "CountryFinal": "USA" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "EVQ6", "AGEGroup": "61+", "CountryFinal": "USA" }, { "Country": "Russia", "Gender": "Female", "Education": "Professional or vocational", "Code": "STS3", "AGEGroup": "31-45", "CountryFinal": "Russia" }, { "Country": "Australia", "Gender": "Male", "Education": "Professional or vocational", "Code": "AUS8", "AGEGroup": "61+", "CountryFinal": "Other" }, { "Country": "Russia", "Gender": "Male", "Education": "Professional or vocational", "Code": "SVK3", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Georgia", "Gender": "Female", "Education": "Professional or vocational", "Code": "LJA7", "AGEGroup": "18-30", "CountryFinal": "Georgia" }, { "Country": "Russia", "Gender": "Male", "Education": "Professional or vocational", "Code": "RZA4", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "ZFK9", "AGEGroup": "46-60", "CountryFinal": "USA" }, { "Country": "USA", "Gender": "Female", "Education": "Professional or vocational", "Code": "JGV4", "AGEGroup": "31-45", "CountryFinal": "USA" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "MFG2", "AGEGroup": "61+", "CountryFinal": "USA" }, { "Country": "USA", "Gender": "Male", "Education": "Professional or vocational", "Code": "JFZ7", "AGEGroup": "61+", "CountryFinal": "USA" }, { "Country": "USA", "Gender": "Male", "Education": "University or postgraduate", "Code": "EMK0", "AGEGroup": "46-60", "CountryFinal": "USA" }, { "Country": "Russia", "Gender": "Male", "Education": "University or postgraduate", "Code": "OTK2", "AGEGroup": "31-45", "CountryFinal": "Russia" }, { "Country": "USA", "Gender": "Female", "Education": "University or postgraduate", "Code": "VHO3", "AGEGroup": "31-45", "CountryFinal": "USA" }, { "Country": "USA", "Gender": "Female", "Education": "University or postgraduate", "Code": "BOL9", "AGEGroup": "31-45", "CountryFinal": "USA" }, { "Country": "Russia", "Gender": "Male", "Education": "University or postgraduate", "Code": "LIU3", "AGEGroup": "61+", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Male", "Education": "University or postgraduate", "Code": "WRB3", "AGEGroup": "61+", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Male", "Education": "University or postgraduate", "Code": "ISI5", "AGEGroup": "46-60", "CountryFinal": "Russia" }, { "Country": "Canada", "Gender": "Female", "Education": "University or postgraduate", "Code": "ATJ9", "AGEGroup": "46-60", "CountryFinal": "Other" }, { "Country": "Russia", "Gender": "Male", "Education": "University or postgraduate", "Code": "ZIH0", "AGEGroup": "61+", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "PCR1", "AGEGroup": "46-60", "CountryFinal": "Russia" }, { "Country": "Canada", "Gender": "Female", "Education": "University or postgraduate", "Code": "GSB7", "AGEGroup": "61+", "CountryFinal": "Other" }, { "Country": "Sweden", "Gender": "Female", "Education": "University or postgraduate", "Code": "XTZ9", "AGEGroup": "61+", "CountryFinal": "Europe (excl. France)" }, { "Country": "Poland", "Gender": "Female", "Education": "University or postgraduate", "Code": "OOR4", "AGEGroup": "18-30", "CountryFinal": "Europe (excl. France)" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "FOS6", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "GGB9", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Belgium", "Gender": "Female", "Education": "University or postgraduate", "Code": "KMY8", "AGEGroup": "18-30", "CountryFinal": "Europe (excl. France)" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "GNH9", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "PKP4", "AGEGroup": "46-60", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "DZN4", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "KJW8", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "AHH3", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "WYO9", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "QMH9", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "JGA2", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "FEO4", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "TVS7", "AGEGroup": "18-30", "CountryFinal": "Russia" }, { "Country": "Russia", "Gender": "Female", "Education": "University or postgraduate", "Code": "NOK3", "AGEGroup": "46-60", "CountryFinal": "Russia" }]
	function jsonToTable(jsonData) {
		let table = document.getElementById("styled-table-result");


		let thead = document.createElement("thead");
		let tbody = document.createElement("tbody");

		let headers = Object.keys(jsonData[0]);
		let headerRow = document.createElement("tr");

		headers.forEach(function (header) {
			let th = document.createElement("th");
			th.textContent = header;
			headerRow.appendChild(th);
		});

		thead.appendChild(headerRow);
		table.appendChild(thead);

		jsonData.forEach(function (rowData) {
			let row = document.createElement("tr");

			headers.forEach(function (header) {
				let cell = document.createElement("td");
				cell.textContent = rowData[header];
				row.appendChild(cell);
			});

			tbody.appendChild(row);
		});

		table.appendChild(tbody);

		return table;
	}
	document.getElementById('methodButton').addEventListener('click', () => {
		document.getElementById('result').classList.remove("hide");
		document.getElementById('result').classList.add("result");
		document.getElementById("bgtransparent").classList.add("hide");
		document.getElementById("startdiv").classList.add("hide");
		// Convert JSON to HTML table and append it to the container
		jsonToTable(jsonData);
	})


}

