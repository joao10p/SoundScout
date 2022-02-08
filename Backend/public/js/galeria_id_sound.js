
window.onload = function () {
    show_fotos();
    document.getElementById("subs").addEventListener("click", function () {
        save_subs();
    });

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
    
    function show_fotos() {

        const id = document.getElementById("id_trabalhador").value;


        fetch('http://localhost:3000/users/' + id)
            .then(response => response.json()) // <-- important line
            .then(response => {
                console.log(response);
                JSON.stringify(response);
                // changed .value to .innerHTML but you can handle it as you wish
                const txt = response[0].nome;
                const txt1 = response[0].cargo;
                const txt2 = response[0].email;
                const txt3 = response[0].numero;
                const txt4 = response[0].password;

                document.getElementById("nome_pessoa").value = txt;
                document.getElementById("cargo_pessoa").value = txt1;
                document.getElementById("phoneField").value = txt2;
                document.getElementById("telemovel_diretores").value = txt3;
                document.getElementById("pass_diretores").value = txt4;

            })
            .catch(error => {
                alert("Nope");
            })
    };



}
