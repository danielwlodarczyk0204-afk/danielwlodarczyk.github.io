lista = document.getElementById("lista");
wyszukiwarka = document.getElementById("wyszukiwarka");
wpisywanie_tekstu = document.getElementById("wpisywanie_tekstu");
wpisywanie_daty = document.getElementById("wpisywanie_daty");
zapisywanie = document.getElementById("zapisywanie");
let czy_zaznaczone_tekst = -1;
let czy_zaznaczone_data = -1;
let poprzedni_tekst = "---";
let poprzednia_data = "";

// ---------------------------------------------

class Rzecz {
  tekst;
  data;
  constructor(tekst, data) {
    this.tekst = tekst;
    this.data = data;
  }
}

// ---------------------------------------------

class Todo {
  tasks = [];
  term = "";

  filter() {
    let pasujace_indeksy = [];
    if (this.term.length < 2) {
      for (let i = 0; i < this.tasks.length; i++) {
        pasujace_indeksy.push(i);
      }
    }
    else {
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].tekst.includes(this.term)) {
          pasujace_indeksy.push(i);
        }
      }
    }
    return pasujace_indeksy;
  }

  wczytaj_z_local_storage() {
    if (localStorage.getItem("tasks") === null) {
      this.tasks = [];
    }
    else {
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
    }
  }

  zapisz_do_local_storage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  znajdz_indeks_listy(elem_listy) {
    return Array.from(lista.children).indexOf(elem_listy.parentElement);
  }

  indeks_listy_na_indeks_tablicy(indeks_listy) {
    let pasujace_indeksy = this.filter();
    return pasujace_indeksy[indeks_listy];
  }

  indeks_tablicy_na_element_listy(indeks_tablicy) {
    let pasujace_indeksy = this.filter();
    let indeks = 0;
    for (let i = 0; i < pasujace_indeksy.length; i++) {
      if (pasujace_indeksy[i] === indeks_tablicy) {
        indeks = i;
        break;
      }
    }
    return indeks;
  }

  erase() {
    while (lista.firstChild) {
      lista.removeChild(lista.firstChild);
    }
  }

  delete(elem_listy_usuwanie) {
    let indeks_listy = this.znajdz_indeks_listy(elem_listy_usuwanie);
    let indeks_tablicy = this.indeks_listy_na_indeks_tablicy(indeks_listy);
    this.tasks.splice(indeks_tablicy, 1);
    this.zapisz_do_local_storage();
  }

  odklikniecie_tekst(elem_listy_tekst) {
    if (elem_listy_tekst.value.trim().length < 3) {
      alert("Błąd: tekst musi mieć co najmniej 3 znaki!");
      elem_listy_tekst.value = poprzedni_tekst;
    }
    else if (elem_listy_tekst.value.trim().length > 255) {
      alert("Błąd: tekst musi mieć co najwyżej 255 znaków!");
      elem_listy_tekst.value = poprzedni_tekst;
    }
    let nowy_tekst = document.createElement("div");
    nowy_tekst.className = "tekst";
    nowy_tekst.textContent = elem_listy_tekst.value;
    let indeks_listy = this.znajdz_indeks_listy(elem_listy_tekst);
    let indeks_tablicy = this.indeks_listy_na_indeks_tablicy(indeks_listy);
    this.tasks[indeks_tablicy].tekst = elem_listy_tekst.value;
    elem_listy_tekst.parentNode.replaceChild(nowy_tekst, elem_listy_tekst);
    czy_zaznaczone_tekst = -1;
  }

  odklikniecie_data(elem_listy_data) {
    if ((Date.parse(elem_listy_data.value) < new Date().setHours(0,0,0,0)) && (elem_listy_data.value !== "")) {
      alert("Błąd: data musi być pusta albo późniejsza niż aktualna!");
      elem_listy_data.value = poprzednia_data;
    }
    let indeks_listy = this.znajdz_indeks_listy(elem_listy_data);
    let indeks_tablicy = this.indeks_listy_na_indeks_tablicy(indeks_listy);
    this.tasks[indeks_tablicy].data = elem_listy_data.value;
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

// ---------------------------------------------

let todo = new Todo();
document.todo = todo;

todo.wczytaj_z_local_storage();
todo.draw();

// ---------------------------------------------

wyszukiwarka.addEventListener("input", function () {
  todo.term = wyszukiwarka.value;
  todo.draw();
})

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
      let indeks_listy = todo.znajdz_indeks_listy(event.target);
      czy_zaznaczone_data = todo.indeks_listy_na_indeks_tablicy(indeks_listy);
    }
  }
  else if (event.target.className === "tekst") {
    if (czy_zaznaczone_tekst === -1) {
      poprzedni_tekst = event.target.textContent;
      let indeks_listy = todo.znajdz_indeks_listy(event.target)
      czy_zaznaczone_tekst = todo.indeks_listy_na_indeks_tablicy(indeks_listy);
      let nowy_tekst_2 = document.createElement("input");
      nowy_tekst_2.className = "tekst";
      nowy_tekst_2.value = event.target.textContent;
      event.target.parentNode.replaceChild(nowy_tekst_2, event.target);
    }
    else {
      let indeks_listy = todo.znajdz_indeks_listy(event.target)
      let elem_listy_tekst = Array.from(lista.children)[indeks_listy].firstChild;
      if (event.target !== elem_listy_tekst) {
        todo.odklikniecie_tekst(elem_listy_tekst);
        let indeks_listy = todo.znajdz_indeks_listy(event.target)
        czy_zaznaczone_tekst = todo.indeks_listy_na_indeks_tablicy(indeks_listy);
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
      let indeks_listy = todo.indeks_tablicy_na_element_listy(czy_zaznaczone_tekst);
      let elem_listy_tekst = Array.from(lista.children)[indeks_listy].firstChild;
      todo.odklikniecie_tekst(elem_listy_tekst);
      todo.zapisz_do_local_storage();
    }
    if (czy_zaznaczone_data !== -1) {
      let indeks_listy = todo.indeks_tablicy_na_element_listy(czy_zaznaczone_data);
      let elem_listy_data = Array.from(lista.children)[indeks_listy].firstChild.nextSibling;
      todo.odklikniecie_data(elem_listy_data);
      todo.zapisz_do_local_storage();
    }
  }
}, {capture: true})
