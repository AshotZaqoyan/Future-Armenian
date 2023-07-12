const bgtransparent = <HTMLDivElement>document.getElementById("bgtransparent")
const windowElement = <HTMLDivElement>document.getElementById("windowElement")
export function createwindow(windowwidth, windowheight, elements) {
	bgtransparent.classList.remove("hide")
	windowElement.style.width = windowwidth
	windowElement.style.height = windowheight
	document.getElementById("windowElement").innerHTML=elements
}

