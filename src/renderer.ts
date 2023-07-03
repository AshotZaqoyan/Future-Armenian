import { analysiss } from "./js/Analysis";
import { createwindow } from "./js/window";
export function start() {
	createwindow("70vw", "80vh", `
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
	<div class="inp_box"><p class="inp_p">Մուտքագրել մարդկանց թվաքանակը</p><input type="number" min="1" class="inp" id="inp" placeholder="200"></div>
</div>
<div class="next_box"><button class="btn_next" id="btn_next">Հաջորդը</button></div>
`);
	document.getElementById('btn_next').addEventListener('click', () => {
		createwindow("auto", "auto", `
<img src="src/img/back.svg" alt="back" class="btn_back" id="back"><div class="shownumberh">Ընտրության մեթոդաբանություն</div><div class="shownumberp">Ուշադրություն դարձնել որ բոլոր չափորոշիչների գումարը հավասար լինի <b style="color: #009879;">201</b></div><div class="next-back"><img src="src/img/back.svg" alt="back" class="next-back-btn" id="previousPage"><div id="table-container"></div><img src="src/img/back.svg" alt="back" class="next-back-btn" id="nextPage" style="transform: rotate(180deg);"></div><button class="methodButton" id="methodButton">Հաստատել</button>
`);
		document.getElementById('back').addEventListener('click', start)

		analysiss()
	});
};
document.getElementById('btn_start').addEventListener('click', start);
document.getElementById("close").addEventListener("click", () => { (<HTMLInputElement>document.getElementById("bgtransparent")).classList.add("hide") })
