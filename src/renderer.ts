import { createwindow } from "./js/window";
import { upload } from "./js/Upload"
import { situationCheck } from "./js/statusChecker";
import { loading } from "./js/loading";

export function start() {
	createwindow("auto", "auto", `
<div class="container" id="upcontainer">
	<div class="card">
		<div class="card-body" id="upcard-bod">
			<div class="card-title">Վերբեռնեք ձեր ֆայլը այստեղ</div>
			<div class="card-subtitle">ֆայլի ընդլայնումը պետք է լինի ․xlsx</div>
			<div class="file-upload">
				<input class="file-input" id="FileUpload" accept=".xlsx" type="file">
				<img src="src/img/upload.svg" alt="upload">
				<br>
				<div class="card-subtitle" id="FileUploadName">Քաշեք և թողեք ձեր ֆայլը այստեղ</div>
			</div>
			<div class="card-subtitle" id="TypeError"></div>
		</div>
	</div>
</div>
<div class="next-box"><button class="btn-next" id="btn-next" disabled>Հաջորդը</button></div>
`);

	let filePath = <HTMLInputElement>document.getElementById("FileUpload");
	let Button = <HTMLButtonElement>document.getElementById("btn-next");
	
	filePath.addEventListener("change", (event: Event) => { upload(filePath.files, Button) })
};
situationCheck()
document.getElementById('btn-start').addEventListener('click', start);
document.getElementById("close").addEventListener("click", () => { (<HTMLDivElement>document.getElementById("bgtransparent")).classList.add("hide") })
loading()