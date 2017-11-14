function Dashboard() {
	document.getElementById("dashboard").classList.add('active');
	document.getElementById("edit").classList.remove('active');

	console.log('dash');

}

function Edit() {
	document.getElementById("edit").classList.add('active');
	document.getElementById("dashboard").classList.remove('active');
		console.log('edit');

}