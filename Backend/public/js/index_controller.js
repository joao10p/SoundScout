
window.onload= function() {
    bannersoud();
    
    }


    function bannersoud() {

        fetch("http://localhost:3000/banner")
            .then(response => response.json()) // <-- important line
            .then(response => {
                console.log(response);
                JSON.stringify(response);
                // changed .value to .innerHTML but you can handle it as you wish

                const txt = response[0].banner;
                document.getElementById("bannerSound").appendChild  = txt;
            })
            .catch(error => {
              
            });
    }












