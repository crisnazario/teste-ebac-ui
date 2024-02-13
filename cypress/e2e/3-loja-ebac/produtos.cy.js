/// <reference types="cypress"/>

describe("Funcionalidade: Produtos", () => {

    beforeEach(() => {
        cy.visit("produtos")
    })

    it.only("Deve selecionar um produto da lista", () => {
        cy.get('.products > .row')
            //.first()
            //.eq(2)
            .contains("Ajax Full-Zip Sweatshirt")
            .click()

        cy.get('#tab-title-description > a').should("contain", "Descrição")
    })



})

