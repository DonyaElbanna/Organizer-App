//checking done todos
let todoList = document.getElementsByTagName('li');


let list = document.querySelector('ul')
list.addEventListener('click', function(e) {
	if (e.target.tagName = 'li') {
		e.target.classList.toggle('checked');
	}
}, false)
	

//adding new todos
function addTodo() {
	let todo = document.getElementById('addTodo').value;
	let liItem = document.createElement('li');
	let todoTxt = document.createTextNode(todo);
	//liItem.appendChild(todoTxt);
	let deleteTodo = liItem.innerHTML;
		deleteTodo = "<span class='deleteBtn'><button>&#9747</button></span>"
	liItem.innerHTML = todo + deleteTodo;
	
	if (!todo) {
		alert('This field cannot be empty!');
	} else {
		document.getElementById('list').appendChild(liItem);
	}
	
	let removeTodo = document.getElementsByClassName('deleteBtn');
	let i;

	for (i=0; i<removeTodo.length; i++) {
		removeTodo[i].onclick = function() {
			this.parentElement.style.display='none';
	}
}
	document.getElementById('addTodo').value = '';
	//console.log(deleteTodo);	
}

//deleting todo
let deleteTodo = document.getElementsByClassName('deleteBtn');
let i;

for (i=0; i<deleteTodo.length; i++) {
	deleteTodo[i].onclick = function() {
		this.parentElement.style.display='none';
	}
}

//for finished appointments


//for adding appointments
function addClass(){
    let classItem = document.getElementById('addClass').value;
	let liItem = document.createElement('li');
	let classTxt = document.createTextNode(classItem);
	//liItem.appendChild(todoTxt);
	let deleteClass = liItem.innerHTML;
		deleteClass = "<span class='deleteBtn'><button>&#9747</button></span>"
	liItem.innerHTML = classItem + deleteClass;
	
	if (!classItem) {
		alert('This field cannot be empty!');
	} else {
		document.getElementById('appt').appendChild(liItem);
	}
	
	let removeClass = document.getElementsByClassName('deleteBtn');
	let i;

	for (i=0; i<removeClass.length; i++) {
		removeClass[i].onclick = function() {
			this.parentElement.style.display='none';
	}
}
	document.getElementById('addClass').value = '';
}

let classList = document.getElementsByClassName('classItem');


let appts = document.getElementById('appt');
appts.addEventListener('click', function(e) {
	if (e.target.tagName = 'li') {
		e.target.classList.toggle('finished');
	}
}, false)

