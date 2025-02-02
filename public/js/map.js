const map = L.map('map').setView(listing.geometry.coordinates, 10); // दिल्ली के लिए Coordinates

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; Wanderlust'
}).addTo(map);

const marker = L.marker(listing.geometry.coordinates).addTo(map) // [Latitude, Longitude]
  .bindPopup(`<b>${listing.title}</b><br>${listing.location}`) // Add a popup
  .openPopup();