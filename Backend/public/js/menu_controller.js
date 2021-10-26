


window.onload = function() {
    document.getElementById("confirmar").onclick = function(e) {
        concol();


    }



    function concol() {
        const id = document.getElementById("cod_valor1").value;
        console.log(id);
        var data = {};
        data.email = document.getElementById("email").value;
        data.numero=document.getElementById("telemovel").value;
        
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
                alert("BRUNOOOOO");
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

};



