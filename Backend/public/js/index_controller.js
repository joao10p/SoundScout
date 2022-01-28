window.onload = function () {
    alert("ent");

function bannersound() {
    const id = 23;

    alert("#sD");
    fetch('http://localhost:3000/scout/' + id)
        .then(response => response.blob())
        .then(image => {
            const txt = response[0].banner;
            document.getElementById("sound").value = txt;
            alert("chega");
        })
        .catch(error => {
            alert("Nope");
        })
};



};
