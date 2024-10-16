let carrinho = json.parse(localStorage.getItem('carrinho')) || [];
let total = carrinho.reduce((acc, item) = acc + item.preco * item.quantidade, 0); 

const estoqueProdutos = {
    1: 5,
    2: 3,
    3: 10,
    4: 15
};

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarQantidadeCarrinho();
}

function adicionarAoCarrinho(nomeProduto, preco, produtoId) {
    const produtoExistente = carrinho.find(item = item.nome === nomeProduto);
    const estoqueAtual = estoqueProdutos[produtoId];

    if (estoqueAtual > 0){
        if (produtoExistente) {
            produtoExistente.quantidade++;
        }else {
            carrinho.push({nome: nomeProduto, preco: preco, quantidade: 1});
        }
        estoqueProdutos[produtoId]--;
        atualizarEstoque(produtoId);
        total += preco;
        salvarCarrinho();
        alert('Produto adicionado ao Carrinho!');
    }else {
        alert('Produto esgotado!');
    }   
}

function atualizarEstoque(produtoId) {
    const estoqueElemento = document.getElementById('estoque-produtoo-${produtoId}');
    const botaoElemento = document.getElementById('btn-produto-${produtoId}');

    estoqueElemento.textContent = 'Estoque: ${estoqueProdutos[produtoId]}';
    if (estoqueProdutos[produtoId] === 0) {
        botaoElemento.disable = true;
        botaoElemento.textContent = "Esgotado";
    }
}

function atualizarCarrinho {
    const listaCarrinho = document.getElementById('listaCarrinho');
    const totalElemento = document.getElementById('total');

    if (listaCarrinho && totalElemento) {
        listaCarrinho.innerHTML = '';
        carrinho.forEach(element => {
            const li = document.createElement('li');
            li.innerHTML = `
            ${item.none} - R$ ${iten.preco.toFixed(2)} x ${iten.quantidade}
            <button onclick="removerDoCarrinho('${iten.none}')">Remover Um</button>
            <input type="number" min="1" value="${iten.quantidade}" onchange="ajustarQuantidade('${iten.none}', this.value)">
            `;
            listaCarrinho.append(li);
        });
        totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`;
    }
}

function atualizarQantidadeCarrinho {
    const quantidadeCarrinhoElemento = document.getElementById('quantidadeCarrinho');
    const quantidadeTotal = carrinho.reduce((acc, iten) => acc + iten.quantidade, 0);
    if (quantidadeCarrinhoElemento){
        quantidadeCarrinhoElemento.textContent = quantidadeTotal;
    }
}