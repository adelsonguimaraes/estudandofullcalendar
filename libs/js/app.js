function getDefaultView() {
	return (window.innerWidth < 514) ? "listMonth" : "month"; 
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
			// left: 'prev,next today',
			left: 'today',
	        center: 'title',
	        right: 'month,agendaWeek,agendaDay,listWeek'
    	},
    	titleFormat: 'DD MMMM YYYY',
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
	dragCalendar();
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
			<b>Data:</b> ${moment(event.start).format('DD MMMM YYYY')}<br>
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

function dragCalendar () {
	let cal = document.getElementById('calendar');
	cal = cal.children[1];
	let clicked = false;
	let position = 0;
	let touch = false;
	let brushes = []; // pinturas da tela
	let timeini = null;

	// keybord event
	document.addEventListener("keyup", (e) => {
		// esquerda
		if (e.keyCode === 37) {
			$('#calendar').fullCalendar('prev');
		// direita
		}else if (e.keyCode === 39) {
			$('#calendar').fullCalendar('next');
		}
	});
	// cal.addEventListener("mouseup", (e) => {
	// 	if ( clicked && !touch ) {
	// 		// moveu para esquerda
	// 		if (e.clientX < position) {
	// 			if ((position - e.clientX) > 200) $('#calendar').fullCalendar('next');
	// 		// moveu para direita
	// 		}else{
	// 			if ((e.clientX - position) > 200) $('#calendar').fullCalendar('prev');
	// 		}
	// 	}
	// 	clicked = false;
	// 	position = 0;
	// });
	// cal.addEventListener("mousemove", (e) => {
	// 	// se manter pressionado por mais de 1,5 segundos break
	// 	if (clicked && !touch) {
	// 		// if(moment().diff(timeini, "seconds", true) > 1) return false;
	// 		let brush = document.createElement("span");
	// 		brush.classList.add("dragPaint");
	// 		brush.style.left = `${e.clientX}px`;
	// 		brush.style.top = `${e.clientY}px`;
	// 		brush.style.position = "absolute";
	// 		brush.style.zIndex = 1300;
	// 		if (brushes.length <=15) {
	// 			brushes.push(brush);
	// 			document.body.appendChild(brush);
	// 		}
	// 	}else{
	// 		for (var i in brushes) {
	// 			brushes[i].remove();
	// 		}
	// 		brushes = [];
	// 	}
	// });

	//touch event
	cal.addEventListener("touchstart", (e) => {
		touch = true;
		clicked = true;
		position = e.changedTouches[0].clientX;
		timeini = moment();
	});
	
	cal.addEventListener("touchend", (e) => {
		if ( clicked && touch ) {
			// moveu para esquerda
			if (e.changedTouches[0].clientX < position) {
				if ((position - e.changedTouches[0].clientX) > 60) $('#calendar').fullCalendar('next');
			// moveu para direita
			}else{
				if ((e.changedTouches[0].clientX - position) > 60) $('#calendar').fullCalendar('prev');
			}
		}
		clicked = false;
		position = 0;
		for (var i in brushes) {
			brushes[i].remove();
		}
		brushes = [];
	});
	
	cal.addEventListener("touchmove", (e) => {
		// se manter pressionado por mais de 1,5 segundos break
		if(moment().diff(timeini, "seconds", true) > 1.5) return false;
		if (clicked && touch) {
			let brush = document.createElement("span");
			brush.classList.add("dragPaint");
			brush.style.left = `${e.changedTouches[0].clientX}px`;
			brush.style.top = `${e.changedTouches[0].clientY}px`;
			brush.style.position = "absolute";
			brush.style.zIndex = 1300;
			if (brushes.length <=15) {
				brushes.push(brush);
				document.body.appendChild(brush);
			}
		}
	});
}