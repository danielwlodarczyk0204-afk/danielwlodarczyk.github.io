lista = document.getElementById("lista");
wyszukiwarka = document.getElementById("wyszukiwarka");
wpisywanie_tekstu = document.getElementById("wpisywanie_tekstu");
wpisywanie_daty = document.getElementById("wpisywanie_daty");
zapisywanie = document.getElementById("zapisywanie");


class Todo {
  constructor(tasks){
    this.tasks = tasks;
  }
  tasks = [];

  erase() {
    while (lista.firstChild) {
      lista.removeChild(lista.firstChild);
    }
  }

  delete(div_usuwanie) {
    let task = div_usuwanie.parentElement;
    let index = Array.from(lista.children).indexOf(task);
    this.tasks.splice(index, 1);
  }

  draw() {
    this.erase();
    for (let i = 0; i < this.tasks.length; i++) {
      lista.appendChild(this.tasks[i]);
    }
  }

  add(tekst, data) {
    let nowy_tekst = document.createElement("div");
    nowy_tekst.className = "tekst";
    nowy_tekst.textContent = tekst;

    let nowa_data = document.createElement("input");
    nowa_data.className = "data";
    nowa_data.type = "date";
    nowa_data.value = data

    let nowe_usuwanie = document.createElement("input");
    nowe_usuwanie.className = "usuwanie";
    nowe_usuwanie.type = "button";
    let tym = this

    nowe_usuwanie.addEventListener("click", function() {
      tym.delete(nowe_usuwanie)
      tym.draw()
    })

    let nowy_element = document.createElement("li");
    nowy_element.appendChild(nowy_tekst);
    nowy_element.appendChild(nowa_data);
    nowy_element.appendChild(nowe_usuwanie);
    this.tasks.push(nowy_element)
  }
}

let todo = new Todo([]);
document.todo = todo;

zapisywanie.addEventListener("click", function() {
  todo.add(wpisywanie_tekstu.value, wpisywanie_daty.value);
  todo.draw();
})
