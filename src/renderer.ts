
import { createwindow } from "./js/window";
function start() {
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
document.getElementById('btn_next').addEventListener('click', (event) => {
		createwindow("auto", "auto", `
<img src="src/img/back.svg" alt="back" class="btn_back" id="back"><div class="shownumberh">Ընտրության մեթոդաբանություն</div><div class="shownumberp">Ուշադրություն դարձնել որ բոլոր չափորոշիչների գումարը հավասար լինի <b style="color: #009879;">201</b></div><div id="table-container"><div id="table-container"><table class="styled-table"><thead><tr><th>Country</th><th>№</th><th>Gender</th><th>№</th><th>Education</th><th>№</th><th>Area</th><th>№</th><th>AGEGroup</th><th>№</th><th>RegionFinal</th><th>№</th></tr></thead><tbody><tr><td>Armenia</td><td><input type="number" data-key="Country" data-index="0" min="0" id="tableinput" max="1"></td><td>Female</td><td><input type="number" data-key="Gender" data-index="0" min="0" id="tableinput" max="1"></td><td>University or postgraduate</td><td><input type="number" data-key="Education" data-index="0" min="0" id="tableinput" max="1"></td><td>Urban</td><td><input type="number" data-key="Area" data-index="0" min="0" id="tableinput" max="1"></td><td>18-30</td><td><input type="number" data-key="AGEGroup" data-index="0" min="0" id="tableinput" max="1"></td><td>Tavush</td><td><input type="number" data-key="RegionFinal" data-index="0" min="0" id="tableinput" max="1"></td></tr><tr><td></td><td></td><td>Male</td><td><input type="number" data-key="Gender" data-index="1" min="0" id="tableinput" max="1"></td><td>Secondary or unfinished secondary</td><td><input type="number" data-key="Education" data-index="1" min="0" id="tableinput" max="1"></td><td>Rural</td><td><input type="number" data-key="Area" data-index="1" min="0" id="tableinput" max="1"></td><td>31-45</td><td><input type="number" data-key="AGEGroup" data-index="1" min="0" id="tableinput" max="1"></td><td>Kotayk</td><td><input type="number" data-key="RegionFinal" data-index="1" min="0" id="tableinput" max="1"></td></tr><tr><td></td><td></td><td></td><td></td><td>Professional or vocational</td><td><input type="number" data-key="Education" data-index="2" min="0" id="tableinput" max="1"></td><td>Yerevan</td><td><input type="number" data-key="Area" data-index="2" min="0" id="tableinput" max="1"></td><td>46-60</td><td><input type="number" data-key="AGEGroup" data-index="2" min="0" id="tableinput" max="1"></td><td>Gegharkunik</td><td><input type="number" data-key="RegionFinal" data-index="2" min="0" id="tableinput" max="1"></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>61+</td><td><input type="number" data-key="AGEGroup" data-index="3" min="0" id="tableinput" max="1"></td><td>Ararat</td><td><input type="number" data-key="RegionFinal" data-index="3" min="0" id="tableinput" max="1"></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>Armavir</td><td><input type="number" data-key="RegionFinal" data-index="4" min="0" id="tableinput" max="1"></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>Syunik</td><td><input type="number" data-key="RegionFinal" data-index="5" min="0" id="tableinput" max="1"></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>Aragatsotn</td><td><input type="number" data-key="RegionFinal" data-index="6" min="0" id="tableinput" max="1"></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>Shirak</td><td><input type="number" data-key="RegionFinal" data-index="7" min="0" id="tableinput" max="1"></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>Lori</td><td><input type="number" data-key="RegionFinal" data-index="8" min="0" id="tableinput" max="1"></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>Vayots Dzor</td><td><input type="number" data-key="RegionFinal" data-index="9" min="0" id="tableinput" max="1"></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>Yerevan</td><td><input type="number" data-key="RegionFinal" data-index="10" min="0" id="tableinput" max="1"></td></tr></tbody></table></div></div><button class="methodButton" id="methodButton">Հաստատել</button>
`); 
document.getElementById('back').addEventListener('click', start)
document.getElementById('methodButton').addEventListener('click', (event) => {
	document.getElementById('result').classList.remove("hide");
	document.getElementById('result').classList.add("result");
	document.getElementById("bgtransparent").classList.add("hide")
	document.getElementById("startdiv").classList.add("hide")
})
});
};
document.getElementById('btn_start').addEventListener('click', start);
document.getElementById("close").addEventListener("click", (even: Event) => { (<HTMLInputElement>document.getElementById("bgtransparent")).classList.add("hide") })
