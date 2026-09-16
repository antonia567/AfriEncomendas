// Conexão com o Supabase
const SUPABASE_URL = "https://cxswwroyouxehshbhpls.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4c3d3cm95b3V4ZWhzaGJocGxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5ODA4MjUsImV4cCI6MjEwNDU1NjgyNX0.xpmTVFbG0Os5HuCBua777Rk-eL_SeqqGH6FEED4GXrQ";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Preço de cada item 
var precosPorItem = {
    "Bolo Normal": 6000,
    "Bolo de Chocolate": 12000,
    "Bolas de Berlin": 100, "Bolinhos": 100,
    "Salgadinho Recheado de Salsicha": 100,
    "Salgadinho Recheado de Peixe": 150,
    "Salgadinho Recheado de Frango": 200,
    "Rissóis": 250, "Argolas": 100,
    "Hambúrguer Simples": 2500, "Hambúrguer Composto": 3500,
     "Cachorro-quente": 300, "Sandes": 1000,
    "Camisa Zegna": 13000, "camisa":13000,
    "Camisa Casa Blanca": 13000,
     "Calças": 20000, "Calções": 15000,
    "Paracetamol 500mg": 300, "Ibuprofeno 200mg": 800,
    "Vitamina C 500mg": 300, "Aspirina BP 100mg": 300,
    "Ácido Fólico BP 5mg": 100,
    "Creme Nivea": 3000, "Perfume": 2500,
    "Gel de Cabelo": 1000, "Boss": 25000
};

function calcularPreco() {
    var taxa = 300;
    var pedido = document.getElementById("inputPedido").value;
    var quantidade = parseFloat(document.getElementById("quantidades").value);
    var campoPreco = document.getElementById("inputPreco");

    if (pedido && precosPorItem[pedido] && quantidade > 0) {
        var total = precosPorItem[pedido] * quantidade + taxa;
        campoPreco.value = total + " Kz";
    } else {
        campoPreco.value = "";
    }
}

document.getElementById("inputPedido")?.addEventListener("change", calcularPreco);
document.getElementById("quantidades")?.addEventListener("input", calcularPreco);

 //Opções do select categoria
var itensPorCategoria = {
    "Doces": ["Bolo de Chocolate",  "Bolo Normal", "Bolas de Berlin", "Bolinhos", "Argolas", "Salgadinho Recheado de Salsicha", 
        "Salgadinho Recheado de Peixe", "Salgadinho Recheado de Frango", "Rissóis"],
    "Comidas Rápidas": ["Hambúrguer Simples", "Hambúrguer Composto", "Cachorro-quente", "Sandes"],
    "Roupas": ["Camisa Zegna", "Camisa Casa Blanca", "Calças", "Calções"],
    "Medicamentos": ["Paracetamol 500mg", "Ibuprofeno 200mg" ,"Vitamina C 500mg","Aspirina BP 100mg","Ácido Fólico BP 5mg"],
    "Cosméticos": ["Creme Nivea", "Perfume", "Gel de Cabelo"],
    "Sapatos" : ["Boss" ]
};

function preencherPedidos(categoria) {
    var selectPedido = document.getElementById("inputPedido");
     if (!selectPedido) return;
    selectPedido.innerHTML = '<option value="" disabled selected>Selecione uma opção</option>';

    if (categoria && itensPorCategoria[categoria]) {
        itensPorCategoria[categoria].forEach(function (item) {
            selectPedido.innerHTML += `<option value="${item}">${item}</option>`;
        });
    }
}

// Preenche o select de categorias
var selectCategoria = document.getElementById("inputCategoria");
if (selectCategoria) {
    Object.keys(itensPorCategoria).forEach(function (categoria) {
        selectCategoria.innerHTML += `<option value="${categoria}">${categoria}</option>`;
    });

    // Quando o usuário mudar a categoria, atualiza os pedidos
    selectCategoria.addEventListener("change", function () {
        preencherPedidos(this.value);
    });
}

if (selectCategoria) {
var params = new URLSearchParams(window.location.search);
var categoriaUrl = params.get("categoria");
var pedidoUrl = params.get("pedido");

if (categoriaUrl) {
    selectCategoria.value = categoriaUrl;
    preencherPedidos(categoriaUrl); // gera as opções certas de pedido

    if (pedidoUrl) {
        document.getElementById("inputPedido").value = pedidoUrl;
    }
}

}


//Erros dos campos
document.getElementById("btnEnviar")?.addEventListener("click", async function (e) {
    e.preventDefault(); // evita comportamento padrão, já que não há form

    var valido = true;

    // id do campo, id da mensagem de erro, texto do erro
    var campos = [
        ["nome", "erroNome", "Digite seu nome e sobrenome."],
        ["numero", "erroNumero", "Digite seu número de telemóvel."],
        ["inputCategoria", "erroCategoria", "Selecione uma categoria."],
        ["quantidades", "erroQuantidade","Digite a quantidade"],
        ["inputPedido", "erroPedido", "Selecione um pedido."],
        ["endereco", "erroEndereco", "Digite o seu endereço."],
        ["inputPreco", "erroPreco", "A quantidade não pode ser negativa"]
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
         console.log("Entrou no bloco de envio!");
        // Pega os valores preenchidos
        var nome = document.getElementById("nome").value;
        var numero = document.getElementById("numero").value;
        var categoria = document.getElementById("inputCategoria").value;
        var pedido = document.getElementById("inputPedido").value;
        var quantidades = document.getElementById("quantidades").value;
        var preco = document.getElementById("inputPreco").value;
        var endereco = document.getElementById("endereco").value;
        var precoNumerico = parseFloat(preco.replace(/[^\d.,]/g, "").replace(",", "."));
        console.log("Valor do campo preco (texto):", preco);
        console.log("Valor convertido (precoNumerico):", precoNumerico);


        // Busca o id do produto pelo nome selecionado
        var { data: produtoEncontrado, error: erroBuscaProduto } = await supabaseClient
            .from("produtos")
            .select("id")
            .eq("nome", pedido)
            .single();

        if (erroBuscaProduto) {
            console.error("Produto não encontrado no banco:", erroBuscaProduto);
        }

        // Salva o pedido no Supabase antes de enviar ao WhatsApp
        var { error: erroPedido } = await supabaseClient.from("pedidos").insert({
            nome_cliente: nome,
            numero_cliente: numero,
            produto_id: produtoEncontrado ? produtoEncontrado.id : null,
            quantidade: parseInt(quantidades),
            preco_total: precoNumerico,
            endereco: endereco,
            status: "pendente"
        });

        if (erroPedido) {
    console.error("Erro ao salvar pedido no banco:", JSON.stringify(erroPedido, null, 2));

            // Mesmo com erro ao salvar, continuamos enviando pro WhatsApp
        }
    
        // Monta a mensagem exatamente com os dados do formulário
        var mensagem =
            "Nome: " + nome + "\n" +
            "Número: " + numero + "\n" +
            "Categoria: " + categoria + "\n" +
            "Pedido: " + pedido + "\n" +
            "Quantidade: " + quantidades + "\n" +
            "Preço: " + preco + "\n" +
            "Endereço: " + endereco;

        // Número do WhatsApp que vai receber a mensagem 
        var numeroWhatsapp = "244945784743"; // --> O número pode ser alterado

        // Codifica a mensagem para ir na URL
        var mensagemCodificada = encodeURIComponent(mensagem);

        // Monta o link e abre em nova aba
        var link = "https://api.whatsapp.com/send?phone=" + numeroWhatsapp + "&text=" + mensagemCodificada;
        window.location.href = link;
    }   
});

 //==========Mecanismo de Busca==========//

 var todosProdutos = [
    { nome: "Bolo Normal", categoria: "Doces", link: "doces.html" },
    { nome: "Bolo de Chocolate", categoria: "Doces", link: "doces.html" },
    { nome: "Bolas de Berlin", categoria: "Doces", link: "doces.html" },
    { nome: "Bolinhos", categoria: "Doces", link: "doces.html" },
    { nome: "Argolas", categoria: "Doces", link: "doces.html" },
    { nome: "Salgadinhos recheados de salsicha", categoria: "Doces", link: "doces.html" },
    { nome: "Salgadinhos recheados de peixe", categoria: "Doces", link: "doces.html" },
    { nome: "Salgadinhos recheados de frango", categoria: "Doces", link: "doces.html" },
    { nome: "Rissóis", categoria: "Doces", link: "doces.html" },
    { nome: "Hambúrguer", categoria: "Comidas Rápidas", link: "comidasRapidas.html" },
    { nome: "Cachorro-quente", categoria: "Comidas Rápidas", link: "comidasRapidas.html" },
    { nome: "Sandes", categoria: "Comidas Rápidas", link: "comidasRapidas.html" },
    { nome: "Camisa Zegna", categoria: "Roupas", link: "roupas.html" },
    { nome: "Camisa", categoria: "Roupas",link: "roupas.html"},
    { nome: "Camisa Casa Blanca", categoria: "Roupas", link: "roupas.html"},
    { nome: "Calças", categoria: "Roupas", link: "roupas.html" },
    { nome: "Calções", categoria: "Roupas", link: "roupas.html" },
    { nome: "Paracetamol", categoria: "Medicamentos", link: "medicamentos.html" },
    { nome: "Ibuprofeno", categoria: "Medicamentos", link: "medicamentos.html" },
    { nome: "Medicamento", catrgoria: "Medimentos", link: "medicamentos.html"},
    { nome: "Acido Fólico", categoria: "Medicamentos", link: "medicamentos.html"},
    { nome: "Aspirina", categoria: "Medicamentos", link: "medicamentos.html"},
    { nome: "Vitamina C", categoria: "Medicamentos", link: "medicamentos.html"},
    { nome: "Creme Nivea", categoria: "Cosméticos", link: "cosmeticos.html" },
    { nome: "Perfume", categoria: "Cosméticos", link: "cosmeticos.html" },
    { nome: "Gel de Cabelo", categoria: "Cosméticos", link: "cosmeticos.html" }, 
    { nome: "Nike", categoria: "Sapatos", link: "sapatos.html" },
    { nome: "Chinela", cateria: "Sapatos", link: "sapatos.html" },
    { nome: "sapato", categoria: "Sapatos", link: "sapatos.html"}
];

var inputBusca = document.getElementById("caixa-busca");
var caixaResultados = document.getElementById("resultados-busca");

if (inputBusca && caixaResultados) {
    inputBusca.addEventListener("input", function () {
        var termo = this.value.trim().toLowerCase();

        if (termo === "") {
            caixaResultados.classList.remove("ativo");
            caixaResultados.innerHTML = "";
            return;
        }

        var encontrados = todosProdutos.filter(function (produto) {
            return produto.nome.toLowerCase().includes(termo);
        });

        if (encontrados.length === 0) {
            caixaResultados.innerHTML = '<div class="resultado-vazio">Nenhum produto encontrado.</div>';
        } else {
            caixaResultados.innerHTML = encontrados.map(function (produto) {
                return `<a href="${produto.link}?pedido=${encodeURIComponent(produto.nome)}" class="resultado-item">
                        <strong>${produto.nome}</strong><br>
                        <span class="resultado-categoria">${produto.categoria}</span>
                    </a>`;
            }).join("");
        }

        caixaResultados.classList.add("ativo");
    });

    // Fecha o dropdown se clicar fora
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".form-busca")) {
            caixaResultados.classList.remove("ativo");
        }
    });
}

// === Carregar categorias na página inicial ===
async function carregarCategorias() {
    const container = document.getElementById("categorias-grid");
    if (!container) return;

    const { data: categorias, error } = await supabaseClient.from("categorias").select("*");

    if (error) {
        console.error("Erro ao carregar categorias:", error);
        return;
    }


// Mapeia o nome da categoria para a classe de cor correspondente
var classesCor = {
    "Doces": "icone-doces",
    "Comidas Rápidas": "icone-fastfood",
    "Roupas": "icone-roupas",
    "Sapatos": "icone-sapatos",
    "Medicamentos": "icone-medicamentos",
    "Cosméticos": "icone-cosmeticos"
};

container.innerHTML = categorias.map(function (cat) {
    var classeCor = classesCor[cat.nome] || "";
    return `
        <a href="${cat.pagina}" class="card-link">
            <div class="card">
                <div class="card-pagina">
                    <i class="fa-solid ${cat.icone} ${classeCor}"></i>
                </div>
                <div class="texto-categoria">
                    <h2>${cat.nome}</h2>
                </div>
            </div>
        </a>
    `;
}).join("");
}

carregarCategorias();


// === Carregar produtos de uma categoria específica ===
async function carregarProdutos(nomeCategoria) {
    const container = document.getElementById("produtos-grid");
    if (!container) return;

    // Busca o id da categoria pelo nome
    const { data: categoria, error: erroCategoria } = await supabaseClient
        .from("categorias")
        .select("id")
        .eq("nome", nomeCategoria)
        .single();

    if (erroCategoria || !categoria) {
        console.error("Categoria não encontrada:", erroCategoria);
        return;
    }

    // Busca os produtos dessa categoria
    const { data: produtos, error: erroProdutos } = await supabaseClient
        .from("produtos")
        .select("*")
        .eq("categoria_id", categoria.id)
        .eq("ativo", true);

    if (erroProdutos) {
        console.error("Erro ao carregar produtos:", erroProdutos);
        return;
    }

    container.innerHTML = produtos.map(function (produto) {
        return `
            <article class="card">
                <div class="card-pedido">
                    <img src="${produto.imagem_url || 'placeholder.jpg'}" alt="${produto.nome}">
                </div>
                <div class="texto-abaixo">
                    <h4>${produto.nome}</h4>
                    <p>Preço: ${produto.preco} Kz</p>
                    <a href="contacto.html?categoria=${encodeURIComponent(nomeCategoria)}&pedido=${encodeURIComponent(produto.nome)}" class="btn-card-encomendar">Encomendar</a>
                </div>
            </article>
        `;
    }).join("");
}


// === Login de administrador === //
document.getElementById("btnLoginAdmin")?.addEventListener("click", async function () {
    var email = document.getElementById("adminEmail").value.trim();
    var senha = document.getElementById("adminSenha").value.trim();
    var erroEmail = document.getElementById("erroAdminEmail");
    var erroSenha = document.getElementById("erroAdminSenha");

    erroEmail.textContent = "";
    erroSenha.textContent = "";

    if (!email) {
        erroEmail.textContent = "Digite seu email.";
        return;
    }
    if (!senha) {
        erroSenha.textContent = "Digite sua senha.";
        return;
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: senha
    });

    if (error) {
        erroSenha.textContent = "Email ou senha incorretos.";
        console.error("Erro de login:", error);
        return;
    }

    // Login bem-sucedido — redireciona para o painel
    window.location.href = "admin-painel.html";
});


// ---- Proteção do painel administrativo ----
async function verificarLoginAdmin() {
    var statusEl = document.getElementById("statusLogin");
    if (!statusEl) return; // só roda na página do painel

    const { data: { session } } = await supabaseClient.auth.getSession();

    if (!session) {
        // Não está logado, redireciona para o login
        window.location.href = "admin-login.html";
        return;
    }

    statusEl.textContent = "Logado como: " + session.user.email;
}

verificarLoginAdmin();

//=== Botão de sair (logout) ===
document.getElementById("btnLogout")?.addEventListener("click", async function () {
    await supabaseClient.auth.signOut();
    window.location.href = "admin-login.html";
});

// === Carregar pedidos no painel administrativo ===
async function carregarPedidos() {
    const container = document.getElementById("lista-pedidos");
    if (!container) return;

   const { data: pedidos, error } = await supabaseClient
    .from("pedidos")
    .select("*, produtos(nome)")
      .order("created_at", { ascending: false }); // mais recentes primeiro

    if (error) {
        console.error("Erro ao carregar pedidos:", error);
        container.innerHTML = "<p>Erro ao carregar pedidos.</p>";
        return;
    }

    if (pedidos.length === 0) {
        container.innerHTML = "<p>Nenhum pedido recebido ainda.</p>";
        return;
    }

       container.innerHTML = pedidos.map(function (pedido) {
    var nomeProduto = pedido.produtos ? pedido.produtos.nome : "Produto não encontrado";
    return `
        <tr>
            <td>${pedido.nome_cliente}</td>
            <td>${pedido.numero_cliente}</td>
            <td>${nomeProduto}</td>
            <td>${pedido.quantidade}</td>
            <td>${pedido.preco_total} Kz</td>
            <td>${pedido.endereco}</td>
            <td>${pedido.status}</td>
        </tr>
    `;
}).join("");
}

carregarPedidos();

//========== Cadastro de cliente ==========//

document.getElementById("btn-cadastrar")?.addEventListener("click", async function (e) {
    e.preventDefault();

    var valido = true;

    var campos = [
        ["nomeCadastro", "erroNomeCadastro", "Digite seu nome e sobrenome."],
        ["numeroCadastro", "erroNumeroCadastro", "Digite seu número de telemóvel."],
        ["enderecoCadastro", "erroEnderecoCadastro", "Digite seu endereço."],
        ["emailCadastro", "erroEmailCadastro", "Digite seu email."],
        ["senhaCadastro", "erroSenhaCadastro", "Digite uma senha."],
        ["confirmarSenhaCadastro", "erroConfSenhaCadastro", "Confirme sua senha."]
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

    var senha = document.getElementById("senhaCadastro").value;
    var confirmarSenha = document.getElementById("confirmarSenhaCadastro").value;
    var erroConfSenha = document.getElementById("erroConfSenhaCadastro");

    if (senha && confirmarSenha && senha !== confirmarSenha) {
        erroConfSenha.textContent = "As senhas não coincidem.";
        document.getElementById("confirmarSenhaCadastro").classList.add("campo-invalido");
        valido = false;
    }

    if (!valido) return;

    var nome = document.getElementById("nomeCadastro").value;
    var numero = document.getElementById("numeroCadastro").value;
    var email = document.getElementById("emailCadastro").value;
    var endereco = document.getElementById("enderecoCadastro").value;

    //  Cria a conta de autenticação (email + senha)
    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: senha
    });

    if (error) {
        alert("Erro ao criar conta: " + error.message);
        console.error("Erro no cadastro:", error);
        return;
    }

    var userId = data.user.id;

    // Insere os dados extras na tabela clientes, usando o mesmo id
    const { error: erroCliente } = await supabaseClient.from("clientes").insert({
        id: userId,
        nome: nome,
        numero: numero,
        endereco: endereco, 
    });

    if (erroCliente) {
        console.error("Erro ao salvar dados do cliente:", erroCliente);
        alert("Conta criada, mas houve um erro ao salvar seus dados. Contacte o suporte.");
        return;
    }

    alert("Cadastro realizado com sucesso!");
    window.location.href = "index.html"; // ou para onde fizer sentido redirecionar
});

 //=== Mostrar/ocultar senha ===
document.querySelectorAll(".toggle-senha").forEach(function (icone) {
    icone.addEventListener("click", function () {
        var input = document.getElementById(this.dataset.target);
        if (input.type === "password") {
            input.type = "text";
            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");
        } else {
            input.type = "password";
            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");
        }
    });
});

//==========Login do cliente==========//
document.getElementById("btnEntrar")?.addEventListener("click", async function (e) {
    e.preventDefault();

    var email = document.getElementById("emailLogin").value.trim();
    var senha = document.getElementById("senhaLogin").value.trim();
    var erroEmail = document.getElementById("erroEmailLogin");
    var erroSenha = document.getElementById("erroSenhaLogin");

    erroEmail.textContent = "";
    erroSenha.textContent = "";

    if (!email) {
        erroEmail.textContent = "Digite seu email.";
        return;
    }
    if (!senha) {
        erroSenha.textContent = "Digite sua senha.";
        return;
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: senha
    });

    if (error) {
        erroSenha.textContent = "Email ou senha incorretos. ";
        console.error("Erro de login:", error);
        return;
    }

    // Redireciona para onde o cliente estava tentando ir
    window.location.href = "contacto.html";
});


// === Verificar login e preencher dados do cliente em contacto.html ===//
async function verificarClienteLogado() {
    var campoNome = document.getElementById("nome");
    if (!campoNome) return; // só roda em contacto.html

    const { data: { session } } = await supabaseClient.auth.getSession();

    if (!session) {
        // Não está logado, manda para o login
        window.location.href = "login.html";
        return;
    }

    // Busca os dados do cliente na tabela clientes
    const { data: cliente, error } = await supabaseClient
        .from("clientes")
        .select("*")
        .eq("id", session.user.id)
        .single();

    if (error || !cliente) {
        console.error("Erro ao buscar dados do cliente:", error);
        return;
    }

    // Preenche os campos automaticamente
    document.getElementById("nome").value = cliente.nome;
    document.getElementById("numero").value = cliente.numero;
    document.getElementById("endereco").value = cliente.endereco;
}

verificarClienteLogado();

