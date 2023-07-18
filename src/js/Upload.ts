import { analysisExcel } from "./analysisExcel";

export function upload(file: File, Button: HTMLButtonElement) {
	let TypeError = document.getElementById("TypeError");
	let Name = document.getElementById("FileUploadName");

	if (file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
		Name.innerText = file.name;
		TypeError.innerText = "";
		Button.removeAttribute("disabled");
		Button.classList.add("active");
		document.getElementById('btn-next').addEventListener('click', () => {
			analysisExcel(file);
		});
	} else {
		Name.innerText = "Քաշեք և թողեք ձեր ֆայլը այստեղ";
		TypeError.innerText = "Վերբեռնել .xlsx ֆորմատի ֆայլ";
		Button.setAttribute("disabled", "");
		Button.classList.remove("active");
	}
}