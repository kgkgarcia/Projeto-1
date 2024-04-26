document.addEventListener('DOMContentLoaded', function () {
    const eventosContainer = document.getElementById('eventosContainer');
    const modal = document.getElementById('myModal');

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
                        <button class="botao" id="mais" onclick="openModal('${evento.nome}', '${evento.data}', '${evento.local}', '${evento.descricao}', '${evento.imagem}', '${evento.preco}')">Ver mais</button>
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
// Função para abrir o modal e preencher os campos com os dados do evento
function openModal(nome, data, local, descricao, imagem, preco) {
    document.getElementById("modalNome").textContent = nome;
    document.getElementById("modalData").textContent = data;
    document.getElementById("modalLocal").textContent = local;
    document.getElementById("modalDescricao").textContent = descricao;
    document.getElementById("modalPreco").textContent = "Preço: €" + preco;
    document.getElementById("myModal").style.display = "block";
}

// Função para fechar o modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}


document.getElementById('perfil').addEventListener('click', function () {
    document.getElementById('modal-container').style.display = 'block';
});

document.querySelector('.close-button').addEventListener('click', function () {
    document.getElementById('modal-container').style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target == document.getElementById('modal-container')) {
        document.getElementById('modal-container').style.display = 'none';
    }
});




document.addEventListener("DOMContentLoaded", function () {
    var navegacaoImg = document.getElementById("navegacao");
    var navMenu = document.getElementById("navMenu");
    // Função para fechar o menu
    function fecharMenu() {
        navMenu.classList.remove("open");
        document.body.classList.remove("menu-aberto");
    }

    // Abrir o menu quando a imagem de navegação for clicada
    navegacaoImg.addEventListener("click", function () {
        navMenu.classList.toggle("open");
        document.body.classList.toggle("menu-aberto");
    });

    // Fechar o menu quando clicar fora dele
    document.addEventListener("click", function (event) {
        var clicadoDentroMenu = navMenu.contains(event.target);
        var clicadoNoIconeNavegacao = navegacaoImg.contains(event.target);
        if (!clicadoDentroMenu && !clicadoNoIconeNavegacao) {
            fecharMenu();
        }
    });
});



const adminCredentials = {
    username: "admin",
    password: "123"
};

document.getElementById("login").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === adminCredentials.username && password === adminCredentials.password) {
        // Login successful, redirect to management page
        window.location.href = "../Pages/admin.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
});


window.addEventListener('scroll', function () {
    var botaoVoltarTopo = document.getElementById('botaoVoltarTopo');

    // Mostra o botão quando o usuário rolar a página para baixo
    if (window.scrollY > 100) {
        botaoVoltarTopo.style.display = 'block';
    } else {
        botaoVoltarTopo.style.display = 'none';
    }
});



// Função para rolar a página de volta ao topo
function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}





