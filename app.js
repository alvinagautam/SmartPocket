// ================= GLOBAL VARIABLES =================
let transactions = [];
let currentType = 'expense';
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let currentFilter = 'all';
let currentTheme = 'light';
const expenseCategories = [
  { value: "☕ Tea / Coffee", text: "☕ Tea / Coffee" },
  { value: "🍪 Snacks", text: "🍪 Snacks" },
  { value: "🍽 Meals", text: "🍽 Meals" },
  { value: "🚌 Travel", text: "🚌 Travel" },
  { value: "✏️ Stationery", text: "✏️ Stationery" },
  { value: "📱 Recharge / Internet", text: "📱 Recharge / Internet" },
  { value: "🎬 Entertainment", text: "🎬 Entertainment" },
  { value: "🛍 Shopping", text: "🛍 Shopping" },
  { value: "📚 Books / Courses", text: "📚 Books / Courses" },
  { value: "💇 Personal Care", text: "💇 Personal Care" },
  { value: "🏠 Rent / Hostel", text: "🏠 Rent / Hostel" },
  { value: "🎁 Gifts", text: "🎁 Gifts" },
  { value: "💸 Other Expense", text: "💸 Other Expense" }
];

const incomeCategories = [
  { value: "💵 Pocket Money", text: "💵 Pocket Money" },
  { value: "🧑‍💻 Internship Stipend", text: "🧑‍💻 Internship Stipend" },
  { value: "💻 Freelancing", text: "💻 Freelancing" },
  { value: "📝 Project Payment", text: "📝 Project Payment" },
  { value: "🎓 Scholarship", text: "🎓 Scholarship" },
  { value: "🏆 Competition Prize", text: "🏆 Competition Prize" },
  { value: "🕐 Part-time Job", text: "🕐 Part-time Job" },
  { value: "🎁 Gifts Received", text: "🎁 Gifts Received" },
  { value: "💰 Other Income", text: "💰 Other Income" }
];
// ================= GET ELEMENTS =================
const toggleBtns = document.querySelectorAll('.toggle-btn');
const transactionForm = document.getElementById('transactionForm');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const descriptionInput = document.getElementById('description');
const dateInput = document.getElementById('date');

const transactionsList = document.getElementById('transactionsList');
const emptyState = document.getElementById('emptyState');

const totalIncomeEl = document.getElementById('totalIncome');
const totalExpenseEl = document.getElementById('totalExpense');
const balanceEl = document.getElementById('balance');

const filterBtns = document.querySelectorAll('.filter-btn');
const clearMonthBtn = document.getElementById('clearMonthBtn');

const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const monthDisplay = document.getElementById('monthDisplay');

const themeBtn = document.getElementById('themeBtn');

// ================= SET TODAY'S DATE =================
const today = new Date().toISOString().split('T')[0];
dateInput.value = today;
dateInput.max = today;

// ================= LOAD FROM LOCALSTORAGE =================
function loadFromLocalStorage() {
  const savedTransactions = localStorage.getItem('campusKhataTransactions');
  
  if (savedTransactions) {
    transactions = JSON.parse(savedTransactions);
  }

  const savedTheme = localStorage.getItem('campusKhataTheme');
  if (savedTheme) {
    currentTheme = savedTheme;
    applyTheme(currentTheme);
  }
}

// ================= SAVE TO LOCALSTORAGE =================
function saveToLocalStorage() {
  localStorage.setItem('campusKhataTransactions', JSON.stringify(transactions));
}

// ================= THEME FUNCTIONS =================
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i><span>Theme</span>';
  } else {
    document.body.classList.remove('dark-theme');
    themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i><span>Theme</span>';
  }
}

function toggleTheme() {
  if (currentTheme === 'light') {
    currentTheme = 'dark';
  } else {
    currentTheme = 'light';
  }
  
  localStorage.setItem('campusKhataTheme', currentTheme);
  applyTheme(currentTheme);
  
  console.log('Theme switched to:', currentTheme);
}

// Theme Button Click
themeBtn.addEventListener('click', function() {
  toggleTheme();
});

// ================= TOGGLE TYPE BUTTONS =================
toggleBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    toggleBtns.forEach(function(b) {
      b.classList.remove('active');
    });
    
    btn.classList.add('active');
    currentType = btn.getAttribute('data-type');

    updateCategoryOptions();
  });
});


function updateCategoryOptions() {
  categoryInput.innerHTML = '<option value="">Select Category</option>';

  let categoriesToUse = currentType === 'income' ? incomeCategories : expenseCategories;

  categoriesToUse.forEach(function(cat) {
    const option = document.createElement('option');
    option.value = cat.value;
    option.textContent = cat.text;
    categoryInput.appendChild(option);
  });
}


// ================= ADD TRANSACTION =================
transactionForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const amount = Number(amountInput.value);
  const category = categoryInput.value;
  const description = descriptionInput.value;
  const date = dateInput.value;
  
  const transaction = {
    id: Date.now(),
    type: currentType,
    amount: amount,
    category: category,
    description: description,
    date: date
  };
  
  transactions.push(transaction);
  saveToLocalStorage();
  applyCurrentFilter();
  updateCurrentMonthTotals();
  
  amountInput.value = '';
  categoryInput.value = '';
  descriptionInput.value = '';
  dateInput.value = today;
  
  //console.log('Transaction added:', transaction);
});

// ================= CREATE TRANSACTION ELEMENT =================
function createTransactionElement(transaction) {
  const transactionDiv = document.createElement('div');
  transactionDiv.classList.add('transaction-item');
  transactionDiv.classList.add(transaction.type);
  

  transactionDiv.innerHTML = `
    <div class="transaction-left">
      <div class="transaction-icon">
        ${transaction.type === 'expense' ? '<i class="fa-solid fa-minus"></i>' : '<i class="fa-solid fa-plus"></i>'}
      </div>
      <div class="transaction-details">
        <div class="transaction-category"> ${transaction.category}</div>
        <div class="transaction-description">${transaction.description}</div>
        <div class="transaction-date">${formatDate(transaction.date)}</div>
      </div>
    </div>
    <div class="transaction-right">
      <div class="transaction-amount">
        ${transaction.type === 'expense' ? '-' : '+'}₹${transaction.amount}
      </div>
      <div class="transaction-actions">
        <button class="action-btn delete">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `;
  
  const deleteBtn = transactionDiv.querySelector('.delete');
  deleteBtn.addEventListener('click', function() {
    deleteTransaction(transaction.id);
  });
  
  return transactionDiv;
}

// ================= DISPLAY TRANSACTIONS =================
function displayTransactions(transactionsToShow) {
  transactionsList.innerHTML = '';
  
  if (transactionsToShow.length === 0) {
    transactionsList.innerHTML = `
      <div class="empty" id="emptyState">
        <i class="fa-solid fa-receipt"></i>
        <p>No transactions found</p>
        <small>Try a different filter or add a new transaction!</small>
      </div>
    `;
    return;
  }
  
  transactionsToShow.forEach(function(transaction) {
    const transactionElement = createTransactionElement(transaction);
    transactionsList.appendChild(transactionElement);
  });
}

// ================= DELETE TRANSACTION =================
function deleteTransaction(id) {
  const confirmDelete = confirm('Are you sure you want to delete this transaction?');
  
  if (confirmDelete) {
    transactions = transactions.filter(function(transaction) {
      return transaction.id !== id;
    });
    
    saveToLocalStorage();
    applyCurrentFilter();
    updateCurrentMonthTotals();
    
  }
}

// ================= CALCULATE TOTALS =================
function updateTotals(transactionsToCalculate) {
  let totalIncome = 0;
  let totalExpense = 0;
  
  transactionsToCalculate.forEach(function(transaction) {
    if (transaction.type === 'income') {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }
  });
  
  const balance = totalIncome - totalExpense;
  
  totalIncomeEl.textContent = '₹' + totalIncome;
  totalExpenseEl.textContent = '₹' + totalExpense;
  balanceEl.textContent = '₹' + balance;
}

// ================= GET CURRENT MONTH TRANSACTIONS =================
function getCurrentMonthTransactions() {
  return transactions.filter(function(transaction) {
    const transDate = new Date(transaction.date);
    const transMonth = transDate.getMonth();
    const transYear = transDate.getFullYear();
    
    return transMonth === currentMonth && transYear === currentYear;
  });
}

// ================= UPDATE CURRENT MONTH TOTALS =================
function updateCurrentMonthTotals() {
  const monthTransactions = getCurrentMonthTransactions();
  updateTotals(monthTransactions);
}

// ================= UPDATE MONTH DISPLAY =================
function updateMonthDisplay() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  
  const monthName = months[currentMonth];
  monthDisplay.textContent = monthName + ' ' + currentYear;
}

// ================= FILTER TRANSACTIONS =================
filterBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    filterBtns.forEach(function(b) {
      b.classList.remove('active');
    });
    
    btn.classList.add('active');
    currentFilter = btn.getAttribute('data-filter');
    applyCurrentFilter();
    
   // console.log('Filter applied:', currentFilter);
  });
});

// ================= APPLY CURRENT FILTER =================
function applyCurrentFilter() {
  const monthTransactions = getCurrentMonthTransactions();
  let filteredTransactions = [];
  
  if (currentFilter === 'all') {
    filteredTransactions = monthTransactions;
  } else if (currentFilter === 'today') {
    filteredTransactions = monthTransactions.filter(function(transaction) {
      return isToday(transaction.date);
    });
  } else if (currentFilter === 'week') {
    filteredTransactions = monthTransactions.filter(function(transaction) {
      return isThisWeek(transaction.date);
    });
  }
  
  displayTransactions(filteredTransactions);
}

// ================= HELPER: IS TODAY =================
function isToday(dateString) {
  const today = new Date();
  const transDate = new Date(dateString);
  
  return (
    today.getDate() === transDate.getDate() &&
    today.getMonth() === transDate.getMonth() &&
    today.getFullYear() === transDate.getFullYear()
  );
}

// ================= HELPER: IS THIS WEEK =================
function isThisWeek(dateString) {
  const today = new Date();
  const transDate = new Date(dateString);
  
  const dayOfWeek = today.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);
  
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  
  return transDate >= monday && transDate <= sunday;
}

// ================= PREVIOUS MONTH BUTTON =================
prevMonthBtn.addEventListener('click', function() {
  currentMonth = currentMonth - 1;
  
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear = currentYear - 1;
  }
  
  updateMonthDisplay();
  applyCurrentFilter();
  updateCurrentMonthTotals();
  
  console.log('Moved to:', currentMonth + 1, currentYear);
});

// ================= NEXT MONTH BUTTON =================
nextMonthBtn.addEventListener('click', function() {
  currentMonth = currentMonth + 1;
  
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear = currentYear + 1;
  }
  
  updateMonthDisplay();
  applyCurrentFilter();
  updateCurrentMonthTotals();
  
  console.log('Moved to:', currentMonth + 1, currentYear);
});

// ================= CLEAR CURRENT MONTH =================
clearMonthBtn.addEventListener('click', function() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  const monthName = months[currentMonth];
  
  const confirmClear = confirm('Delete ALL transactions for ' + monthName + ' ' + currentYear + '?');
  
  if (confirmClear) {
    transactions = transactions.filter(function(transaction) {
      const transDate = new Date(transaction.date);
      const transMonth = transDate.getMonth();
      const transYear = transDate.getFullYear();
      
      return !(transMonth === currentMonth && transYear === currentYear);
    });
    
    saveToLocalStorage();
    applyCurrentFilter();
    updateCurrentMonthTotals();
    
    console.log('Current month transactions cleared');
  }
});

// ================= HELPER: FORMAT DATE =================
function formatDate(dateString) {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return day + ' ' + month + ' ' + year;
}


// ================= INITIALIZE APP =================
function init() {
  loadFromLocalStorage();
  updateMonthDisplay();
  applyCurrentFilter();
  updateCurrentMonthTotals();
  updateCategoryOptions();

}

init();

