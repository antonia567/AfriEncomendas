//Detalhes da imagem 
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card-pedido');
    const overlay = document.getElementById('modalOverlay');
    const modalImg = document.getElementById('modalImg');
    const modalTitulo = document.getElementById('modalTitulo');
    const modalPreco = document.getElementById('modalPreco');
    const modalDuracao = document.getElementById('modalDuracao');
    const btnFechar = document.getElementById('modalFechar');

    cards.forEach(card => {
        card.addEventListener('click', function() {
            modalImg.src = card.dataset.img || '';
            modalTitulo.textContent = card.dataset.titulo || '';
            modalPreco.textContent = 'Preço: ' + (card.dataset.preco || '');
            modalDuracao.textContent = 'Duração do pedido: ' + (card.dataset.duracao || '');
            overlay.classList.add('ativo');
        });
    });

    btnFechar.addEventListener('click', fecharModal);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) fecharModal();
    });

    function fecharModal() {
        overlay.classList.remove('ativo');
    }
});

 //Opções do select de Preço
var preco = 100;
var limite = 100000; 
var html = "";

for (let i = preco; i <= limite; i += 100) {
    html += `<option value="${i}">${i} Kz</option>`;
}
document.getElementById("inputPreco").innerHTML += html;

 //Opções do select pedido
var opcoes = ["Bolos", "Bolas de Berlin", "Bolinhos", "Salgadinhos recheados de salsicha ", "Salgadinhos recheados de peixe", "Salgadinhos recheados de frango", "Rissóis"];
var html = "";

for (let i = 0; i < opcoes.length; i++) {
    html += `<option value="${opcoes[i]}">${opcoes[i]}</option>`;
}

document.getElementById("inputPedido").innerHTML += html;

//Erros dos campos
document.getElementById("btnEnviar").addEventListener("click", function (e) {
    e.preventDefault(); // evita comportamento padrão, já que não há <form>

    var valido = true;

    // id do campo, id da mensagem de erro, texto do erro
    var campos = [
        ["nome", "erroNome", "Digite seu nome e sobrenome."],
        ["numero", "erroNumero", "Digite seu número de telemóvel."],
        ["inputPedido", "erroPedido", "Selecione um pedido."],
        ["inputPreco", "erroPreco", "Selecione um preço."],
        ["endereco", "erroEndereco", "Digite o seu endereço."]
    ];

    campos.forEach(function ([idCampo, idErro, mensagem]) {
        var campo = document.getElementById(idCampo);
        var erro = document.getElementById(idErro);

        if (campo.value.trim() === "") {
            erro.textContent = mensagem;
            campo.classList.add("campo-invalido");
            valido = false;
        } else {
            erro.textContent = "";
            campo.classList.remove("campo-invalido");
        }
    });

   
    if (valido) {
        // Pega os valores preenchidos
        var nome = document.getElementById("nome").value;
        var numero = document.getElementById("numero").value;
        var pedido = document.getElementById("inputPedido").value;
        var preco = document.getElementById("inputPreco").value;
        var endereco = document.getElementById("endereco").value;

        // Monta a mensagem exatamente com os dados do formulário
        var mensagem =
            "Nome: " + nome + "\n" +
            "Número: " + numero + "\n" +
            "Pedido: " + pedido + "\n" +
            "Preço: " + preco + " Kz\n" +
            "Endereço: " + endereco;

        // Número do WhatsApp que vai RECEBER a mensagem 
        var numeroWhatsapp = "244945784743"; // --> O número pode ser alterado

        // Codifica a mensagem para ir na URL
        var mensagemCodificada = encodeURIComponent(mensagem);

        // Monta o link e abre em nova aba
        var link = "https://api.whatsapp.com/send?phone=" + numeroWhatsapp + "&text=" + mensagemCodificada;
       window.location.href = link;
    }
});


