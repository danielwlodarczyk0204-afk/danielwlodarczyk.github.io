lista = document.getElementById("lista");
wyszukiwarka = document.getElementById("wyszukiwarka");
wpisywanie_tekstu = document.getElementById("wpisywanie_tekstu");
wpisywanie_daty = document.getElementById("wpisywanie_daty");
zapisywanie = document.getElementById("zapisywanie");
let czy_zaznaczone_tekst = -1;
let czy_zaznaczone_data = -1;
let poprzedni_tekst = "---";
let poprzednia_data = "";

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
  term = "";

  filter() {
    let pasujace_indeksy = [];
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].tekst.includes(this.term)) {
        pasujace_indeksy.push(i);
      }
    }
    return pasujace_indeksy;
  }

  wczytaj_z_local_storage() {
    this.tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  zapisz_do_local_storage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

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
    this.zapisz_do_local_storage();
  }

  odklikniecie_tekst(element) {
    if (element.value.trim().length < 3) {
      alert("Błąd: tekst musi mieć co najmniej 3 znaki!");
      element.value = poprzedni_tekst;
    }
    else if (element.value.trim().length > 255) {
      alert("Błąd: tekst musi mieć co najwyżej 255 znaków!");
      element.value = poprzedni_tekst;
    }
    let nowy_tekst = document.createElement("div");
    nowy_tekst.className = "tekst";
    nowy_tekst.textContent = element.value;
    this.tasks[this.znajdz_indeks(element)].tekst = element.value;
    element.parentNode.replaceChild(nowy_tekst, element);
    czy_zaznaczone_tekst = -1;
  }

  odklikniecie_data(element) {
    if ((Date.parse(element.value) < new Date().setHours(0,0,0,0)) && (element.value !== "")) {
      alert("Błąd: data musi być pusta albo późniejsza niż aktualna!");
      element.value = poprzednia_data;
    }
    this.tasks[this.znajdz_indeks(element)].data = element.value;
    czy_zaznaczone_data = -1;
  }

  draw() {
    let pasujace_indeksy = this.filter();
    this.erase();
    for (let indeks of pasujace_indeksy) {
      let nowy_tekst = document.createElement("div");
      nowy_tekst.className = "tekst";
      nowy_tekst.textContent = this.tasks[indeks].tekst;

      let nowa_data = document.createElement("input");
      nowa_data.className = "data";
      nowa_data.type = "date";
      nowa_data.value = this.tasks[indeks].data;

      let nowe_usuwanie = document.createElement("input");
      nowe_usuwanie.className = "usuwanie";
      nowe_usuwanie.type = "button";
      nowe_usuwanie.value = "usuń";
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
    this.tasks.push(rzecz);
    this.zapisz_do_local_storage();
  }
}

let todo = new Todo();
document.todo = todo;

todo.wczytaj_z_local_storage();
todo.draw();

zapisywanie.addEventListener("click", function() {
  let rzecz = new Rzecz(wpisywanie_tekstu.value, wpisywanie_daty.value);
  if (rzecz.tekst.trim().length < 3) {
    alert("Błąd: tekst musi mieć co najmniej 3 znaki!");
  }
  else if (rzecz.tekst.trim().length > 255) {
    alert("Błąd: tekst musi mieć co najwyżej 255 znaków!");
  }
  else if ((Date.parse(rzecz.data) < new Date().setHours(0,0,0,0)) && (rzecz.data !== "")) {
    alert("Błąd: data musi być pusta albo późniejsza niż aktualna!");
  }
  else {
    todo.add(rzecz);
    todo.draw();
  }
})

window.addEventListener("click", function (event) {
  if (event.target.className === "data") {
    if (czy_zaznaczone_data === -1) {
      poprzednia_data = event.target.value;
      czy_zaznaczone_data = todo.znajdz_indeks(event.target);
    }
  }
  else if (event.target.className === "tekst") {
    if (czy_zaznaczone_tekst === -1) {
      poprzedni_tekst = event.target.textContent;
      czy_zaznaczone_tekst = todo.znajdz_indeks(event.target);
      let nowy_tekst_2 = document.createElement("input");
      nowy_tekst_2.className = "tekst";
      nowy_tekst_2.value = event.target.textContent;
      event.target.parentNode.replaceChild(nowy_tekst_2, event.target);
    }
    else {
      let element = Array.from(lista.children)[czy_zaznaczone_tekst].firstChild;
      if (event.target !== element) {
        todo.odklikniecie_tekst(element);
        czy_zaznaczone_tekst = todo.znajdz_indeks(event.target);
        let nowy_tekst_2 = document.createElement("input");
        nowy_tekst_2.className = "tekst";
        nowy_tekst_2.value = event.target.textContent;
        event.target.parentNode.replaceChild(nowy_tekst_2, event.target);
        todo.zapisz_do_local_storage();
      }
    }
  }
  else {
    if (czy_zaznaczone_tekst !== -1) {
      let element = Array.from(lista.children)[czy_zaznaczone_tekst].firstChild;
      todo.odklikniecie_tekst(element);
      todo.zapisz_do_local_storage();
    }
    if (czy_zaznaczone_data !== -1) {
      let element = Array.from(lista.children)[czy_zaznaczone_data].firstChild.nextSibling;
      todo.odklikniecie_data(element);
      todo.zapisz_do_local_storage();
    }
  }
}, {capture: true})

wyszukiwarka.addEventListener("input", function () {
  todo.term = wyszukiwarka.value;
  todo.draw();
})
