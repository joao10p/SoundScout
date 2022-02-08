window.onload = function () {
    getCapa();

    document.getElementById("subs").addEventListener("click", function () {
        save_subs();
    });
    document.getElementById("add").addEventListener("click", function () {
        getCapa();
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

    function getCapa() {

        fetch('http://localhost:3000/galeriaSoundMax/')
            .then(response => response.json()) // <-- important line
            .then(response => {
                console.log(response);
                JSON.stringify(response);
                // changed .value to .innerHTML but you can handle it as you wish
                const txt = response[0].id; 
                document.getElementById("max").value = txt;

                console.log(txt);
                for (let index = 1; index < txt; index++) {
                    const element = index;  
                    console.log(index);


                    fetch('http://localhost:3000/galeriaSound/' + element)
                        .then(response => response.json()) // <-- important line
                        .then(response => {
                            console.log(response);
                            JSON.stringify(response);
                            // changed .value to .innerHTML but you can handle it as you wish
                            const txt = response[0].capa;

                            document.getElementById(index).src = txt;

                        })
                }

            })
            
    }
}