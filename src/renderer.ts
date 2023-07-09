import { createwindow } from "./js/window";
import { upload } from "./js/Upload"

export function start() {
	createwindow("70vw", "60vh", `
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
<div class="next_box"><button class="btn_next" id="btn_next" disabled>Հաջորդը</button></div>
`);

	let GetName = <HTMLInputElement>document.getElementById("FileUpload");
	let Button = <HTMLInputElement>document.getElementById("btn_next");
	let inputnumber = <HTMLInputElement>document.getElementById("inp");
	
	GetName.addEventListener("change", (event: Event) => { upload(GetName, Button) })
};

document.getElementById('btn_start').addEventListener('click', start);
document.getElementById("close").addEventListener("click", () => { (<HTMLInputElement>document.getElementById("bgtransparent")).classList.add("hide") })
