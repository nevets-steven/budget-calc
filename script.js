function simple_calc(){
    const income = parseFloat(document.getElementById('income').value);
    const expenses = parseFloat(document.getElementById('expenses').value);


    // console.log(income, typeof(income));
    // console.log(expenses, typeof(expenses));

    const result = income - expenses;

    document.getElementById('result').textContent = `Leftover Cash: $${result}`;
}


document.querySelector('button').addEventListener('click', simple_calc)