window.onload = function () {
	document.getElementById("login_btn").addEventListener("click", function () {
		login();
	});
	document.getElementById("subs").addEventListener("click", function () {
		save_subs();
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
		}).then(function (response) {
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
		}).then(function (result) {
			console.log(result);


		});
	}


	function save_subs() {
		var data = {};
		data.email = document.getElementById("inputEmail").value;
		console.log(data);

		fetch('http://localhost:3000/subs/', {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify(data)
		}).then(function (response) {
			if (!response.ok) {
				console.log(response.status); //=> number 100–599
				console.log(response.statusText); //=> String
				console.log(response.headers); //=> Headers
				console.log(response.url); //=> String
				if (response.status === 409) {
					alert("Duplicated occurrences Code");
				}
				else {
					throw Error(response.statusText);
				}
			}
			else {
				/*document.getElementById("nome_revistas").reset();
				 document.getElementById("numero_revistas").reset();
				 document.getElementById("select_revistas").reset();*/
				alert("Subscrição feita com sucesso! Está atento ao teu email! :)");
				//refreshanalise();
			}
		}).then(function (result) {
			console.log(result);
		}).catch(function (err) {
			//alert("Submission error");
			console.error(err);
		});
	}


};