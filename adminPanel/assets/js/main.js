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

	getIncidencies(pintar);

	function pintar(){
		totesIncidencies.incidents.forEach(function (el) {
			var color = "purple";
	
			var circle = L.circle([el.latitude, el.longitude], {
				color: color,
				fillColor: color,
				fillOpacity: 0.5,
				weight: 0,
				radius: 20
			}).addTo(mymap).on("click", () => incidenceClick(el));	
		});		
	}	

	app = new Vue({
		el: '#app',
		data: {
			visible: false,
			incident:null
		}
	});

	function incidenceClick(info) {
		app.visible = true;
		app.incident = info;
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
			url: "http://localhost:3000/api/users/" + user._id,
			type: 'DELETE',
			success: function (data) {
				getUserToValidate();
			}
		});
	}

	document.getElementById("acceptUser").onclick = function () {
		user.validated = true;
		$.ajax({
			url: 'http://localhost:3000/api/users/' + user._id,
			type: 'PUT',
			data: user,
			success: function (data) {
				getUserToValidate();
			}
		});

		
	}

	function getUserToValidate() {
		fetch('http://localhost:3000/api/usersNotValidated').then(response => {
			return response.json();
		}).then(data => {
			console.log(data);
			user = data.users[0];
			//Quan han validat a tothom, posar un tick o algo
			if (!user) {
				document.getElementById("image1").src = "";
			document.getElementById("image2").src = "";
			};
			document.getElementById("image1").src = user.dni;
			document.getElementById("image2").src = user.photo;
		});
		
		return user;
	}
}

function getIncidencies(callback) {
	$.get("http://localhost:3000/api/incidents", function(data){
		console.log(data);
		totesIncidencies = data;
		callback();
	  });
}





