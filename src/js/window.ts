const bgtransparent = <HTMLInputElement>document.getElementById("bgtransparent")
const windowElement = <HTMLInputElement>document.getElementById("windowElement")
export function createwindow(windowwidth, windowheight, elements) {
	bgtransparent.classList.remove("hide")
	windowElement.style.width = windowwidth
	windowElement.style.height = windowheight
	document.getElementById("windowElement").innerHTML=elements
}

