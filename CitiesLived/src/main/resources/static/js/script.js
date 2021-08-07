window.addEventListener('load', function(e) {
	console.log('script.js loaded');
	run();
});


function run() {	
	loadCitiesLived();
	document.newCityForm.newCityBtn
	.addEventListener('click', function(event) {
		event.preventDefault();
		let cfm = document.newCityForm;
		let newCity = {
			name : cfm.name.value,
			address : cfm.address.value,
			state : cfm.state.value,
			postalCode : cfm.postalCode.value,
			country : cfm.country.value
		};
		addNewCity(newCity);
	});
}

function getCityById(cityId) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `api/cities/${cityId}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var city = JSON.parse(xhr.responseText);
			} else {
				let getCityByIdDiv = getElementById('getCityByIdDiv');
				getCityByIdDiv.textContent = 'City not found';
			}
		}
	}
}

function loadCitiesLived() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/cities');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let citiesLived = JSON.parse(xhr.responseText);
				displayCitiesLived(citiesLived);
			}
		}
	};
	xhr.send();
}

function displayCitiesLived(citiesLived) {
	let table = document.getElementById('citiesListTable');
	let tr = document.createElement('tr');
	let th = document.createElement('th');
	table.appendChild(tr);
	tr.appendChild(th);
	th.textContent = 'City'
	th = document.createElement('th');
	th.textContent = 'State'
	tr.appendChild(th)
	for (const city of citiesLived) {
		let td = document.createElement('td');
		let btn = document.createElement('button');
		tr = document.createElement('tr');
		table.appendChild(tr);
		tr.appendChild(td);
		td.textContent = city.name;
		td = document.createElement('td');
		tr.appendChild(td);
		td.textContent = city.state;
	}
}

function addNewCity(city) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/cities');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 201) {
				loadCitiesLived();
				location.reload();
			} else {
			let newCityh2 = document.createElement('h2');
			document.body.appendChild(newCityh2);
			newCityh2.textContent = 'Could not add the new city';
		}
	  }
	};
	xhr.setRequestHeader("Content-type", "application/json");
	let cityJson = JSON.stringify(city);
	xhr.send(cityJson);
}
// TODO: COMPLETE LOGIC 
function updateCity(city) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/cities');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {

			location.reload();
		} else {
			let newCityh2 = document.createElement('h2');
			document.body.appendChild(newCityh2);
			newCityh2.textContent = 'Could not update the city';
		}
	  }
	};
	xhr.send();
}
// TODO: COMPLETE LOGIC
function deleteCity(cityId) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', `api/cities/${cityId}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 204) {
			loadCitiesLived();
			location.reload();
		} else {
			let newCityh2 = document.createElement('h2');
			document.body.appendChild(newCityh2);
			newCityh2.textContent = `Could not delete city with id ${cityId}`;
		}
	  }
	};
	xhr.send();
}

// TODO: COMPLETE LOGIC
function displayAllDetails() {
	let table = document.getElementById('citiesListTable');
	let tr = document.createElement('tr');
	let th = document.createElement('th');
	table.appendChild(tr);
	tr.appendChild(th);
	th.textContent = 'City'
	th = document.createElement('th');
	th.textContent = 'State'
	tr.appendChild(th)
	for (const city of citiesLived) {
		let td = document.createElement('td');
		let btn = document.createElement('button');
		tr = document.createElement('tr');
		table.appendChild(tr);
		tr.appendChild(td);
		td.textContent = city.name;
		td = document.createElement('td');
		tr.appendChild(td);
		td.textContent = city.state;
	}
}