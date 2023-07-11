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
				analysiss(GetName)
				
			});
	} else {
		Name.innerText = "Քաշեք և թողեք ձեր ֆայլը այստեղ";
		TypeError.innerText = "Վերբեռնել .xlsx ֆորմատի ֆայլ";
		Button.setAttribute("disabled", "");
		Button.classList.remove("active");
	}
}
