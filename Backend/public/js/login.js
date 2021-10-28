window.onload = function() {
	function creatlogin() {
		let data = {};
		data.nome = document.getElementById("nome_staff").value;
		data.cargo = document.getElementById("cargo_staff").value;
		data.numero = document.getElementById("telemovel_staff").value;
		data.email = document.getElementById("email_staff").value;
		data.password = document.getElementById("password_staff").value;
		
		console.log(data); //debugging para ver os dados que foram enviados
		//chamada fetch para envio dos dados para o servior via POST
		fetch('http://localhost:3000/signup', {
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
				creatlogin();
				async function creatlogin() {
					const res = await fetch('http://localhost:3000//signinSuccess');
					const data = await res.json();
					alert("Autenticação feita com sucesso!")
					window.location.href = "/";
					return response.json();
				}
			};
		}).then(function(result) {
			console.log(result);
		});
	}

	document.getElementById("adicionar_pessoa").addEventListener("click", function() {
		creatlogin();
	})
};