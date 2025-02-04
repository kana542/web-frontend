const weightInput = document.getElementById('bmi-weight');
const heightInput = document.getElementById('bmi-height');
const calculateButton = document.querySelector('.calculate-button');
const resultElement = document.getElementById('personal-result');
const analysisElement = document.getElementById('result-analysis');
const form = document.querySelector('.bmi-form');

calculateButton.addEventListener('click', calculateBMI);
form.addEventListener('keypress', handleEnter);

function handleEnter(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        calculateBMI();
    }
}

function calculateBMI() {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value) / 100;

    if (!weight || !height || weight <= 0 || height <= 0) {
        resultElement.textContent = 'Virheellinen syöte!';
        analysisElement.textContent = 'Analyysi: Virheellinen syöte!';
        return;
    }

    const bmi = weight / (height * height);
    const roundedBMI = Math.round(bmi * 10) / 10;
    
    resultElement.textContent = `Mittaustuloksesi: ${roundedBMI}`;

    let category, analysis, rowColor;

    if (bmi < 18.9) {
        category = 'alipaino';
        analysis = 'Painoindeksisi on alueella, jossa ihmisen terveys voi olla vaarassa alipainon vuoksi.';
        rowColor = '#ffcccb';
    } else if (bmi <= 24.9) {
        category = 'normaali paino';
        analysis = 'Painoindeksisi on normaalialueella.';
        rowColor = '#90EE90';
    } else {
        category = 'ylipaino';
        analysis = 'Painoindeksisi on alueella, jossa ihmisen terveys voi olla vaarassa ylipainon vuoksi.';
        rowColor = '#ffcccb';
    }

    analysisElement.textContent = `Analyysi: ${analysis}`;

    const tableRows = document.querySelectorAll('.bmi-table tr');
    tableRows.forEach(row => {
        const firstCell = row.firstElementChild.textContent.toLowerCase();
        if (firstCell.includes(category)) {
            row.style.backgroundColor = rowColor;
            if (category === 'alipaino' || category === 'ylipaino') {
                row.style.color = '#ff0000';
            } else {
                row.style.color = '';
            }
        } else {
            row.style.backgroundColor = '';
            row.style.color = '';
        }
    });
}