var totesIncidencies = [];

function mapPage() {
	var app;
	var mymap;
	var zoom = 15;
	var currentLocation = {
		lat: 41.5381,
		lng: 2.4447
	};

	mymap = L.map('mapid').setView([currentLocation.lat, currentLocation.lng], zoom);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: '',
		maxZoom: 30,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoiOGJlbHRyYW4iLCJhIjoiY2pyd3N2MzNqMGV0MDQ0bHhhMXBqN2s5ZyJ9.uUIekotp1Ji_-eWAvEsTFw'
	}).addTo(mymap);

	getIncidencies();

	totesIncidencies.forEach(function (el) {
		var color = "#008000";

		var circle = L.circle([el.lat, el.lng], {
			color: color,
			fillColor: color,
			fillOpacity: 0.5,
			weight: 0,
			radius: 20
		}).addTo(mymap).on("click", () => incidenceClick(el));

	});

	app = new Vue({
		el: '#app',
		data: {
			visible: false
		}
	});

	function incidenceClick(info) {
		app.visible = true;
	}
}

function listPage() {
	getIncidencies();
}

function validarPage() {
	var user;
	getUserToValidate();

	document.getElementById("denyUser").onclick = function () {
		$.ajax({
			url: "http://localhost:3000/api/users/"+user._id,
			type: 'DELETE'
		});

		getUserToValidate();
	}

	document.getElementById("acceptUser").onclick = function () {
		user.validated = true;
		$.ajax({
			url: 'http://localhost:3000/api/users',
			type: 'PUT',
			data: {user},
			success: function (data) {
				alert('Load was performed.');
			}
		});

		getUserToValidate();
	}

	function getUserToValidate() {
		fetch('http://localhost:3000/api/users').then(response => {
			return response.json();
		}).then(data => {
			user = data[0];
			document.getElementById("image1").src = user.dni;
			document.getElementById("image1").src = user.foto;
		});
		
		return user;
	}
}

function getIncidencies() {
	fetch('http://localhost:3000/api/incidents').then(response => {
		return response.json();
	}).then(data => {
		// Work with JSON data here
		totesIncidencies = data;
	})
}




