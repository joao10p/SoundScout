window.onload = function() {
	function login() {
		let data = {};
		data.email = document.getElementById("email").value;
		data.password = document.getElementById("senha").value;
		console.log(data); //debugging para ver os dados que foram enviados
		//chamada fetch para envio dos dados para o servior via POST
		fetch('https://127.0.0.1:3000/signin', {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify(data)
		}).then(function(response) {
			if (!response.ok) {
				console.log(response.status); //=> number 100â€“599
				console.log(response.statusText); //=> String
				console.log(response.headers); //=> Headers
				console.log(response.url); //=> String
				throw Error(response.statusText);
			}
			else {
				login();
				async function login() {
					const res = await fetch('https://127.0.0.1:3000//signinSuccess');
					const data = await res.json();
					alert("Autenticação feita com sucesso!");
					window.location.href = "menu.html";
					return response.json();
				}
			}
		}).then(function(result) {
			console.log(result);
		}).catch(function(err) {
			console.error(err);
			setpopup();
		});
	}

	document.getElementById("login_but").addEventListener("click", function() {
		login();
	});
};

/*function setpopup() {
	document.getElementById("popup").style.visibility = "visible";
	document.getElementById("forgot_pass").disabled = true;
	document.getElementById("email").disabled = true;
	document.getElementById("password").disabled = true;
	document.getElementById("visible").disabled = true;
	document.getElementById("login_btn").style.visibility = "hidden";
	document.getElementById("txt").style.visibility = "hidden";
	document.getElementById("clickhere").style.visibility = "hidden";
	document.getElementById("back_btn").style.visibility = "hidden";
}*/
