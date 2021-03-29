//AVALIAÇÃO DE OCORRÊNCIA

window.onload = function() {
    document.getElementById("add1").onclick = function(e) {
        saveoperfil();
    }
    

/*    function saveperfil() {
        //alert();
        const codigo = document.getElementById("nome1").value;
        console.log(id);
        var data = {};
        data.email = document.getElementById("email_diretores").value;
        data.address = document.getElementById("morada1").value;
        data.cellphone = document.getElementById("nif1").value;
        data.password = document.getElementById("password1").value;
        console.log(data); //debugging para ver os dados que foram enviados
        //chamada fetch para envio dos dados para o servior via POST
        //alert(data.notes);
        fetch('https://169.254.206.54:3001/users/' + id, { 
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
                document.getElementById("email1").reset();
                document.getElementById("morada1").reset();
                document.getElementById("nif1").reset();
                document.getElementById("password1").reset();
                alert("submitted with success");
                //refreshoccurrences1();
            }
        }).then(function(result) {
            console.log(result);
        }).catch(function(err) {
            alert("Submission error");
            console.error(err);
        });
    }
};
    
    function getPerfil() {
        const id = document.getElementById("cod_valor").value;
        console.log(id);
        var data = {};
        data.id_request = document.getElementById("cod_pedido").value;
        data.total_cost = document.getElementById("custos_valor").value;
        data.notes = document.getElementById("dificuldade_valor").value;
        data.degree_of_urgency = document.getElementById("gravidade_valor").value;
        console.log(data);
        fetch('https://8be6e272ea074b059952fa0fd08c59ee.vfs.cloud9.us-east-1.amazonaws.com/professionals/' + id, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        }); */

        
    function saveoperfil() {
        var data = {};
        data.nome = document.getElementById("nome_staff").value;
        data.cargo = document.getElementById("cargo_staff").value;
        data.password = document.getElementById("id_staff").value;
        console.log(data); //debugging para ver os dados que foram enviados
        //chamada fetch para envio dos dados para o servior via POST
        fetch('localhost:3000/users/', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
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
                //document.getElementById("OccuTable").reset(); //limpeza dos dados do form METER A NOSSA TABELA
                alert("submitted with success");
               // refreshperfil();
            }
        }).then(function(result) {
            console.log(result);
        }).catch(function(err) {
            alert("Submission error");
            console.error(err);
        });
    }

 /* function refreshperfil() {
            async function fetchAsync() {
                const renderoccurrences = document.getElementById("OccuTable");
                let txt = "";
                const response = await fetch('https://8be6e272ea074b059952fa0fd08c59ee.vfs.cloud9.us-east-1.amazonaws.com/witnesses');
                const occurrences = await response.json();
                txt += "<table class='table'>";
                txt += "<thead>";
                txt += "<tr><th>ID</th><th>Nome</th><th>Pontuação</th></tr></thead><tbody>";
                for (const newOccu of occurrences) {
                    txt += "<tr><td style='text-align:center'>" + newOccu.id_witness + "</td><td>" + newOccu.name + "</td><td>" + newOccu.points + "</td></tr>";
                }
                txt += "</tbody></table>";
                renderoccurrences.innerHTML = txt;
            }
            //chama a função fetchAsync()
            fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
        }
  
  
;*/
    }