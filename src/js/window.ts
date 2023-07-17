const bgtransparent = <HTMLDivElement>document.getElementById("bgtransparent")
const windowElement = <HTMLDivElement>document.getElementById("window-element")
export function createwindow(windowwidth, windowheight, elements) {
	bgtransparent.classList.remove("hide")
	windowElement.style.width = windowwidth
	windowElement.style.height = windowheight
	document.getElementById("window-element").innerHTML=elements
}

