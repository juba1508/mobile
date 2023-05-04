/* Vienna Sightseeing Beispiel */

// Stephansdom Objekt
let stephansdom = {
    lat: 48.208493,
    lng: 16.373118,
    title: "Stephansdom"
};

// Karte initialisieren
var map = L.map('map').fitWorld();

map.on('locationerror', function (evt) {
    alert(evt.message);
}
);

map.on('locationfound', function (evt) {
    console.log(evt)
    let radius = Math.round(evt.accuracy);
    let circle = L.circle([0,0], 0).addTo(map);
    let marker = L.marker([0,0]).addTo(map);

    marker.setLatLng(evt.latlng);
    marker.bindTooltip(`You are within ${(radius)} meters from this point`).openTooltip();

    //L.circle(evt.latlng, radius).addTo(map);
    circle.setLatLng(evt.latlng);
    circle.setRadius(radius);
}
);
map.locate({
    setView: true,
    watch: true, 
    maxZoom: 16
    });

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Hintergrundlayer
let layerControl = L.control.layers({
    "BasemapAT Grau": L.tileLayer.provider("BasemapAT.grau").addTo(map),
    "BasemapAT Standard": L.tileLayer.provider("BasemapAT.basemap"),
    "BasemapAT High-DPI": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT Gelände": L.tileLayer.provider("BasemapAT.terrain"),
    "BasemapAT Oberfläche": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT Orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "BasemapAT Beschriftung": L.tileLayer.provider("BasemapAT.overlay"),
}).addTo(map);

// Marker Stephansdom
L.marker([
    stephansdom.lat, stephansdom.lng
]).addTo(map)
.bindTooltip(stephansdom.title).openTooltip();

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map);