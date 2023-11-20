const myModal = new bootstrap.Modal("#transaction-modal");

let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
  transactions: [],
  saldo: 0,
};

document.getElementById("button-logout").addEventListener("click", logout);

// ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const value = parseFloat(document.getElementById("value-input").value);
  const description = document.getElementById("description-input").value;
  const date = document.getElementById("date-input").value;
  const type = document.querySelector('input[name="type-input"]:checked').value;

  if (data.saldo < value) {
    alert("O saldo disponível é insuficiente. Deseja continuar mesmo assim?");
    return false;
  }

  data.transaction.unshift({
    value: value,
    type: type,
    description: description,
    date: date,
  });

  data.saldo = 0;
  data.transactions.forEach((item) => {
    if (item.type === "1") {
      data.saldo += item.value;
    } else {
      data.saldo -= item.value;
    }
  });

  saveData(data);
  e.target.reset();
  myModal.hide();
  getTransactions();
  alert("Lançamento adicionado com sucesso.");
});

checkLogged();

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (!logged) {
    window.location.href = "index.html";
    return;
  }

  const dataUser = localStorage.getItem(logged);

  if (dataUser) {
    data = JSON.parse(dataUser);
  }

  getTransactions();
}

function logout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");

  window.location.href = "index.html";
}

function getTransactions() {
  const transactions = data.transaction;
  let transactionsHtml = ``;

  if (transactions.length) {
    transactions.forEach((item) => {
      let type = "Entrada";

      if (item.type === "2") {
        type = "Saída";
      }

      transactionsHtml += `
        <tr>
          <th scope="row">${item.date}</th>
          <td>R$ ${item.value.toFixed(2)}</td>
          <td>${type}</td>
          <td>${item.description}</td>
        </tr>
      `;
    });
  }

  document.getElementById("transactions-list").innerHTML = transactionsHtml;
}

function saveData(data) {
  localStorage.setItem(logged, JSON.stringify(data));
}
