lista = document.getElementById("lista");
wyszukiwarka = document.getElementById("wyszukiwarka");
wpisywanie_tekstu = document.getElementById("wpisywanie_tekstu");
wpisywanie_daty = document.getElementById("wpisywanie_daty");
zapisywanie = document.getElementById("zapisywanie");
let czy_zaznaczone = -1;

class Rzecz {
  tekst;
  data;
  constructor(tekst, data) {
    this.tekst = tekst;
    this.data = data;
  }
}
class Todo {
  tasks = [];

  znajdz_indeks(element) {
    return Array.from(lista.children).indexOf(element.parentElement);
  }

  erase() {
    while (lista.firstChild) {
      lista.removeChild(lista.firstChild);
    }
  }

  delete(div_usuwanie) {
    this.tasks.splice(this.znajdz_indeks(div_usuwanie), 1);
  }

  odklikniecie(element) {
    let nowy_tekst = document.createElement("div");
    nowy_tekst.className = "tekst";
    nowy_tekst.textContent = element.value;
    this.tasks[this.znajdz_indeks(element)].tekst = element.value;
    element.parentNode.replaceChild(nowy_tekst, element);
    czy_zaznaczone = -1;
  }

  draw() {
    this.erase();
    for (let i = 0; i < this.tasks.length; i++) {
      let nowy_tekst = document.createElement("div");
      nowy_tekst.className = "tekst";
      nowy_tekst.textContent = this.tasks[i].tekst;

      let nowa_data = document.createElement("input");
      nowa_data.className = "data";
      nowa_data.type = "date";
      nowa_data.value = this.tasks[i].data;

      let nowe_usuwanie = document.createElement("input");
      nowe_usuwanie.className = "usuwanie";
      nowe_usuwanie.type = "button";
      let tym = this;

      nowe_usuwanie.addEventListener("click", function() {
        tym.delete(nowe_usuwanie);
        tym.draw();
      })

      let nowy_element = document.createElement("li");
      nowy_element.appendChild(nowy_tekst);
      nowy_element.appendChild(nowa_data);
      nowy_element.appendChild(nowe_usuwanie);

      lista.appendChild(nowy_element);
    }
  }

  add(rzecz) {
    this.tasks.push(rzecz)
  }
}

let todo = new Todo();
document.todo = todo;

let rzecz1 = new Rzecz("teskt1", "2022-04-25");
let rzecz2 = new Rzecz("teskt2", "2023-05-25");
let rzecz3 = new Rzecz("teskt3", "2024-06-26");
let rzecz4 = new Rzecz("teskt4", "2025-07-27");
let rzecz5 = new Rzecz("teskt5", "2026-08-28");
todo.add(rzecz1);
todo.add(rzecz2);
todo.add(rzecz3);
todo.add(rzecz4);
todo.add(rzecz5);

todo.draw();
zapisywanie.addEventListener("click", function() {
  let rzecz = new Rzecz(wpisywanie_tekstu.value, wpisywanie_daty.value);
  todo.add(rzecz);
  todo.draw();
})

window.addEventListener("click", function (event) {
  if (event.target.className === "tekst") {
    if (czy_zaznaczone === -1) {
      czy_zaznaczone = todo.znajdz_indeks(event.target);
      let nowy_tekst_2 = document.createElement("input");
      nowy_tekst_2.className = "tekst";
      nowy_tekst_2.value = event.target.textContent;
      event.target.parentNode.replaceChild(nowy_tekst_2, event.target);
    }
    else {
      let element = Array.from(lista.children)[czy_zaznaczone].firstChild;
      if (event.target !== element) {
        todo.odklikniecie(element);
        czy_zaznaczone = todo.znajdz_indeks(event.target);
        let nowy_tekst_2 = document.createElement("input");
        nowy_tekst_2.className = "tekst";
        nowy_tekst_2.value = event.target.textContent;
        event.target.parentNode.replaceChild(nowy_tekst_2, event.target);
      }
    }
  }
  else {
    if (czy_zaznaczone !== -1) {
      let element = Array.from(lista.children)[czy_zaznaczone].firstChild;
      todo.odklikniecie(element);
    }
  }
}, {capture: true})
