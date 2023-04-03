const btnCalc = document.getElementById("calc")
btnCalc.addEventListener("click", btnCalcHandler)

function btnCalcHandler(e) {
    let inputValue = document.getElementById("h").value.trim()
    if (inputValue.length == 0) return

    let h = inputValue - ''
    if (isNaN(h)) return

    document.getElementById("charts").innerHTML = ""

    // значения при шаге = h
    let res = start(h)
    let lastIndex = res.values.length - 1;

    const canvasIds = Array.from(Array(res.values[lastIndex].length).keys()).map((_, i) => `canvas_${i}`)
    createCanvases(canvasIds, `h = ${h}`)
    drawCharts(canvasIds, res.times, res.values)
    
    let mes = "<h2>Значения:</h2><br>"
    for(let i = 0; i < res.values[lastIndex].length; i++) {
        mes += `p${i+1}: ${res.values[lastIndex][i].toFixed(4)} <br>`
    }
    
    document.getElementById("results").innerHTML = mes
}

const createCanvases = (canvasIds, message) => {
    let divCharts = document.getElementById("charts")
    
    divCharts.innerHTML = `
        <h2>Графики ф-ций ${message}</h2>
        ${canvasIds.map((id, _) => {
            return `
                <div style="margin-bottom: 50px; padding: 10px 0; text-align: "center"; border: "solid black 1px"">
                    <canvas width="1000" height="500" id="${id}"></canvas>
                </div>
            `
        }).join("\n")}
    `
}

const addChart = (canvas, fName, times, data) => {
    new Chart(canvas, {
        type: "line",
        data: {
            labels: times,
            datasets: [
                {
                    label: fName,
                    data: data,
                    borderColor: "blue",
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0
                }
            ]
        },
        options: {
			responsive: false,
            scales: {
                x: {
                    display: false
                }
            }
        }
    })
}

const drawCharts = (canvasIds, times, dataset) => {
    for(let i = 0; i < canvasIds.length; i++) {
        let canvas = document.getElementById(`${canvasIds[i]}`)
    
        let data = []
        for(let j = 0; j < dataset.length; j++) {
            data.push(dataset[j][i])
        }
    
        addChart(canvas, `p${i+1}`, times.map(t => t.toFixed(2)), data)
    }
}