let przycisk_lokalizacja = document.getElementById("przycisk_lokalizacja");
let map = L.map('mapa').setView([53.430127, 14.564802], 18);
// L.tileLayer.provider('OpenStreetMap.DE').addTo(map);
L.tileLayer.provider('Esri.WorldImagery').addTo(map);
let marker = L.marker([53.430127, 14.564802]).addTo(map);
marker.bindPopup("<strong>Hello!</strong><br>This is a popup.");

document.getElementById("przycisk_zapisywanie_mapy").addEventListener("click", function() {
  leafletImage(map, function (err, canvas) {
    let kolejnosc = [];

    for (let i = 0; i < 16; i++) {
      let wylosowana_liczba = Math.floor(Math.random() * 16);
      if (!(kolejnosc.includes(wylosowana_liczba))) {
        kolejnosc.push(wylosowana_liczba);
      }
      else {
        i--;
      }
    }

    let kafelki = document.querySelectorAll(".kafelek")

    for (let i = 0; i < 16; i++) {
      let kafelek = kafelki[kolejnosc[i]];
      kafelek.width = 150;
      kafelek.height = 100;
      let kaf_context = kafelek.getContext("2d");
      kaf_context.drawImage(canvas, 150 * (i % 4) , 100 * Math.floor(i / 4), 150, 100, 0, 0, 150, 100)
    }
    console.log(canvas.width);
    console.log(canvas.height);
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
