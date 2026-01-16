
function fetchTodos() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then(function(response) {
      return response.json();
    })
    .then(function(todos) {
      localStorage.setItem("todos", JSON.stringify(todos));
      displayTodos();
    })
    .catch(function(error) {
      console.error("Xəta baş verdi:", error);
    });
}


function displayTodos() {
  var todos = JSON.parse(localStorage.getItem("todos")) || [];
  var tbody = document.querySelector("#todoTable tbody");
  tbody.innerHTML = "";

  todos.forEach(function(todo) {
    var tr = document.createElement("tr");

   
    if (todo.completed) {
      tr.style.backgroundColor = "lightgreen";
    } else {
      tr.style.backgroundColor = "lightcoral";
    }

    tr.innerHTML =
      "<td>" + todo.id + "</td>" +
      "<td>" + todo.title + "</td>" +
      "<td>" + (todo.completed ? "Tamamlandı" : "Tamamlanmadı") + "</td>" +
      "<td><button onclick='deleteTodo(" + todo.id + ")'>Sil</button></td>";

    tbody.appendChild(tr);
  });
}

function deleteTodo(id) {
  var todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = todos.filter(function(todo) {
    return todo.id !== id;
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  displayTodos();
}


fetchTodos();
