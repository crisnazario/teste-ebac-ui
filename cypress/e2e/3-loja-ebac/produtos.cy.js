/// <reference types="cypress"/>
import produtosPage from "../../support/pageObjects/produtos.page";

describe("Funcionalidade: Produtos", () => {

    beforeEach(() => {
        produtosPage.visitaUrl()
    })

    it("Deve selecionar um produto da lista", () => {
        produtosPage.buscarProdutoLista('Ajax Full-Zip Sweatshirt')
        cy.get('#tab-title-description > a').should("contain", "Descrição")
    })

    it('Deve buscar um produto com sucesso', () => {
        let nomeProduto = 'Atlas Fitness Tank'
        produtosPage.buscarProduto(nomeProduto)
        cy.get('.product_title').should("contain", nomeProduto)
    });

    it('Deve visitar a página do produto', () => {
        produtosPage.visitarProduto("Ariel Roll Sleeve Sweatshirt")
        cy.get('.product_title').should("contain", "Ariel Roll Sleeve Sweatshirt")
    });

    it('Deve adicionar um produto ao carrinho', () => {
        let qtd = 2;
        produtosPage.buscarProduto("Ariel Roll Sleeve Sweatshirt")
        produtosPage.addProdutoCarrinho("M", "Purple", qtd)

        cy.get('.woocommerce-message').should("contain", qtd +" × “Ariel Roll Sleeve Sweatshirt” foram adicionados no seu carrinho.")
    });

    it.only('Deve adicionar um produto ao carrinho buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados => {
            const posicao = 2
            produtosPage.buscarProduto(dados[posicao].nomeProduto)
            produtosPage.addProdutoCarrinho(
                dados[posicao].tamanho, 
                dados[posicao].cor, 
                dados[posicao].quantidade)

            cy.get('.woocommerce-message').should("contain", `${dados[posicao].quantidade} × “${dados[posicao].nomeProduto}” foram adicionados no seu carrinho.`)
        })       
    });

})

