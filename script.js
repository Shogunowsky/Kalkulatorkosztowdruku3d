const printerPower = 400
const electricityCost = 1.20
const laborCost = 5

const materials = {

pla:{price:55, amortization:0.30},
petg:{price:60, amortization:0.40},
abs:{price:60, amortization:0.50},
tpu:{price:100, amortization:0.60}

}

function convertTime(time){

const parts = time.split(":")

const h = parseFloat(parts[0]) || 0
const m = parseFloat(parts[1]) || 0

return h + (m/60)

}

let chart

function calculate(){

const czasInput = document.getElementById("czas").value
const filamentInput = document.getElementById("filament").value

if(!czasInput || !filamentInput){
return
}

const czas = convertTime(czasInput)

const filament = parseFloat(filamentInput)

const materialType = document.getElementById("filament_typ").value

localStorage.setItem("czas",czasInput)
localStorage.setItem("filament",filament)
localStorage.setItem("material",materialType)

const filamentPrice = materials[materialType].price
const amortRate = materials[materialType].amortization

const koszt_materialu = (filament/1000) * filamentPrice

const energia = (printerPower/1000) * czas
const koszt_energii = energia * electricityCost

const koszt_robocizny = czas * laborCost

const koszt_amortyzacji = czas * amortRate

const koszt_calkowity = koszt_materialu + koszt_energii + koszt_robocizny + koszt_amortyzacji

const sugerowana_cena = Math.ceil(koszt_calkowity * 1.4)

document.getElementById("wynik").innerHTML =

`
🧵 Materiał: <b>${koszt_materialu.toFixed(2)} zł</b><br>
⚡ Energia: <b>${koszt_energii.toFixed(2)} zł</b><br>
👷 Robocizna: <b>${koszt_robocizny.toFixed(2)} zł</b><br>
🔧 Amortyzacja: <b>${koszt_amortyzacji.toFixed(2)} zł</b><br>
<br>
💰 Koszt produkcji: <b>${koszt_calkowity.toFixed(2)} zł</b><br>
💵 Sugerowana cena sprzedaży: <b>${sugerowana_cena} zł</b>
`

updateChart(koszt_materialu,koszt_energii,koszt_robocizny,koszt_amortyzacji)

updateBar(koszt_calkowity)

}

function updateBar(cost){

const percent = Math.min(cost / 50 * 100,100)

document.getElementById("cost-fill").style.width = percent + "%"

}

function updateChart(material,energy,labor,amort){

const ctx = document.getElementById("chart")

if(chart){
chart.destroy()
}

chart = new Chart(ctx,{

type:'doughnut',

data:{

labels:['Materiał','Energia','Robocizna','Amortyzacja'],

datasets:[{

data:[material,energy,labor,amort],

backgroundColor:[
"#00cc66",
"#ffaa00",
"#3399ff",
"#ff4444"
]

}]

},

options:{

plugins:{

legend:{

labels:{
color:'white',
font:{size:16}
}

}

}

}

})

}

window.onload = function(){

const savedTime = localStorage.getItem("czas")
const savedFilament = localStorage.getItem("filament")
const savedMaterial = localStorage.getItem("material")

if(savedTime){
document.getElementById("czas").value = savedTime
}

if(savedFilament){
document.getElementById("filament").value = savedFilament
}

if(savedMaterial){
document.getElementById("filament_typ").value = savedMaterial
}

calculate()

}

document.getElementById("czas").addEventListener("input", calculate)
document.getElementById("filament").addEventListener("input", calculate)
document.getElementById("filament_typ").addEventListener("change", calculate)
