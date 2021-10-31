
window.onload= function() {
    document.getElementById("get_id").onclick=function(e){
        getNome();
    }
    document.getElementById("confirmar").onclick = function(e) {
        concol();

    }
    document.getElementById("adicionar_pessoa").addEventListener("click", function() {
		creatlogin();
	})


    //-----------------------------------------------------------------------------------------------------//

    //BUSCAR OS NOMES DOS UTILIZADORES

    function getNome(){
        
       const id = document.getElementById("id_trabalhador").value;
       
      fetch('http://localhost:3000/users/' +id)
       .then(response => response.json()) // <-- important line
       .then(response => {
           console.log(response);
           JSON.stringify(response);
           // changed .value to .innerHTML but you can handle it as you wish
           
           const txt = response[0].nome;
           const txt1 = response[0].cargo;
           const txt2= response[0].email;
           const txt3 = response[0].numero;
           const txt4= response[0].password;
           
            document.getElementById("nome_pessoa").value = txt;
            document.getElementById("cargo_pessoa").value=txt1;
            document.getElementById("email_diretores").value=txt2;
            document.getElementById("telemovel_diretores").value=txt3;
            document.getElementById("pass_diretores").value=txt4;
           
       })
       .catch(error => {
           alert("Nope");
       })
    };


    //ALTERAR DADOS DOS UTILIZADORES
    function concol() {
        const id = document.getElementById("id_trabalhador").value;
        console.log(id);
        var data = {};
        data.email = document.getElementById("email_diretores").value;
        data.numero=document.getElementById("telemovel_diretores").value;
        data.cargo=document.getElementById("cargo_pessoa").value;
        data.nome=document.getElementById("nome_pessoa").value;
        data.password=document.getElementById("pass_diretores").value;
        console.log(data);
        fetch('http://localhost:3000/users/' + id, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(data)
        }).then(function(response) {
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
                //document.getElementById("cod_pedido").reset();
                //document.getElementById("descricao_analise").reset();
                
                alert("Utilizador alterado com sucesso!");
                //refreshanalise();
            }
        }).then(function(result) {
            console.log(result);
        }).catch(function(err) {
            //alert("Submission error");
            console.error(err);
        });
    }

//---------------------------------------------------------------------------------------------------------//
    function refreshanalise() {
        async function fetchAsync() {
            const renderanalise = document.getElementById("telemovel");
            let txt = "";
            const response = await fetch('http://localhost:3000/users');
            const ana = await response.json();
            for (const newAna of ana) {
                txt += newAna.numero;
            }
            txt += "</tbody></table>";
            renderanalise.innerHTML = txt;
        }
        //chama a função fetchAsync()
        fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
    }


    ;

    //-------------------------------STAFF-----------------------------------------//

    //CRIAR CONTA
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

};

