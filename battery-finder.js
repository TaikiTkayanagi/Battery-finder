// ここから書いてください。
const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;

let cameraObjectList = [];
let brandList = [];//重複なし
camera.forEach(value => {
    let cameraObject = new CameraObject(value.brand, value.model, value.powerConsumptionWh);
    cameraObjectList.push(cameraObject);

    if(!brandList.includes(value.brand)){brandList.push(value.brand);}
})



let batteryObjectList = [];
battery.forEach(battery => {
    batteryObjectList.push(new BatteryObject(battery.batteryName, battery.capacityAh, battery.voltage, battery.maxDraw, battery.endVoltage));
})


function appendOption(target, optionList, func = null){
    if(func !== null){optionList = func();}

    optionList.forEach(elem => {
        let option = document.createElement('option');
        option.innerText = elem;
        target.append(option);
    })
}

//続きからやる
function getPowerConsumptionWh(brand, model){
    let target = camera.filter((value) => value.brand === brand).filter((value) => value.model === model);

    return target[0].powerConsumptionWh;
}

function showTable(brand, model, accessoryPowerConsumption){
    let tbody = document.getElementById('tbody');
    if(tbody.childElementCount > 0){tbody.innerHTML = "";} //初期化

    let powerConsumptionWh = getPowerConsumptionWh(brand, model);
    let totalPowerConsumption = Number(powerConsumptionWh) + Number(accessoryPowerConsumption);

    let tableList = batteryObjectList.filter(batteryObject => batteryObject.getElectricPower() > totalPowerConsumption);

    tableList.forEach(value => {
        let tr = document.createElement('tr');
        let th1 = document.createElement('th');
        let th2 = document.createElement('th');

        th1.setAttribute('scope', 'row');
        th1.innerHTML = value.batteryName;

        th2.innerHTML = `Estimate ${value.getSustainableHour(totalPowerConsumption)} hr`

        tbody.append(tr);
        tbody.append(th1);
        tbody.append(th2);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    let brandSelect = document.getElementById('brand');
    appendOption(brandSelect, brandList);
    brandSelect.options[0].selected = true;

    let modelSelect = document.getElementById('model');
    let func = ()=>{
        let list = cameraObjectList.filter(value => value.brand === brandSelect.value).map(value => value.getModel());
        return list;
    }
    appendOption(modelSelect, [], func);
    modelSelect.options[0].selected = true;

    let accessoryPowerInput = document.getElementById('powerConsumption');
    accessoryPowerInput.value = 0;

    brandSelect.addEventListener('change', () => {
        modelSelect.innerHTML = "";

        appendOption(modelSelect, [], func);
        showTable(brandSelect.value, modelSelect.value, accessoryPowerInput.value);
    })

    modelSelect.addEventListener('change', () => {

        showTable(brandSelect.value, modelSelect.value, accessoryPowerInput.value);
    })

    accessoryPowerInput.addEventListener('change', () => {
        if(isNaN(accessoryPowerInput.value)){
            window.alert('数値を入力してください。');
            accessoryPowerInput.value = 0;
        }

        if(accessoryPowerInput.value === ''){accessoryPowerInput.value = 0;}
        showTable(brandSelect.value, modelSelect.value, accessoryPowerInput.value);
    })

    showTable(brandSelect.value, modelSelect.value, accessoryPowerInput.value);
})
