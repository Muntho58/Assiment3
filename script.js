let transactions = [];
let idCounter = 1;

function addTransaction() {
  const name = document.getElementById("itemName").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;

  if (name && amount) {
    const transaction = {
      id: idCounter++,
      type,
      name,
      category,
      amount
    };
    transactions.push(transaction);
    renderTable();
    updateSummary();

    // เคลียร์ input
    document.getElementById("itemName").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("type").selectedIndex = 0;
    document.getElementById("category").selectedIndex = 0;
  } else {
    alert("กรุณากรอกชื่อรายการและจำนวนเงิน");
  }
}

function renderTable() {
  const tbody = document.querySelector("#transactionTable tbody");
  tbody.innerHTML = "";

  const searchValue = document.getElementById("searchInput").value.toLowerCase();

  transactions
    .filter(t => t.name.toLowerCase().includes(searchValue))
    .forEach(t => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${t.id}</td>
        <td>${t.type}</td>
        <td>${t.name}</td>
        <td>${t.category}</td>
        <td>${t.amount.toFixed(2)} บาท</td>
      `;
      tbody.appendChild(row);
    });
}

function updateSummary() {
  let income = 0, expense = 0;
  transactions.forEach(t => {
    if (t.type === "รายรับ") {
      income += t.amount;
    } else {
      expense += t.amount;
    }
  });
  const balance = income - expense;
  document.getElementById("incomeBox").textContent = `รายรับรวม: ฿${income.toFixed(2)}`;
  document.getElementById("expenseBox").textContent = `รายจ่ายรวม: ฿${expense.toFixed(2)}`;
  document.getElementById("balanceBox").textContent = `คงเหลือสุทธิ: ฿${balance.toFixed(2)}`;
}

document.getElementById("searchInput").addEventListener("input", renderTable);

document.getElementById("clearBtn").addEventListener("click", () => {
  if (confirm("คุณแน่ใจหรือไม่ว่าต้องการล้างข้อมูลทั้งหมด?")) {
    transactions = [];
    idCounter = 1;
    renderTable();
    updateSummary();
  }
});
