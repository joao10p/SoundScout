
window.onload = function () {
    document.getElementById("ss").onclick = function (e) {
        save_subs();
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
                alert("Subscrição adicionada com sucesso!");
                //refreshanalise();
            }
        }).then(function (result) {
            console.log(result);
        }).catch(function (err) {
            //alert("Submission error");
            console.error(err);
        });
    }


}