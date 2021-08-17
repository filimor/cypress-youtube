const el = require('./elements').ELEMENTS;

class Register {
    acessarCadastro() {
        cy.visit('http://localhost:3000/register');
    }

    preencherCadastro() {
        cy.get(el.name).type('Dogs queridos');
        cy.get(el.email).type('dogs@mail.com');
        cy.get(el.whatsapp).type('51999999999');
        cy.get(el.city).type('Porto Alegre');
        cy.get(el.uf).type('RS');

        cy.intercept('POST', '**/ongs').as('postOng');

        cy.get(el.submitButton).click();
    }

    validarCadastro() {
        cy.wait('@postOng').then((xhr) => {
            expect(xhr.response.statusCode).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        });
    }
}

export default new Register();