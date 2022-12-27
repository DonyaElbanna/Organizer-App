/////TODOS////

const todoForm = document.querySelector('.todoForm');
const todoInput = document.getElementById('addTodo');
const todoList = document.querySelector('.list');

let todos = [];


//getting todo from input
todoForm.addEventListener('submit', function(e) {
	e.preventDefault();
	addTodo(todoInput.value);
});


//adding todo function
function addTodo(item) {
	if (item !== '') {
		const todo = {
			id: Date.now(),
			name: item,
			completed: false
		};
		
		//adding new todo to todos array
		todos.push(todo);
		
		//adding new todo to local storage
		addToLocalStorage(todos);
		
		//clearing text box
		todoInput.value = '';
	}
}


//function to load todos array to dom
function loadTodos(todos) {
	todoList.innerHTML = '';
	
	todos.forEach(function(item) {
		const checked = item.completed ? 'checked' : null;
		
		const li = document.createElement('li');
		li.setAttribute('class', 'item');
		li.setAttribute('key', item.id);
		
		if (item.completed === true) {
			li.classList.add('checked');
		}
		
		li.innerHTML = `
          <input type="checkbox" class="checkbox" id=${item.id} ${checked}>
          <label for=${item.id}>${item.name}</label>
          <button class="deleteBtn">X</button>`;
		  
	    todoList.insertBefore(li, todoList.children[0]);
		//todoList.append(li);  
	});
}


//adding todos to ls
function addToLocalStorage(todos) {
	localStorage.setItem('todos', JSON.stringify(todos));
	
	loadTodos(todos);
}


//getting todos from LS
function getFromLocalStorage() {
	const data = localStorage.getItem('todos');
	
	if (data) {
		todos = JSON.parse(data);
		loadTodos(todos);
	}
}


//to check or uncheck tood
function toggleTodo(id) {
	todos.forEach(function (item) {
		if (item.id == id) {
			item.completed = !item.completed;
			//console.log(item.id)
		}
	});
	
	addToLocalStorage(todos);
}

//deleting todo
function deleteTodo(id) {
	
	//filtering out the desired todo to remove from array
	todos = todos.filter(function (item) {
		return item.id != id;
	});
	
	addToLocalStorage(todos);
}

//to get stored data when opening app
getFromLocalStorage();


todoList.addEventListener('click', function (e) {
	
	if (e.target.type === 'checkbox' || e.target.tagName === 'LI') {
		//console.log(e.target.tagName);
		toggleTodo(e.target.parentElement.getAttribute('key'));
	}
	
	if (e.target.classList.contains('deleteBtn')) {
		deleteTodo(e.target.parentElement.getAttribute('key'));
	}
});

/////SESSIONS/////

const sessionForm = document.querySelector('.classForm');
const sessionInput = document.getElementById('addClass');
const sessionList = document.querySelector('.appt');

let sessions = [];


//getting todo from input
sessionForm.addEventListener('submit', function(e) {
	e.preventDefault();
	addSession(sessionInput.value);
});


//adding todo function
function addSession(item) {
	if (item !== '') {
		const session = {
			id: Date.now(),
			name: item,
			finished: false
		};
		
		//adding new todo to todos array
		sessions.push(session);
		
		//adding new todo to local storage
		addToLS(sessions);
		
		//clearing text box
		sessionInput.value = '';
	}
}


//function to load todos array to dom
function loadSessions(sessions) {
	sessionList.innerHTML = '';
	
	sessions.forEach(function(item) {
		const finished = item.finished ? 'checked' : null;
		
		const li = document.createElement('li');
		li.setAttribute('class', 'item');
		li.setAttribute('key', item.id);
		
		if (item.finished === true) {
			li.classList.add('finished');
		}
		
		li.innerHTML = `
          <input type="checkbox" class="sessionCheckbox" id=${item.id} ${finished}>
          <label for=${item.id}>${item.name}</label>
          <button class="deleteBtn">X</button>`;
		  
		sessionList.append(li);  
	});
}


//adding todos to ls
function addToLS(sessions) {
	localStorage.setItem('sessions', JSON.stringify(sessions));
	
	loadSessions(sessions);
}


//getting todos from LS
function getFromLS() {
	const info = localStorage.getItem('sessions');
	
	if (info) {
		sessions = JSON.parse(info);
		loadSessions(sessions);
	}
}


//to check or uncheck tood
function toggleSession(id) {
	sessions.forEach(function (item) {
		if (item.id == id) {
			item.finished = !item.finished;
			//console.log(item.id)
		}
	});
	
	addToLS(sessions);
}

//deleting todo
function deleteSession(id) {
	
	//filtering out the desired todo to remove from array
	sessions = sessions.filter(function (item) {
		return item.id != id;
	});
	
	addToLS(sessions);
}

//to get stored data when opening app
getFromLS();


sessionList.addEventListener('click', function (e) {
	
	if (e.target.type === 'checkbox' || e.target.tagName === 'LI') {
		//console.log(e.target.tagName);
		toggleSession(e.target.parentElement.getAttribute('key'));
	}
	
	if (e.target.classList.contains('deleteBtn')) {
		deleteSession(e.target.parentElement.getAttribute('key'));
	}
});



/////Calendar/////

let nav = 0;  //keeping track of which month
let clicked = null;   //whichever day we click on
let events = localStorage.getItem('events') 
	? JSON.parse(localStorage.getItem('events'))
	: [];

const days = document.getElementById('days');
const weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const addEvents = document.getElementById('addEvent');
const deleteEvents = document.getElementById('deleteEvent');
const backDrop = document.getElementById('modalBackDrop');
const eventInput = document.getElementById('eventInput');

//date as an argument cuz we need to know hwich date is the event for
function openModal(date) {
	clicked = date;
	
	const eventForDay = events.find(e => e.date === clicked);
	
	if (eventForDay) {
		//console.log('Event already exists');
		//we want to show modal and the text of the event
		document.getElementById('eventText').innerText = eventForDay.title;
		deleteEvents.style.display = 'block';
	} else {
	    addEvents.style.display = 'block';	
	}
	
	backDrop.style.display = 'block';
}


function load() {
	const dt = new Date();  //creating a date object by date constructor
	
	if (nav !== 0) {
		dt.setMonth(new Date().getMonth() + nav, 01);
	}
    
	
	const day = dt.getDate();
	const month = dt.getMonth();
	const year = dt.getFullYear();
	
	//to get how many days in a month
	//if we're in March, we're giving it April, but 0 days is last day in previous month, so last day in March
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const firstDay = new Date(year, month, 1); //getDate gives a number, without it it's a string
	
	const dateString = firstDay.toLocaleDateString('en-gb', {
		weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'
	});
	
	//passing only the week day, splitting into two arrays, first is weekday, second is date, we want the first
	const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
	
	document.getElementById('month').innerText = 
	`${dt.toLocaleDateString('en-gb', {month: 'long'})} ${year}`;
	
	days.innerHTML = '';  //wiping the calendar cuz if not and we clicked back or next we'll get another calendar on top
	
	for (let i = 1; i <= paddingDays + daysInMonth; i++) {
		const daySquare = document.createElement('li');
		daySquare.classList.add('day');
		
		const dayString = `${i - paddingDays}/${month + 1}/${year}`;
		
		if (i > paddingDays) { //should be displaying a date square, if less (else) then empty square
			daySquare.innerText = i - paddingDays;
			//console.log(paddingDays)
			//to show event for a day
	        const eventForDay = events.find(e => e.date === dayString);
			
			//to highlight current day, current day is same as day object and only in the current month (nav=0)
			if (i - paddingDays === day  && nav === 0) {
				daySquare.id = 'today';
			}
			
			if (eventForDay) {
				const eventDiv = document.createElement('div');
				eventDiv.classList.add('event');
				eventDiv.innerText = eventForDay.title;
				daySquare.appendChild(eventDiv);
			}
			daySquare.addEventListener('click', () => openModal(dayString));
			
		} else {
			daySquare.classList.add('padding');
		}
		
		days.appendChild(daySquare);
	}
	
	//console.log(paddingDays);
	//console.log(dateString);
	//console.log(firstDayOfMonth);
	//console.log(daysInMonth);
	//console.log(day, month, year);
	//console.log(dt); this is an obj with methods and properties
}


function closeModal() {
	eventInput.classList.add('error');
    addEvents.style.display = 'none';
    deleteEvents.style.display = 'none';
	backDrop.style.display = 'none';
	eventInput.value = '';
	clicked = null;
	load();
}


function saveEvent() {
	if (eventInput.value) {
		
		eventInput.classList.add('error');
		
		events.push({date: clicked, title: eventInput.value});
		
		localStorage.setItem('events', JSON.stringify(events));
		
		closeModal();
	} else {
		eventInput.classList.add('error');
	}
}

//we'll take events array, filterout the event we want to delete and delete it
function deleteEvent() {
	events = events.filter(e => e.date !== clicked);
	localStorage.setItem('events', JSON.stringify(events));
	closeModal();
}


function initButtons() {
	document.getElementById('nextBtn').addEventListener('click', () => {
		nav++;
		load();
	});
	
	document.getElementById('backBtn').addEventListener('click', () => {
		nav--;
		load();
	});
	
	document.getElementById('saveBtn').addEventListener('click', saveEvent);
	document.getElementById('cancelBtn').addEventListener('click', closeModal);
	
	document.getElementById('deleteBtn').addEventListener('click', deleteEvent);
	document.getElementById('closeBtn').addEventListener('click', closeModal);
}

initButtons();

load();