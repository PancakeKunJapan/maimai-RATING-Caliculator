const input = document.getElementById('caliculator-input-score');

input.addEventListener('blur', (e) => {
  let value = parseFloat(e.target.value);
  
  if (!isNaN(value)) {
    if (value > 101) value = 101;
    if (value < 0) value = 0;
    
    e.target.value = value.toFixed(4);
  } else {
    e.target.value = "101.0000"; 
    value = 101;
  }

  const apCheckbox = document.getElementById(`caliculator-input-apcheck`);
  if (apCheckbox) {
    if (value === 101) {
        apCheckbox.checked = true ;
    } else {
        apCheckbox.checked = false ;
    }
  }
});

const data = {
            15: [{value: `.0`, text: `.0`}],
            14: [
                {value: `.0`, text: `.0`}, {value: `.1`, text: `.1`}, {value: `.2`, text: `.2`}, {value: `.3`, text: `.3`}, {value: `.4`, text: `.4`},
                {value: `.5`, text: `.5`}, {value: `.6`, text: `.6`}, {value: `.7`, text: `.7`}, {value: `.8`, text: `.8`}, {value: `.9`, text: `.9`}
            ],
            13: [
                {value: `.0`, text: `.0`}, {value: `.1`, text: `.1`}, {value: `.2`, text: `.2`}, {value: `.3`, text: `.3`}, {value: `.4`, text: `.4`},
                {value: `.5`, text: `.5`}, {value: `.6`, text: `.6`}, {value: `.7`, text: `.7`}, {value: `.8`, text: `.8`}, {value: `.9`, text: `.9`}
            ],
            12: [
                {value: `.0`, text: `.0`}, {value: `.1`, text: `.1`}, {value: `.2`, text: `.2`}, {value: `.3`, text: `.3`}, {value: `.4`, text: `.4`},
                {value: `.5`, text: `.5`}, {value: `.6`, text: `.6`}, {value: `.7`, text: `.7`}, {value: `.8`, text: `.8`}, {value: `.9`, text: `.9`}
            ],
            11: [
                {value: `.0`, text: `.0`}, {value: `.1`, text: `.1`}, {value: `.2`, text: `.2`}, {value: `.3`, text: `.3`}, {value: `.4`, text: `.4`},
                {value: `.5`, text: `.5`}, {value: `.6`, text: `.6`}, {value: `.7`, text: `.7`}, {value: `.8`, text: `.8`}, {value: `.9`, text: `.9`}
            ],
            10: [
                {value: `.0`, text: `.0`}, {value: `.1`, text: `.1`}, {value: `.2`, text: `.2`}, {value: `.3`, text: `.3`}, {value: `.4`, text: `.4`},
                {value: `.5`, text: `.5`}, {value: `.6`, text: `.6`}, {value: `.7`, text: `.7`}, {value: `.8`, text: `.8`}, {value: `.9`, text: `.9`}
            ],
            9: [{value: `.0`, text: `.0`}, {value: `.7`, text: `.7`}],
            8: [{value: `.0`, text: `.0`}, {value: `.7`, text: `.7`}],
            7: [{value: `.0`, text: `.0`}, {value: `.7`, text: `.7`}],
            6: [{value: `.0`, text: `.0`}],
            5: [{value: `.0`, text: `.0`}],
            4: [{value: `.0`, text: `.0`}],
            3: [{value: `.0`, text: `.0`}],
            2: [{value: `.0`, text: `.0`}],
            1: [{value: `.0`, text: `.0`}]
        };
const parentSelect = document.getElementById(`caliculator-input-level`)
const childSelect = document.getElementById(`caliculator-input-constant`);

Object.keys(data)
    .sort((a, b) => b-a)
    .forEach(key => {
        const option = document.createElement(`option`)
        option.value = key;
        option.textContent = key;
        parentSelect.appendChild(option);
    });

parentSelect.addEventListener(`change`, (e) => {
    const selectedValue = e.target.value;
    childSelect.innerHTML = ``;

    if (!selectedValue) return;

    const list = data[selectedValue];
    list.forEach(item => {
        const option = document.createElement(`option`);
        option.value = item.value;
        option.textContent = item.text;
        childSelect.appendChild(option); 
    });
});

const tankyokuOutput = document.getElementById(`caliculator-input-score`);
const resultTankyoku = document.getElementById('caliculator-output-result-tankyoku');
const resultSum = document.getElementById(`caliculator-output-result-sum`);
const resultColor = document.getElementById(`caliculator-output-result-color`);

function caliculatAndShowResult(){
    const score = parseFloat(document.getElementById(`caliculator-input-score`).value) || 0;
    const level = parseFloat(document.getElementById(`caliculator-input-level`).value) || 0;
    const constant = parseFloat(document.getElementById(`caliculator-input-constant`).value) || 0;
    const isAP = document.getElementById(`caliculator-input-apcheck`).checked;

    function getRankCoefficient(score) {
        if (score >= 100.5000) return 22.4; // SSS+
        if (score >= 100.4999) return 22.2; 
        if (score >= 100.0000) return 21.6; // SSS
        if (score >=  99.9999) return 21.4;
        if (score >=  99.5000) return 21.1; // SS+
        if (score >=  99.0000) return 20.8; // SS
        if (score >=  98.9999) return 20.6;
        if (score >=  98.0000) return 20.3; // S+
        if (score >=  97.0000) return 20.0; // S
        if (score >=  96.9999) return 17.6;
        if (score >=  94.0000) return 16.8; // AAA
        if (score >=  90.0000) return 15.2; // AA
        if (score >=  80.0000) return 13.6; // A
        if (score >=  79.9999) return 12.8;
        if (score >=  75.0000) return 12.0; // BBB
        if (score >=  70.0000) return 11.2; // BB
        if (score >=  60.0000) return 9.6;  // B
        if (score >=  50.0000) return 8.0;  // C
        if (score >=  40.0000) return 6.4;
        if (score >=  30.0000) return 4.8;
        if (score >=  20.0000) return 3.2;
        if (score >=  10.0000) return 1.6;
        return 0.0;                         // D
    }

    let OneHundredthScore = score / 100;

    if (OneHundredthScore >= 1.005) {
        OneHundredthScore = 1.005;
    }

    const internalLevel = level + constant;
    const rankCoeff = getRankCoefficient(score);

    const baseCalc = Math.floor(internalLevel * OneHundredthScore * rankCoeff);
    
    const apBounus = isAP ? 1 : 0;
    const tankyokuRate = baseCalc + apBounus;
    const totalSum = tankyokuRate * 50;

    if (resultSum && resultTankyoku && resultColor) {
        if (score > 0 && internalLevel > 0) {
            const finalSum = Math.floor(totalSum);

            resultTankyoku.textContent = Math.floor(tankyokuRate);
            resultSum.textContent = finalSum;

            // 💡 判定ごとにclassNameを完全に上書きして、強化CSSに100%連動させます
            if (finalSum >= 16750) {
                resultColor.textContent = `虹 (極) ☆☆☆☆`;
                resultColor.className = "rate-rainbow-kiwami";
            } else if (finalSum >= 16500) {
                resultColor.textContent = `虹 (極) ☆☆☆`;
                resultColor.className = "rate-rainbow-kiwami";
            } else if (finalSum >= 16250) {
                resultColor.textContent = `虹 (極) ☆☆`;
                resultColor.className = "rate-rainbow-kiwami";
            } else if (finalSum >= 16000) {
                resultColor.textContent = `虹 (極) ☆`;
                resultColor.className = "rate-rainbow-kiwami";
            } else if (finalSum >= 15750) {
                resultColor.textContent = `虹 ☆☆☆☆`;
                resultColor.className = "rate-rainbow";
            } else if (finalSum >= 15500) {
                resultColor.textContent = `虹 ☆☆☆`;
                resultColor.className = "rate-rainbow";
            } else if (finalSum >= 15250) {
                resultColor.textContent = `虹 ☆☆`;
                resultColor.className = "rate-rainbow";
            } else if (finalSum >= 15000) {
                resultColor.textContent = `虹 ☆`;
                resultColor.className = "rate-rainbow";
            } else if (finalSum >= 14750) {
                resultColor.textContent = `白金 ☆☆`;
                resultColor.className = "rate-platinum";
            } else if (finalSum >= 14500) {
                resultColor.textContent = `白金 ☆`;
                resultColor.className = "rate-platinum";
            } else if (finalSum >= 14250) {
                resultColor.textContent = `金 ☆☆`;
                resultColor.className = "rate-gold";
            } else if (finalSum >= 14000) {
                resultColor.textContent = `金 ☆`;
                resultColor.className = "rate-gold";
            } else if (finalSum >= 13000) {
                resultColor.textContent = `銀`;
                resultColor.className = "rate-silver";
            } else if (finalSum >= 12000) {
                resultColor.textContent = `銅`;
                resultColor.className = "rate-bronze";
            } else if (finalSum >= 10000) {
                resultColor.textContent = `紫`;
                resultColor.className = "rate-purple";
            } else if (finalSum >= 7000) {
                resultColor.textContent = `赤`;
                resultColor.className = "rate-red";
            } else if (finalSum >= 4000) {
                resultColor.textContent = `黄`;
                resultColor.className = "rate-orange";
            } else if (finalSum >= 2000) {
                resultColor.textContent = `緑`;
                resultColor.className = "rate-green";
            } else if (finalSum >= 1000) {
                resultColor.textContent = `青`;
                resultColor.className = "rate-blue";
            } else {
                resultColor.textContent = `白`;
                resultColor.className = "rate-white";
            }

        } else {
            resultTankyoku.textContent = "0";
            resultSum.textContent = "0";
            resultColor.textContent = "白";
            resultColor.className = "rate-white";
        }
    }
}

input.addEventListener(`blur`, caliculatAndShowResult);
parentSelect.addEventListener(`change`, caliculatAndShowResult);
childSelect.addEventListener(`change`, caliculatAndShowResult);
const apCheckbox = document.getElementById(`caliculator-input-apcheck`);
if (apCheckbox){
    apCheckbox.addEventListener(`change`, caliculatAndShowResult);
}
caliculatAndShowResult();