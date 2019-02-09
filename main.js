var currentPos = {
	latitude: 41.5381,
	longitude: 2.4447
}

var mymap;
var positionTraker = null;
var geoTraker = null;
var zoom = 17;

var eventPositionMarker = null;

window.onload = function () {
	mymap = L.map('mapid');
	if ("geolocation" in navigator) {
		// check if geolocation is supported/enabled on current browser
		navigator.geolocation.getCurrentPosition(
			function success(position) {
				currentPos.latitude = position.coords.latitude;
				currentPos.longitude = position.coords.longitude;

				setInitInfo();
			});

			geoTraker = navigator.geolocation.watchPosition(followRealLocation);
			
	}

	setInitInfo();

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: '',
		maxZoom: 30,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoiOGJlbHRyYW4iLCJhIjoiY2pyd3N2MzNqMGV0MDQ0bHhhMXBqN2s5ZyJ9.uUIekotp1Ji_-eWAvEsTFw'
	}).addTo(mymap);

	mymap.on('click', onMapClick);
}

function setInitInfo() {
	mymap.setView([currentPos.latitude, currentPos.longitude], zoom);
	//positionTraker.bindPopup("<b>You are here</p>").openPopup();

	positionTraker = L.circle([currentPos.latitude, currentPos.longitude], {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5,
		radius: 5,
		stroke: false,
		weight: 0
	}).addTo(mymap);
}

function onMapClick(e) {
	if (eventPositionMarker != null) mymap.removeLayer(eventPositionMarker);
	eventPositionMarker = L.marker(e.latlng, { draggable: true }).addTo(mymap);
}

function followRealLocation() {
	navigator.geolocation.getCurrentPosition(
		function success(position) {
			currentPos.latitude = position.coords.latitude;
			currentPos.longitude = position.coords.longitude;

			if (positionTraker != null) mymap.removeLayer(positionTraker);
			positionTraker = L.circle([currentPos.latitude, currentPos.longitude], {
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.5,
				radius: 5,
				stroke: false,
				weight: 0
			}).addTo(mymap);
		});
}



