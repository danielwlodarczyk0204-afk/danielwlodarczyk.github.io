lista = document.getElementById("lista");
wyszukiwarka = document.getElementById("wyszukiwarka");
usuwanie =  document.getElementById("usuwanie");
wpisywanie_tekstu = document.getElementById("wpisywanie_tekstu");
wpisywanie_daty = document.getElementById("wpisywanie_daty");
zapisywanie = document.getElementById("zapisywanie");

class Todo {
  constructor(tasks){
    this.tasks = tasks;
  }
  tasks = [];

  erase() {

  }
  draw() {
    for (let i = 0; i < this.tasks.length; i++) {
      let nowy_tekst = document.createElement("div");
      nowy_tekst.className = "tekst";
      nowy_tekst.textContent = this.tasks[i];

      let nowa_data = document.createElement("input");
      nowa_data.className = "data";
      nowa_data.type = "date";

      let nowe_usuwanie = document.createElement("input");
      nowe_usuwanie.className = "usuwanie";
      nowe_usuwanie.type = "button";

      let nowy_element = document.createElement("li");
      nowy_element.appendChild(nowy_tekst);
      nowy_element.appendChild(nowa_data);
      nowy_element.appendChild(nowe_usuwanie);
      lista.appendChild(nowy_element);
    }
  }

  add(task) {
    this.tasks.push(task);
  }
}

let todo = new Todo(["zadanie 1", "zadanie 2", "zadanie 3"]);
document.todo = todo
todo.add("zadanie 4")
todo.draw();

todo.add("zadanie 5")
todo.draw();
