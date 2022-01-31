
window.onload = function () {
    show_galeria();
    show_users();
    show_revista();
    // select file input
    const input = document.getElementById('avatar');

    // add event listener
    input.addEventListener('change', () => {
        uploadFile(input.files[0]);
    })
    document.getElementById("get_id").onclick = function (e) {
        getNome();
    }
    document.getElementById("confirmar").onclick = function (e) {
        concol();

    }
    document.getElementById("adicionar_pessoa").addEventListener("click", function () {
        creatlogin();
        //show_users();
    })
    document.getElementById("add_revistas").onclick = function (e) {
        save_revista();
        show_revista();
    }

    document.getElementById("add_galeria").onclick = function (e) {
        save_galeria();
    }
    document.getElementById("confirmar_textos_diretores").onclick = function (e) {
        save_texto();
        const input = document.getElementById('txt_imagem');

        // add event listener
        input.onclick(() => {
            save_txt_image(input.files[0]);
        })
    }
    //-----------------------------------------------------------------------------------------------------//

    //BUSCAR OS NOMES DOS UTILIZADORES

    function getNome() {

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


    //ALTERAR DADOS DOS UTILIZADORES
    function concol() {
        const id = document.getElementById("id_trabalhador").value;
        var data = {};
        data.email = document.getElementById("phoneField").value;
        data.numero = document.getElementById("telemovel_diretores").value;
        data.cargo = document.getElementById("cargo_pessoa").value;
        data.nome = document.getElementById("nome_pessoa").value;
        data.password = document.getElementById("pass_diretores").value;
        console.log(data);
        fetch('http://localhost:3000/users/' + id, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
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
                //document.getElementById("cod_pedido").reset();
                //document.getElementById("descricao_analise").reset();

                alert("Utilizador alterado com sucesso!");
                //refreshanalise();
            }
        }).then(function (result) {
            console.log(result);
        }).catch(function (err) {
            //alert("Submission error");
            console.error(err);
        });
    }

    //---------------------------------------------------------------------------------------------------------//
    //ADICIONAR REVISTAS 

    function show_revista() {

        async function fetchAsync() {
            const renderoccurrences = document.getElementById("table_revistas");
            let txt = "";
            const response = await fetch('http://localhost:3000/scoutGet');
            const revistas = await response.json();
            txt += "<table class='table'>";
            txt += "<thead>";
            txt += "<tr><th>Nome</th><th>Nº de Edição</th><th>Revista</th></tr></thead><tbody>";
            for (const newOccu of revistas) {
                txt += "<tr><td style='text-align:center'>" + newOccu.nome + "</td><td>" + newOccu.edicao + "</td><td>" + newOccu.nome_revista + "</td>s</tr>";
                //txt += `<td><button id='${newOccu.id}'class='delete' onclick = "deleteOcc(id); location.reload();" >Eliminar</button>`; VER FUTURAMENTE O BOTAO DELETE 
            }
            txt += "</tbody></table>";
            renderoccurrences.innerHTML = txt;
        }
        //chama a função fetchAsync()
        fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
    }
    function save_revista() {

        var data = {};
        data.nome = document.getElementById("nome_revistas").value;
        data.edicao = document.getElementById("numero_revistas").value;
        data.nome_revista = document.getElementById("select_revistas").value;
        data.revista = document.getElementById("revista_revistas").value;
        console.log(data);
        fetch('http://localhost:3000/scout/', {
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
                alert("Revista adicionada com sucesso!");
                //refreshanalise();
            }
        }).then(function (result) {
            console.log(result);
        }).catch(function (err) {
            //alert("Submission error");
            console.error(err);
        });
    }


    //BANNERS 


    //BANNER DA SOUND
    const uploadFile = (file) => {

        // add file to FormData object

        const fd = new FormData();
        if (document.getElementById("select_banner").value == 1) {
            fd.append('banner_scout', file);
            fetch('/soundBanner', {
                method: 'POST',
                body: fd
            })
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(err => console.error(err));
        } else {
            fd.append('banner_scout', file);
            fetch('/scoutBanner', {
                method: 'POST',
                body: fd
            })
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(err => console.error(err));
        }

    };

    //-------------------------GALERIA------------------------//
    //---Mostrar a tabela
    function show_galeria() {

        async function fetchAsync() {
            const renderoccurrences = document.getElementById("table_galeria_diretores");
            let txt = "";
            const response = await fetch('http://localhost:3000/galeria');
            const galeria = await response.json();
            txt += "<table class='table'>";
            txt += "<thead>";
            txt += "<tr><th>Titulo</th><th>Data</th><th>Fotógrafo</th><th>Revista</th></tr></thead><tbody>";
            for (const newOccu of galeria) {
                txt += "<tr><td style='text-align:center'>" + newOccu.titulo + "</td><td>" + newOccu.data + "</td><td>" + newOccu.fotografo + "</td><td>" + newOccu.revista + "</td></tr>";
                //txt += `<td><button id='${newOccu.id}'class='delete' onclick = "deleteOcc(id); location.reload();" >Eliminar</button>`; VER FUTURAMENTE O BOTAO DELETE 
            }
            txt += "</tbody></table>";
            renderoccurrences.innerHTML = txt;
        }
        //chama a função fetchAsync()
        fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
    }

    //---Save dados
    function save_galeria() {
        alert("passou na galeria")
        var data = {};
        data.revista = document.getElementById("select_galeria_diretores").value;
        data.titulo = document.getElementById("titulo_galeria_diretores").value;
        data.data = document.getElementById("data_galeria_diretores").value;
        data.fotografo = document.getElementById("fotografo_galeria_diretores").value;
        data.capa = document.getElementById("capa_galeria_diretores").value;
        data.album = document.getElementById("album_galeria_diretores").value;

        console.log(data);
        fetch('http://localhost:3000/galeria/', {
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
                alert("Revista adicionada com sucesso!");
                //refreshanalise();
            }
        }).then(function (result) {
            console.log(result);
        }).catch(function (err) {
            //alert("Submission error");
            console.error(err);
        });
    }

    //-------------------------TEXTO------------------------//

    function save_texto() {
        var id =0 ;
        if (document.getElementById("select_textos_diretores").value == 1) {
            id = 1;
        } else {
            id = 2;
        }
        var data = {};

        data.nome_revista = document.getElementById("select_textos_diretores").value;
        data.titulo = document.getElementById("titulo_textos_diretores").value;
        data.nome_cria_txt = document.getElementById("nome_textos_diretores").value;
        data.cargoS = document.getElementById("cargo_textos_diretores").value;
        data.texto = document.getElementById("texto_textos_diretores").value;
        console.log(data);
        fetch('http://localhost:3000/scout/' + id, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
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
                //document.getElementById("cod_pedido").reset();
                //document.getElementById("descricao_analise").reset();

                alert("Utilizador alterado com sucesso!");
                //refreshanalise();
            }
        }).then(function (result) {
            console.log(result);
        }).catch(function (err) {
            //alert("Submission error");
            console.error(err);
        });
    }


    //save imagem do texto


    const save_txt_image = (file) => {

        // add file to FormData object

        const fd = new FormData();
        if (document.getElementById("select_textos_diretores").value == 1) {
            fd.append('tximagem_sound', file);
            fetch('/soundTexto_image', {
                method: 'POST',
                body: fd
            })
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(err => console.error(err));
        } else {
            fd.append('tximagem_scout', file);
            fetch('/scoutTexto_image', {
                method: 'POST',
                body: fd
            })
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(err => console.error(err));
        }

    };

    //---------------------------------------------------------------------------------------------------------//
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

    //-------------------------------STAFF-----------------------------------------//
    //SHOW TABELA DE USERS 

    function show_users() {

        async function fetchAsync() {
            const renderoccurrences = document.getElementById("table_staff");
            let txt = "";
            const response = await fetch('http://localhost:3000/users');
            const users = await response.json();
            txt += "<table class='table'>";
            txt += "<thead>";
            txt += "<tr><th>Id</th><th>Nome</th><th>Cargo</th><th>NºTelemóvel</th></tr></thead><tbody>";
            for (const newOccu of users) {
                txt += "<tr><td style='text-align:center'>" + newOccu.id + "</td><td>" + newOccu.nome + "</td><td>" + newOccu.cargo + "</td><td>" + newOccu.numero + "</td></tr>";
                //txt += `<td><button id='${newOccu.id}'class='delete' onclick = "deleteOcc(id); location.reload();" >Eliminar</button>`; VER FUTURAMENTE O BOTAO DELETE 
            }
            txt += "</tbody></table>";
            renderoccurrences.innerHTML = txt;
        }
        //chama a função fetchAsync()
        fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
    }
    //CRIAR CONTA
    function creatlogin() {
        let data = {};
        data.nome = document.getElementById("nome_staff").value;
        data.cargo = document.getElementById("cargo_staff").value;
        data.numero = document.getElementById("telemovel_staff").value;
        data.email = document.getElementById("email_staff").value;
        data.password = document.getElementById("password_staff").value;

        console.log(data); //debugging para ver os dados que foram enviados
        //chamada fetch para envio dos dados para o servior via POST
        fetch('http://localhost:3000/signup', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data)
        }).then(function (response) {
            if (!response.ok) {
                console.log(response.status); //=> number 100â€“599
                console.log(response.statusText); //=> String
                console.log(response.headers); //=> Headers
                console.log(response.url); //=> String
                throw Error(response.statusText);
            }
            else {
                creatlogin();
                async function creatlogin() {
                    const res = await fetch('http://localhost:3000/signupSuccess');
                    const data = await res.json();
                    alert("Conta criada com sucesso")
                    window.location.href = "/";
                    return response.json();

                }

            };
        }).then(function (result) {
            console.log(result);
        });
    }


};

