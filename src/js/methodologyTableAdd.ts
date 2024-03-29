export function showPage(pageNumber: number): void {
	const pages: HTMLCollectionOf<Element> = document.getElementsByClassName("page");
	const errorTexts: HTMLCollectionOf<Element> = document.getElementsByClassName("errorText");
	const dots: HTMLCollectionOf<Element> = document.getElementsByClassName("dot");
	for (let i: number = 0; i < pages.length; i++) {
		(pages[i] as HTMLElement).style.display = "none";
		(errorTexts[i] as HTMLElement).style.display = "none";
		if (pages.length != 1) {
			(dots[i] as HTMLElement).classList.remove("dot-a")
		}
	}
	const page: HTMLElement | null = document.getElementById("page" + pageNumber);
	const errorText: HTMLElement | null = document.getElementById("errorText" + pageNumber);
	const dot: HTMLElement | null = document.getElementById("dot" + pageNumber);
	if (page) {
		page.style.display = "flex";
		errorText.style.display = "inline";
		if (pages.length != 1) {
			dot.classList.add("dot-a")
		}
	}
}

export function addtables(tables: string[]) {
	let currentPage = 1;
	let totalPages = 1;
	function createPages(table: string[]): void {
		totalPages = table.length;
	
		const pagesDiv: HTMLElement | null = document.getElementById("table-container");
		const dotsDiv: HTMLElement | null = document.getElementById("dots-div");
		const errorDiv: HTMLElement | null = document.getElementById("error-div");
		if (pagesDiv) {
			for (let i: number = 1; i <= totalPages; i++) {
				const number = table[i-1][1]
				// Pages
				const pageDiv: HTMLElement = document.createElement("div");
				pageDiv.setAttribute("class", "page");
				pageDiv.setAttribute("id", "page" + i);
				pageDiv.innerHTML = `<div class="inp-box"><p class="inp-p">Մուտքագրել մարդկանց թվաքանակը</p><input type="number" min="1" class="inp" id="${i}" placeholder="200" value=${number}></div><h2 class="methodology-page-title">${table[i - 1][2]}</h2>` + table[i - 1][0]
				pagesDiv.appendChild(pageDiv);

				const errorText: HTMLElement = document.createElement("p");
				errorText.setAttribute("class", "errorText");
				errorText.setAttribute("id", "errorText" + i);
				errorDiv.appendChild(errorText);

				if (totalPages !== 1) {
					// Dots
					const dot: HTMLElement = document.createElement("div");
					dot.setAttribute("class", "dot cursor-pointer");
					dot.setAttribute("id", "dot" + i);
					dotsDiv.appendChild(dot);
				}

				showPage(1)
			}
			
			showPageWhenClickedDot()

		}
		if (totalPages === 1) {
			document.getElementById("previousPage").classList.add("hide")
			document.getElementById("nextPage").classList.add("hide")
		}
	}

	function previousPage(): void {
		if (currentPage > 1) {
			currentPage--;
			showPage(currentPage);
		} else {
			currentPage=totalPages
			showPage(totalPages);
		}
	}

	function nextPage(): void {
		if (currentPage < totalPages) {
			currentPage++;
			showPage(currentPage);
		} else {
			currentPage=1
			showPage(1);
		}
	}


	function showPageWhenClickedDot() {
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

	showPage(currentPage);

	document.getElementById('nextPage').addEventListener('click', nextPage);
	document.getElementById("previousPage").addEventListener('click', previousPage)

	createPages(tables)

}