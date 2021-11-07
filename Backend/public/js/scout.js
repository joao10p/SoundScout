window.onload= function() {
    getTexto();



function getTexto(){
    const id = "11";
    
    
   fetch('http://localhost:3000/scout/' +id)
    .then(response => response.json()) // <-- important line
    .then(response => {
        console.log(response);
        JSON.stringify(response);
        // changed .value to .innerHTML but you can handle it as you wish
        
        const txt = response[0].titulo;
        const txt1 = response[0].nome_cria_txt;
        const txt2= response[0].cargoS;
        const txt3 = response[0].texto;
       
        
         document.getElementById("titulo").innerHTML = txt;
         document.getElementById("nome").innerHTML=txt1;
         document.getElementById("cargo").innerHTML=txt2;
         document.getElementById("text_esc").innerHTML=txt3;
         
        
    })
    .catch(error => {
        alert("Nope");
    })
 };
}