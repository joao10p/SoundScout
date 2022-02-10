window.onload = function () {
    getTexto();
    getLink();
    getCapa();
    
    document.getElementById("subs").addEventListener("click", function () {
        save_subs();
    });


    function getTexto() {
        const id = 2;


        fetch('http://localhost:3000/scout/' + id)
            .then(response => response.json()) // <-- important line
            .then(response => {
                console.log(response);
                JSON.stringify(response);
                // changed .value to .innerHTML but you can handle it as you wish

                const txt = response[0].titulo;
                const txt1 = response[0].nome_cria_txt;
                const txt2 = response[0].cargoS;
                const txt3 = response[0].texto;


                document.getElementById("titulo").innerHTML = txt;
                document.getElementById("nome").innerHTML = txt1;
                document.getElementById("cargo").innerHTML = txt2;
                document.getElementById("text_esc").innerHTML = txt3;


            })
            .catch(error => {
                alert("Nope");
            })
    };

    function getLink() {
        const id = 2;


        fetch('http://localhost:3000/redes/' + id)
            .then(response => response.json()) // <-- important line
            .then(response => {
                console.log(response);
                JSON.stringify(response);
                // changed .value to .innerHTML but you can handle it as you wish

                const txt = response[0].link;
                document.getElementById("youtube_id").src = txt;


            })
            .catch(error => {
                alert("Nope");
            })
    };
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
    function getCapa() {


        fetch('http://localhost:3000/revistaScoutEdicao/')
            .then(response => response.json()) // <-- important line
            .then(response => {
                console.log(response);
                JSON.stringify(response);
                // changed .value to .innerHTML but you can handle it as you wish

                const txt = response[0].id;
                fetch('http://localhost:3000/revistaScoutCapa/' + txt)
                    .then(response => response.json()) // <-- important line
                    .then(response => {
                        console.log(response);
                        JSON.stringify(response);
                        // changed .value to .innerHTML but you can handle it as you wish
                        const txt1 = response[0].capa;

                        document.getElementById("capa_scout").src = txt1;

                    })


            })
            .catch(error => {
                alert("Nope");
            })
    }
}