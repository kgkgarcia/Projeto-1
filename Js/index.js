document.addEventListener('DOMContentLoaded', function () {
    const eventosContainer = document.getElementById('eventosContainer');

    // Fazendo uma requisição AJAX para carregar o arquivo JSON
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'eventos.json', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const eventos = JSON.parse(xhr.responseText);
            eventos.forEach(evento => {
                const cardEvento = `
                    <div class="card-evento">
                        <img src="${evento.imagem}" alt="${evento.nome}">
                        <h3>${evento.nome}</h3>
                        <p>${evento.descricao}</p>
                        <a href="" class="botao" id="mais">Ver mais</a>
                    </div>
                `;
                eventosContainer.innerHTML += cardEvento;
            });
        } else {
            console.error('Falha ao carregar os eventos.');
        }
    };
    xhr.send();
});

document.getElementById('perfil').addEventListener('click', function() {
    document.getElementById('modal-container').style.display = 'block';
});

document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('modal-container').style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('modal-container')) {
        document.getElementById('modal-container').style.display = 'none';
    }
});




document.addEventListener("DOMContentLoaded", function() {
    var navegacaoImg = document.getElementById("navegacao");
    var navMenu = document.getElementById("navMenu");

    // Função para fechar o menu
    function fecharMenu() {
        navMenu.classList.remove("open");
        document.body.classList.remove("menu-aberto");
    }

    // Abrir o menu quando a imagem de navegação for clicada
    navegacaoImg.addEventListener("click", function() {
        navMenu.classList.toggle("open");
        document.body.classList.toggle("menu-aberto");
    });

    // Fechar o menu quando clicar fora dele
    document.addEventListener("click", function(event) {
        var clicadoDentroMenu = navMenu.contains(event.target);
        var clicadoNoIconeNavegacao = navegacaoImg.contains(event.target);
        if (!clicadoDentroMenu && !clicadoNoIconeNavegacao) {
            fecharMenu();
        }
    });
});

