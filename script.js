// function mainCalc(){

//     const income = document.getElementById('income-container');
//     const expenses = document.getElementById('expenses-container');
    
//     const result = incomeCalc(income) - expenseCalc(expenses);

//     document.getElementById('result').textContent = `Leftover Cash: $${result}`;
// }


// document.querySelector('button').addEventListener('click', mainCalc)

// function incomeCalc(income){
//     const incomeItems = income.getElementsByTagName('input');
//     let arrIncomes = [];
//     for (let i = 0; i < incomeItems.length; i++){
//         arrIncomes.push(parseFloat(incomeItems[i].value));
//     }
//     const totalIncome = arrIncomes.reduce((a,b) => a + b, 0);
    
//     return totalIncome;
// }
// function expenseCalc(expenses){
//     const expenseItems = expenses.getElementsByTagName('input');
//     let arrExpenses = [];
//     for (let i = 0; i < expenseItems.length; i++){
//         arrExpenses.push(parseFloat(expenseItems[i].value));
//     }
//     const totalExpenses = arrExpenses.reduce((a, b) => a+b, 0);

//     return totalExpenses;
// }



const STORAGE_KEY = 'budgetState_V1';
const state = loadState();

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw? JSON.parse(raw) : {income: [], expenses: []};
    } catch {
        return {income: [], expenses: []}
    }
}

function saveState(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

//helpers

function toNumber(value){
    const n = parseFloat(value);
    return Number.isFinite(n) ? n : NaN;
}

function addEntry(kind, description, amount){
    state[kind].push({description: description.trim(), amount});
    saveState();
}

function sum(list){
    return list.reduce((s, e) => s + e.amount, 0);
}


//UI wiring

const form = document.getElementById('budget-form');
const incomeDescEl = document.getElementById('income-description');
const incomeAmtEl = document.getElementById('income-amount');
const expenseDescEl = document.getElementById('expense-description');
const expenseAmtEl = document.getElementById('expense-amount');
const resultEl = document.getElementById('result');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const incomeDesc = incomeDescEl.value.trim();
    const incomeAmt = toNumber(incomeAmtEl.value);
    const expenseDesc = expenseDescEl.value.trim();
    const expenseAmt = toNumber(expenseAmtEl.value);

    const incomeValid = incomeDesc && Number.isFinite(incomeAmt) && incomeAmt > 0;
    const expenseValid = expenseDesc && Number.isFinite(expenseAmt) && expenseAmt > 0;

    //nothing is valid check

    if (!incomeValid && !expenseValid){
        alert('Please enter a description and positive amount for Income and/or Expense.');
        return;
    }

    let added = [];
    if (incomeValid){
        addEntry('income', incomeDesc, incomeAmt);
        added.push('income');
        incomeDescEl.value = '';
        incomeAmtEl.value = '';
    }
    if (expenseValid){
        addEntry('expenses', expenseDesc, expenseAmt);
        added.push('expenses');
        expenseDescEl.value = '';
        expenseAmtEl.value = '';
    }

    if (added.length === 2){
        console.log("Added 1 income + 1 expense");
    }
    else if (added[0] === 'income') 
        console.log("added income");
    else console.log('added expense');

    render();
});

function render(){
    const incomeTotal = sum(state.income);
    const expenseTotal = sum(state.expenses);
    const balance = incomeTotal - expenseTotal;

    const incomeList = state.income
        .map(e => `<li><span>${e.description}</span> <strong>$${e.amount.toFixed(2)}</strong></li>`)
        .join("");

    const expenseList = state.expenses
        .map(e => `<li><span>${e.description}</span> <strong>-$${e.amount.toFixed(2)}</strong></li>`)
        .join("");

    resultEl.innerHTML = `
        <div class="summary">
        <p><strong>Total Income:</strong> $${incomeTotal.toFixed(2)}</p>
        <p><strong>Total Expenses:</strong> $${expenseTotal.toFixed(2)}</p>
        <p><strong>Balance:</strong> $${balance.toFixed(2)}</p>
        </div>
        <div class="lists" style="display:grid; gap:1rem; grid-template-columns: 1fr 1fr;">
        <div>
            <h3>Income</h3>
            <ul>${incomeList || "<li>No income yet</li>"}</ul>
        </div>
        <div>
            <h3>Expenses</h3>
            <ul>${expenseList || "<li>No expenses yet</li>"}</ul>
        </div>
        </div>
    `;
}

render();


document.getElementById("reset").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  state.income = [];
  state.expenses = [];
  render();
});
