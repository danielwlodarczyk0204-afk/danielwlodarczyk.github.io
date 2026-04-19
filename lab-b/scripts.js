lista = document.getElementById("lista");
wyszukiwarka = document.getElementById("wyszukiwarka");
usuwanie =  document.getElementById("usuwanie");
wpisywanie_tekstu = document.getElementById("wpisywanie_tekstu");
wpisywanie_daty = document.getElementById("wpisywanie_daty");
zapisywanie = document.getElementById("zapisywanie");

l_pozycji = 0


zapisywanie.addEventListener("click", function() {
  l_pozycji++;
  let nowy_tekst = document.createElement("div");
  nowy_tekst.className = "tekst";
  // nowy_tekst.id = "tekst" + {l_pozycji};
  nowy_tekst.textContent = wpisywanie_tekstu.value;

  let nowa_data = document.createElement("input");
  nowa_data.className = "data";
  // nowa_data.id = "data" + {l_pozycji};
  nowa_data.type = "date";

  let nowe_usuwanie = document.createElement("input");
  nowe_usuwanie.className = "usuwanie";
  // nowe_usuwanie.id = "usuwanie" + {l_pozycji};
  nowe_usuwanie.type = "button";

  let nowy_element = document.createElement("li");
  nowy_element.appendChild(nowy_tekst);
  nowy_element.appendChild(nowa_data);
  nowy_element.appendChild(nowe_usuwanie);
  lista.appendChild(nowy_element);


})

usuwanie.addEventListener("click", function() {
  this.parentElement.removeChild(this.parentElement);
})
