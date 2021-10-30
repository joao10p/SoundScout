
window.onload = function() {
        alert("dass")
        document.getElementById("confirmar1").onclick = function(e) {
            alert("ant")
            //getNome();
          
            concol()
        }
    

   /* function getNome(){
        alert("passou no fetch");
       const id = document.getElementById("id_trabalhador").value;
       
      fetch('http://localhost:3000/users/' +id)
       .then(response => response.json()) // <-- important line
       .then(response => {
           console.log(response);
           //JSON.stringify(response);
           // changed .value to .innerHTML but you can handle it as you wish
           
           const txt = response[0].nome;
           const txt1 = response[1].cargo
           
           document.getElementById("nome_pessoa").value = txt;
           document.getElementById("cargo_pessoa").value=txt1;
           
       })
       .catch(error => {
           alert("Nope");
       });
    }*/



    function concol() {
        const id = document.getElementById("id_trabalhador").value;
        console.log(id);
        var data = {};
        
        data.email = document.getElementById("email_diretores").value;
        data.numero=document.getElementById("telemovel_diretores").value;
    
        
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


    function refreshanalise() {
        async function fetchAsync() {
            const renderanalise = document.getElementById("telemovel_diretores");
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

}




