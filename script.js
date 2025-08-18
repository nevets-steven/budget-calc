function mainCalc(){

    const income = document.getElementById('income-container');
    const expenses = document.getElementById('expenses-container');
    
    const result = incomeCalc(income) - expenseCalc(expenses);

    document.getElementById('result').textContent = `Leftover Cash: $${result}`;
}


document.querySelector('button').addEventListener('click', mainCalc)

function incomeCalc(income){
    const incomeItems = income.getElementsByTagName('input');
    let arrIncomes = [];
    for (let i = 0; i < incomeItems.length; i++){
        arrIncomes.push(parseFloat(incomeItems[i].value));
    }
    const totalIncome = arrIncomes.reduce((a,b) => a + b, 0);
    
    return totalIncome;
}
function expenseCalc(expenses){
    const expenseItems = expenses.getElementsByTagName('input');
    let arrExpenses = [];
    for (let i = 0; i < expenseItems.length; i++){
        arrExpenses.push(parseFloat(expenseItems[i].value));
    }
    const totalExpenses = arrExpenses.reduce((a, b) => a+b, 0);

    return totalExpenses;
}