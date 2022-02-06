window.onload = function () {

    get();

    function get() {

    

        fetch('http://localhost:3000/email/')
            .then(response => response.json()) // <-- important line
            .then(response => {
                console.log(response);
                JSON.stringify(response);
                // changed .value to .innerHTML but you can handle it as you wish
               for (let index = 0; index < response.length; index++) {
                const txt = response[index].email;
                document.getElementById("ss").innerHTML = txt;
                   
               }

           
            })
            .catch(error => {
                alert("Nope");
            })
    };



}
