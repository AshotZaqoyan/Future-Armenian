import { analysisExcel } from "./analysisExcel";
import { deleteFolderRecursive } from "./editData";

export function upload(filePath: FileList, Button: HTMLButtonElement) {
	let TypeError = document.getElementById("TypeError");
	let Name = document.getElementById("FileUploadName");

	if (filePath[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
		Name.innerText = filePath[0].name;
		TypeError.innerText = "";
			Button.removeAttribute("disabled");
			Button.classList.add("active");
			document.getElementById('btn-next').addEventListener('click', () => {
				deleteFolderRecursive("./src/database")
				analysisExcel(filePath)
			});
	} else {
		Name.innerText = "Քաշեք և թողեք ձեր ֆայլը այստեղ";
		TypeError.innerText = "Վերբեռնել .xlsx ֆորմատի ֆայլ";
		Button.setAttribute("disabled", "");
		Button.classList.remove("active");
	}
}
