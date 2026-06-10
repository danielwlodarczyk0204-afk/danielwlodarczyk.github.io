let kafelki = document.querySelectorAll(".kafelek");
let pola = document.querySelectorAll(".pole");
let div_kafelki = document.getElementById("kafelki");
let div_pola = document.getElementById("pola");
let czy_gra = 0;
let kolejnosc = [];
let przycisk_lokalizacja = document.getElementById("przycisk_lokalizacja");
let map = L.map('mapa').setView([53.430127, 14.564802], 18);

function sprawdz(pola) {
  for (let i = 0; i < 16; i++) {
    if (!(pola[i].dataset.poprawny_nr === pola[i].dataset.przechowywany_nr)) {
      return 0;
    }
  }
  alert("gratulacje!!!");
}

function utworz_pola() {
  for (let i = 0; i < 16; i++) {
    let pole = document.createElement("div")
    pole.className = "pole";
    pole.id = `pole${i}`;
    pole.dataset.nr = i.toString()
    div_pola.append(pole);
  }
  pola = document.querySelectorAll(".pole");
}

function utworz_kafelki() {
  for (let i = 0; i < 16; i++) {
    let kafelek = document.createElement("canvas")
    kafelek.className = "kafelek";
    kafelek.dataset.nr = i.toString();
    kafelek.id = `kafelek${i}`;
    kafelek.width = 150;
    kafelek.height = 100;
    kafelek.draggable = false;
    div_kafelki.append(kafelek);
    kafelek.addEventListener("dragstart", function(event) {
      event.dataTransfer.setData("text", this.id);
    });
    kafelki = document.querySelectorAll(".kafelek");
  }

}

function usun_kafelki() {
  div_kafelki.innerHTML = "";
}

function wyswietl_mape() {
// L.tileLayer.provider('OpenStreetMap.DE').addTo(map);
  L.tileLayer.provider('Esri.WorldImagery').addTo(map);
  let marker = L.marker([53.430127, 14.564802]).addTo(map);
  marker.bindPopup("<strong>Hello!</strong><br>This is a popup.");

  przycisk_lokalizacja.addEventListener("click", function () {
    if (!navigator.geolocation) {
      alert("Sorry, no geolocation available for you!");
    }

  navigator.geolocation.getCurrentPosition((position) => {
    document.getElementById("latitude").innerText = position.coords.latitude;
    document.getElementById("longitude").innerText = position.coords.longitude;
  }, (positionError) => {
    console.error(positionError);
  }, {
    enableHighAccuracy: false
  });
})
}

wyswietl_mape();
utworz_pola();

document.getElementById("przycisk_zapisywanie_mapy").addEventListener("click", function() {
  leafletImage(map, function (err, canvas) {
    if (czy_gra === 1) {
      usun_kafelki();
      kolejnosc = [];
    }

    czy_gra = 1;
    utworz_kafelki();

    for (let i = 0; i < 16; i++) {
      let wylosowana_liczba = Math.floor(Math.random() * 16);
      if (!(kolejnosc.includes(wylosowana_liczba))) {
        kolejnosc.push(wylosowana_liczba);
      }
      else {
        i--;
      }
    }

    for (let i = 0; i < 16; i++) {
      let kafelek = kafelki[kolejnosc[i]];
      // let pole = pola[i];
      pola[i].dataset.poprawny_nr = kolejnosc[i].toString();
      kafelek.draggable = true;
      let kaf_context = kafelek.getContext("2d");
      kaf_context.drawImage(canvas, 150 * (i % 4) , 100 * Math.floor(i / 4), 150, 100, 0, 0, 150, 100)
    }
  });
});

for (let i = 0; i < 16; i++) {
  pola[i].addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  pola[i].addEventListener("drop", function (event) {
    if (this.childElementCount === 0) {
      let myElement = document.querySelector("#" + event.dataTransfer.getData('text'));
      this.appendChild(myElement);
      this.dataset.przechowywany_nr = this.firstChild.dataset.nr;
      sprawdz(pola);
    }
  }, false);
}
