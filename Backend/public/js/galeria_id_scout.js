
show_fotos();


function show_fotos() {
    var valor_galeria = localStorage.getItem("valor_galeria");
    const id = valor_galeria.substr(7);
    //const id = document.getElementById("sound").input;
    fetch('http://localhost:3000/galeriaScoutFotos/' + id)
        .then(response => response.json()) // <-- important line
        .then(response => {
            console.log(response);
            JSON.stringify(response);
            // changed .value to .innerHTML but you can handle it as you wish
            const txt = response[0].foto1;
            const txt1 = response[0].foto2;
            const txt2 = response[0].foto3;
            const txt3 = response[0].foto4;
            const txt4 = response[0].foto5;
            const txt5 = response[0].foto6;
            const txt6 = response[0].foto7;
            const txt7 = response[0].foto8;
            const txt8 = response[0].foto9;
            document.getElementById("1").src = txt;
            document.getElementById("2").src = txt1;
            document.getElementById("3").src = txt2;
            document.getElementById("4").src = txt3;
            document.getElementById("5").src = txt4;
            document.getElementById("6").src = txt5;
            document.getElementById("7").src = txt6;
            document.getElementById("8").src = txt7;
            document.getElementById("9").src = txt8;


        })
        .catch(error => {
            alert("Nope");
        })
};

