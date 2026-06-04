console.debug("Hello world!");

przycisk_lokalizacja = document.getElementById("przycisk_lokalizacja");

let map = L.map('mapa').setView([53.430127, 14.564802], 18);
// L.tileLayer.provider('OpenStreetMap.DE').addTo(map);
L.tileLayer.provider('Esri.WorldImagery').addTo(map);
let marker = L.marker([53.430127, 14.564802]).addTo(map);
marker.bindPopup("<strong>Hello!</strong><br>This is a popup.");

document.getElementById("przycisk_zapisywanie_mapy").addEventListener("click", function() {
  leafletImage(map, function (err, canvas) {
    // here we have the canvas
    // let kafelek1 = document.getElementById("kafelek1");
    // let rasterContext = kafelek1.getContext("2d");
    // rasterContext.drawImage(canvas, 0, 0, 300, 150);

    let i = 0;
    let kolejnosc = Math.floor(Math.random() * 16);
    let kafelki = document.querySelectorAll(".kafelek")
    for (let kaf of kafelki) {
      let kaf_context = kaf.getContext("2d");
      kaf_context.drawImage(canvas, 150 * i , 75 * i, 150, 75, 0, 0, 300, 150)
      i++;
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
