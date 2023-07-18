export function choice(){
	(<HTMLDivElement>document.getElementById("bgtransparent")).classList.add("hide");
	document.getElementById("startdiv").classList.add("hide");
	document.getElementById("result").classList.replace("hide", "result");
	
	console.log("ok");
}