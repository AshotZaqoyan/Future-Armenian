import { createwindow } from "./window";
import { analysiss } from "./Analysis";

export function upload(GetName: any, Button: any) {
	let TypeError = document.getElementById("TypeError");
	let Name = document.getElementById("FileUploadName");

	if (GetName.files[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
		Name.innerText = GetName.files[0].name;
		TypeError.innerText = "";
			Button.removeAttribute("disabled");
			Button.classList.add("active");
			document.getElementById('btn_next').addEventListener('click', () => {
				createwindow("auto", "auto", `<img src="src/img/back.svg" alt="back" class="btn_back" id="back"><div class="shownumberh">Ընտրության մեթոդաբանություն</div><div class="shownumberp">Ուշադրություն դարձնել որ բոլոր չափորոշիչների գումարը հավասար լինի <b style="color: #009879;">201</b></div><div class="next-back"><img src="src/img/back.svg" alt="back" class="next-back-btn" id="previousPage"><div id="table-container"></div><img src="src/img/back.svg" alt="back" class="next-back-btn" id="nextPage" style="transform: rotate(180deg);"></div><div id="error-div"></div><div class="dots-div" id="dots-div"></div><button class="methodButton" id="methodButton">Հաստատել</button>`);
				analysiss(GetName)
			});
	} else {
		Name.innerText = "Քաշեք և թողեք ձեր ֆայլը այստեղ";
		TypeError.innerText = "Վերբեռնել .xlsx ֆորմատի ֆայլ";
		Button.setAttribute("disabled", "");
		Button.classList.remove("active");
	}
}
