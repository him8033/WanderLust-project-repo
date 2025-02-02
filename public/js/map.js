	// mapboxgl.accessToken = mapToken;
    // const map = new mapboxgl.Map({
    //     container: 'map', // container ID
    //     style: "mapbox://styles/mapbox/streets-v12",
    //     center: [-74.5, 40], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    //     zoom: 9 // starting zoom
    // });

    var map = L.map('map').setView([28.6139, 77.2090], 13); // दिल्ली के लिए Coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; Wanderlust'
    }).addTo(map);
    