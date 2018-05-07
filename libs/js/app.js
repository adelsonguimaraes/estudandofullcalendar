function getDefaultView() {
	return (window.innerWidth < 514) ? "listWeek" : "month"; 
}

function myEvents () {
	let events = [
		{
			"id": 1,
			"title": "Trocar roteador SEMP",
			"start": '2018-05-08T08:00:00',
			color: "red"
		},
		{
			"id": 2,
			"title": 'Reunião de Planejamento',
			"descricao": "Reunião para re-planejar metodos de agilidade da Equipe de desenvolvimento",
			"start": '2018-05-09T16:00:00',
			color: "rgb(239, 200, 43)",
			textColor: "rgb(0, 0, 0)",
			equipe: [
				"Nilton Caldas",
				"Dayane Felix",
				"Adelson Guimarães"
			]
		},
		{
			"id": 3,
			"title": 'Instalação Honda',
			"start": '2018-05-14T08:00:00',
			"start": '2018-05-14T12:00:00',
			color: "rgb(34, 73, 137)",
			// textColor: "rgb(0, 0, 0)"
		}
	];
	return events;
}

document.addEventListener("DOMContentLoaded", () => {
	$('#calendar').fullCalendar({
		windowResize: function(view) {
			$('#calendar').fullCalendar('changeView', getDefaultView());
			$('#calendar').fullCalendar("rerenderEvents");
		},
		defaultView: getDefaultView(),
		header: {
	        left: 'prev,next today',
	        center: 'title',
	        right: 'month,agendaWeek,agendaDay,listWeek'
    	},
    	titleFormat: 'MMMM YYYY',
    	height: 'parent',
		events: myEvents(),
		navLinks: true, // can click day/week names to navigate views
		editable: true,
		eventLimit: true,
		buttonText: {
		  // today:    'today',
		  // month:    'month',
		  // week:     'week',
		  // day:      'day',
		  list:     'Lista'
		},
		eventClick: function (date, jsEvent, view) {
			setDataEventModal(date.id);
		}
	});
}, false);


function getEvent (id) {
	let events = myEvents();
	event = null;
	for (var i in events) {
		if (events[i].id === id) {
			event = events[i];
		}
	}
	return event;
}

function listaEquipe (equipe) {
	var s = "";
	for (var i in equipe) {
		s += equipe[i] + ", ";
	}
	if (s.length >= 0) s = s.substr(0, s.lastIndexOf(","));
	return s;
}

function setDataEventModal (id) {
	event = getEvent(id);
	if (event === null) return false;

	var dataEvent = document.getElementById('dataevent');
	var modal = document.getElementById('modal');
	dataEvent.innerHTML = `
		<p>
			<b>Evento:</b> ${event.title}<br>
			<b>Descrição:</b> ${event.descricao}<br>
			<b>Data:</b> ${moment(event.start).format('DD-MM-YYYY')}<br>
			<b>Equipe:</b> ${listaEquipe(event.equipe)}
		<p>
	`;
	modal.style.display = "block";

	modal.addEventListener('click', (e) => {
		if (e.target.id === "modal") {
			modal.style.display = 'none';
		}
	});
}

