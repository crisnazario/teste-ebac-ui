/// <reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')

//cris.teste@email.com
//admin123

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit("minha-conta")
    })

    afterEach(() => {
        cy.screenshot()
    })

    it('Deve fazer login com sucesso', () => {        
        cy.get('#username').type("cris.teste@email.com")
        cy.get('#password').type("admin123")
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', "Olá, cris.teste (não é cris.teste? Sair)")
    })

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {       
        cy.get('#username').type("criss@email.com")
        cy.get('#password').type("admin123")
        cy.get('.woocommerce-form > .button').click()
        
       // cy.get('.woocommerce-error > li').should('contain', "Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.")
        cy.get('.woocommerce-error > li').should('exist')
    });

    it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {       
        cy.get('#username').type("cris.teste@email.com")
        cy.get('#password').type("admin3")
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error > li').should('contain', "Erro: A senha fornecida para o e-mail cris.teste@email.com está incorreta. Perdeu a senha?")

    });

    it("Deve fazer login com sucesso usando massa de dados", () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', "Olá, cris.teste (não é cris.teste? Sair)")
    })

    it.only("Deve fazer login com sucesso usando - Usando fixture", () => {
        cy.fixture("perfil").then( dados => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha, {log: false})
            cy.get('.woocommerce-form > .button').click()
        })

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', "Olá, cris.teste (não é cris.teste? Sair)")
    })

})
