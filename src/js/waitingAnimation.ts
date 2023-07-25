export function waitingAnimation() {
	const waitingAnimation = document.getElementById("waitingAnimation") as HTMLElement;
	const className=waitingAnimation.classList[0]
	waitingAnimation.classList.replace(className, (className==="hide"?"show-display-flex":"hide"))
}