// function sprawdz(kafelki, pola) {
//   for (let i = 0; i < 16; i++) {
//     kafelki.dataTransfer.getData('text');
//
//   }
// }

let div_kafelki = document.getElementById("kafelki")
let div_pola = document.getElementById("pola")

for (let i = 0; i < 16; i++) {
  let kafelek = document.createElement("canvas")
  kafelek.className = "kafelek";
  kafelek.id = `kafelek${i}`;
  kafelek.width = 150;
  kafelek.height = 100;
  kafelek.draggable = false;
  div_kafelki.append(kafelek);
}

for (let i = 0; i < 16; i++) {
  let pole = document.createElement("div")
  pole.className = "pole";
  pole.id = `pole${i}`;
  div_pola.append(pole);
}

let kafelki = document.querySelectorAll(".kafelek");
let pola = document.querySelectorAll(".pole");

let przycisk_lokalizacja = document.getElementById("przycisk_lokalizacja");
let map = L.map('mapa').setView([53.430127, 14.564802], 18);
// L.tileLayer.provider('OpenStreetMap.DE').addTo(map);
L.tileLayer.provider('Esri.WorldImagery').addTo(map);
let marker = L.marker([53.430127, 14.564802]).addTo(map);
marker.bindPopup("<strong>Hello!</strong><br>This is a popup.");

let kolejnosc = [];

document.getElementById("przycisk_zapisywanie_mapy").addEventListener("click", function() {
  leafletImage(map, function (err, canvas) {
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
      kafelek.draggable = true;
      let kaf_context = kafelek.getContext("2d");
      kaf_context.drawImage(canvas, 150 * (i % 4) , 100 * Math.floor(i / 4), 150, 100, 0, 0, 150, 100)
    }
  });
});

przycisk_lokalizacja.addEventListener("click", function (){
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

for (let kafelek of kafelki) {
  kafelek.addEventListener("dragstart", function(event) {
    // this.style.border = "2px dashed #D8D8FF";
    event.dataTransfer.setData("text", this.id);
  });

  kafelek.addEventListener("dragend", function(event) {
    this.style.borderWidth = "0";
  });
}

let liczba_prawidlowych = 0;
for (let i = 0; i < 16; i++) {
  pola[i].addEventListener("dragenter", function (event) {
    // this.style.border = "2px solid #7FE9D9";
  });
  pola[i].addEventListener("dragleave", function (event) {
    // this.style.border = "2px dashed #7f7fe9";
  });
  pola[i].addEventListener("dragover", function (event) {
    event.preventDefault();
  });
  pola[i].addEventListener("drop", function (event) {
    if (this.childElementCount === 0) {
      let dane = event.dataTransfer.getData('text')
      let myElement = document.querySelector("#" + event.dataTransfer.getData('text'));
      this.appendChild(myElement);
      this.style.border = "0px";
      if (dane.includes(kolejnosc[i])) {
        liczba_prawidlowych++;
      }
    }

    // if (this.childElementCount === 1) {
    //   let myElement = document.querySelector("#" + event.dataTransfer.getData('text'));
    //   let tym = myElement.dataTransfer.getData('text');
    //   myElement.dataTransfer.setData('string', this.dataTransfer.getData('text'))
    //
    //   this.appendChild(myElement);
    //   this.style.border = "2px dashed #7f7fe9";
    // }

  }, false);
}
