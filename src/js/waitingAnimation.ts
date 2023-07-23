
export function waitingAnimation() {

	const waitingAnimation = document.getElementById("waitingAnimation") as HTMLElement;
	waitingAnimation.style.display = waitingAnimation.style.display === "none" ? "flex" : "none";

}