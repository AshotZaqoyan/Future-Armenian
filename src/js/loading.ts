export function loading() {
	const loading = document.getElementById("loading") as HTMLElement;
	const className=loading.classList[0]
	loading.classList.replace(className, (className==="hide"?"show-display-flex":"hide"))
}