const nextButton = document.querySelector(".next_btn");
const calculateButton = document.querySelector(".calculator");
const closeButton = document.querySelector(".close_btn");

const epxenseResult = document.querySelector(".first_result");
const modal = document.querySelector("#modal");
const loading = document.querySelector(".loading");
const calculate = document.querySelector(".calculate")


function expenseCaculator(){
    const living = document.querySelector("#living_expenses");
    const housing = document.querySelector("#housing_expenses");
    const monthlyExtra = document.querySelector("#monthly_extra");
    const travel = document.querySelector("#travel_expenses");
    const annualExtra = document.querySelector("#annual_extra");
    
    const living_int = Number(living.value);
    const housing_int = Number(housing.value);
    const monthlyExtra_int = Number(monthlyExtra.value);
    const travel_int = Number(travel.value);
    const annualExtra_int = Number(annualExtra.value);
   
    const annul_value = document.querySelector(".annual_expense_value");
    const annualResult = document.querySelector(".annual_expense_result");
    const monthlyResult = document.querySelector(".monthly_expense_result");

    var annualExpense;
    annualExpense = (living_int+housing_int+monthlyExtra_int)*12 + travel_int+annualExtra_int;
    
    epxenseResult.style.display = 'none';
    loading.style.display = 'flex';
    calculate.style.display = 'none';


    setTimeout(function(){
        loading.style.display = 'none';
        epxenseResult.style.display ="flex";
        calculate.style.display ="flex";
        annualResult.innerText = numberToKorean(parseInt(annualExpense, 10)*10000);
        monthlyResult.innerText = numberToKorean(parseInt(annualExpense/12, 10)*10000);
        annul_value.innerText = parseInt(annualExpense, 10);

        var location = epxenseResult.offsetTop;
        window.scrollTo({top:location, behavior:'smooth'});

        },1800 
    );


}

function equityCalculator(){
    const interestRate = document.querySelector("#interest_rate");
    const monthlyResult = document.querySelector(".monthly_expense_result");
    const annul_value = document.querySelector(".annual_expense_value");

    const interestValue = document.querySelector(".interest_value");
    const modalMonthly = document.querySelector(".monthly_expense_value");
    const equityResult = document.querySelector(".equity_value");

    var equityAmount ;
    equityAmount = Number(annul_value.textContent)/Number(interestRate.value)*100;

    interestValue.innerText = interestRate.value;
    modalMonthly.innerText = monthlyResult.textContent;
    equityResult.innerText = numberToKorean(parseInt(equityAmount,10)*10000);
    
    modal.style.display = 'flex';
   

}

function numberFormat(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numberToKorean(number){
    var inputNumber  = number < 0 ? false : number;
    var unitWords    = ['', ' 만원', '억 ', '조 ', '경'];
    var splitUnit    = 10000;
    var splitCount   = unitWords.length;
    var resultArray  = [];
    var resultString = '';

    for (var i = 0; i < splitCount; i++){
        var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);
        if (unitResult > 0){
            resultArray[i] = unitResult;
        }
    }

    for (var i = 0; i < resultArray.length; i++){
        if(!resultArray[i]) continue;
        resultString = String(numberFormat(resultArray[i])) + unitWords[i] + resultString;
    }

    return resultString;
}

function closeModal(){
    modal.style.display = 'none';
}

window.onclick = function (event) {
    if(event.target == modal){
        closeModal();
    }
}
nextButton.addEventListener('click', expenseCaculator);
calculateButton.addEventListener('click', equityCalculator);
closeButton.addEventListener('click', closeModal);