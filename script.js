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

