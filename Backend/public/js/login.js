window.onload = function() {
    document.getElementById("login_btn").addEventListener("click", function() {
		login();
	});

	function login() {
		let data = {};
		data.email = document.getElementById("email_login").value;
		data.password = document.getElementById("password_login").value;
		console.log(data); //debugging para ver os dados que foram enviados
		//chamada fetch para envio dos dados para o servior via POST
		fetch('http://localhost:3000/signin', {
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
					const res = await fetch('http://localhost:3000/signinSuccess');
					const data = await res.json();
					alert("Autenticação feita com sucesso!");
					window.location.href = "/menu_diretores";
					return response.json();
				}
			}
		}).then(function(result) {
			console.log(result);
		
			
		});
	}


};