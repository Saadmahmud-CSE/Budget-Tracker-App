let storedData = JSON.parse(localStorage.getItem("income")) || [];
let storedExpense = JSON.parse(localStorage.getItem("expense")) || [];

const input = document.getElementById("inputData");
const btn = document.getElementById("btn");
const earn = document.getElementById("earning");
const money = document.getElementById("money");
const expend = document.getElementById("expend");

// console.log(expend)

const addIncome = () => {
  const value = input.value;

  input.value = "";
  if (!Array.isArray(storedData)) {
    storedData = [];
  }
  storedData.push(value);

  localStorage.setItem("income", JSON.stringify(storedData));

  location.reload();
};

const displayData = () => {
  money.innerHTML = "";

  storedData.map((i) => {
    const earningDiv = document.createElement("div");
    earningDiv.style.display = "flex";
    earningDiv.style.justifyContent = "start";
    earningDiv.style.marginLeft = "1.5%";
    earningDiv.innerHTML = `
            <h1 class="text-2xl">${i}</h1>
            <h3 class="mt-1.5 ml-1.5">income</h3>
            <div>
                <button class="ml-96"  onclick="deleteIncome('${i}')">Delete</button>
                <button class="ml-10" id="${i}" onclick="editIncome('${i}')">Edit</button>
            </div>
        `;

    money.appendChild(earningDiv);
  });
};

const totalIncome = () => {
  let sum = 0;

  for (let i = 0; i < storedData.length; i++) {
    sum += +storedData[i];
  }

  earn.innerHTML = `Income: ${sum}`;
};

const deleteIncome = (val) => {
  let index = storedData.indexOf(val);

  if (index > -1) {
    storedData.splice(index, 1);

    localStorage.setItem("income", JSON.stringify(storedData));

    storedExpense.push(val);
    localStorage.setItem("expense", JSON.stringify(storedExpense));

    displayData();
    totalIncome();
    totalExpense();
  }
};

const totalExpense = () => {
  let sum = 0;

  for (let i = 0; i < storedExpense.length; i++) {
    sum += +storedExpense[i];
  }

  expend.innerHTML = `Expense: ${sum}`;
};

const editIncome = (val) => {
  const newIncomeValue = prompt("Enter the new income value:", val);

  if (newIncomeValue) {
    const index = storedData.indexOf(val);
    if (index > -1) {
      // Update the income item in the storedData array
      storedData[index] = newIncomeValue;
      // Update the localStorage
      localStorage.setItem("income", JSON.stringify(storedData));
      // Refresh the UI
      displayData();
      totalIncome();
    }
  }
};
displayData();
totalIncome();
deleteIncome();
totalExpense();
