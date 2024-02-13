class ProdutoPage {
    
    visitaUrl() {
        cy.visit("produtos")
    }

    buscarProduto(nomeProduto) {
        cy.get('[name="s"]').eq(1).type(nomeProduto)
        cy.get('.search > .tbay-search-form > .form-ajax-search > .form-group > .input-group > .button-group > .button-search').click()
    }

    buscarProdutoLista(nomeProduto) {
        cy.log("Nome do produto => "+nomeProduto)
        cy.get('.products > .row')
            .contains(nomeProduto)
            .click()
    }

    visitarProduto(nomeProduto) {
        const urlFormatada = nomeProduto.replace(/ /g, '-')
        cy.visit(`produtos/${urlFormatada}`)
    }

    addProdutoCarrinho(tamanho, cor, quantidade) {
        cy.wait(3000);
        cy.get('.button-variable-item-' + tamanho).click()
        cy.get('.button-variable-item-'+cor).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
    }
}

export default new ProdutoPage()