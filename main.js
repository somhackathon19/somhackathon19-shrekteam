
var events = [
	{
		name:"Asalto Pirata",
		latitude: 41.528779,
		longitude: 2.434790
	},
	{
		name:"Recolecta de Menjar",
		latitude: 41.528618,
		longitude: 2.433766
	},
	{
		name:"Hackathon",
		latitude: 41.530139, 
		longitude: 2.433833
	}
]

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

		//geoTraker = navigator.geolocation.watchPosition(followRealLocation);
		setInterval(followRealLocationDos,100);
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
	writeAllEvents();
}

function onMapClick(e) {
	if (eventPositionMarker != null) mymap.removeLayer(eventPositionMarker);
	eventPositionMarker = L.circle(e.latlng, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5,
		radius: 10,
		stroke: false,
		weight: 0
	}).addTo(mymap);
}

function followRealLocation() {
	if (positionTraker) mymap.removeLayer(positionTraker);

	positionTraker = L.marker([currentPos.latitude, currentPos.longitude], { draggable: true }).addTo(mymap);

	spiderman();
}

function followRealLocationDos() {
	if (positionTraker) mymap.removeLayer(positionTraker);
	var plusOrMinusx = Math.random() < 0.5 ? -1 : 1;
	var plusOrMinusy = Math.random() < 0.5 ? -1 : 1;

	currentPos.latitude += Math.random()*plusOrMinusx*0.0003;
	currentPos.longitude += Math.random()*plusOrMinusy*0.0003;

	positionTraker = L.marker([currentPos.latitude, currentPos.longitude], { draggable: true }).addTo(mymap);

	spiderman();
}

function getDistance(origin, destination) {
	// return distance in meters
	var lon1 = toRadian(origin[1]),
		lat1 = toRadian(origin[0]),
		lon2 = toRadian(destination[1]),
		lat2 = toRadian(destination[0]);

	var deltaLat = lat2 - lat1;
	var deltaLon = lon2 - lon1;

	var a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
	var c = 2 * Math.asin(Math.sqrt(a));
	var EARTH_RADIUS = 6371;
	return c * EARTH_RADIUS * 1000;
}

function toRadian(degree) {
	return degree * Math.PI / 180;
}

function writeAllEvents(){
	/*events.forEach(function(el){
		var event = L.circle([el.latitude, el.longitude], {
			fillColor: '#10aded',
			fillOpacity: 1,
			radius: 10,
			stroke: false,
			weight: 0
		}).addTo(mymap);

		//event.bindPopup("<b>"+ el.name +"</b>");
	});*/

	for(var i = 0; i < 100; i++){
		var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

		var newEvent = {
			latitude: currentPos.latitude + Math.random() * i * 0.001 * plusOrMinus,
			longitude: currentPos.longitude + Math.random() * i * 0.001 * plusOrMinus
		}

		events.push(newEvent);

		var event = L.circle([ newEvent.latitude, newEvent.longitude], {
			fillColor: '#10aded',
			fillOpacity: 1,
			radius: 10,
			stroke: false,
			weight: 0
		}).addTo(mymap);
	}
}

var spidermans = [];

function spiderman(){
	spidermans.forEach(function(el){
		mymap.removeLayer(el);
	});

	events.forEach(function(el){
		var ourPos = [currentPos.latitude,currentPos.longitude];
		var elPos = [el.latitude,el.longitude];
		var distance = getDistance(ourPos,elPos);

		if(distance < 250){
			var polygon = L.polygon([
				ourPos,
				elPos,
			],{
				color:"#10aded",
				opacity:0.5,
				weight:2
			}).addTo(mymap);

			spidermans.push(polygon);

		}
	});
}
