lista = document.getElementById("lista");
wyszukiwarka = document.getElementById("wyszukiwarka");
wpisywanie_tekstu = document.getElementById("wpisywanie_tekstu");
wpisywanie_daty = document.getElementById("wpisywanie_daty");
zapisywanie = document.getElementById("zapisywanie");
let czy_zaznaczone_tekst = -1;
let czy_zaznaczone_data = -1;

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
    let nowy_tekst = document.createElement("div");
    nowy_tekst.className = "tekst";
    nowy_tekst.textContent = element.value;
    this.tasks[this.znajdz_indeks(element)].tekst = element.value;
    element.parentNode.replaceChild(nowy_tekst, element);
    czy_zaznaczone_tekst = -1;
  }

  odklikniecie_data(element) {
    this.tasks[this.znajdz_indeks(element)].data = element.value;
    czy_zaznaczone_data = -1;
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
  todo.add(rzecz);
  todo.draw();
})

window.addEventListener("click", function (event) {
  if (event.target.className === "data") {
    if (czy_zaznaczone_data === -1) {
      czy_zaznaczone_data = todo.znajdz_indeks(event.target);
    }
  }
  else if (event.target.className === "tekst") {
    if (czy_zaznaczone_tekst === -1) {
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
      }
    }
  }
  else {
    if (czy_zaznaczone_tekst !== -1) {
      let element = Array.from(lista.children)[czy_zaznaczone_tekst].firstChild;
      todo.odklikniecie_tekst(element);
    }
    if (czy_zaznaczone_data !== -1) {
      let element = Array.from(lista.children)[czy_zaznaczone_data].firstChild.nextSibling;
      todo.odklikniecie_data(element);
    }
  }
  todo.zapisz_do_local_storage();
}, {capture: true})
