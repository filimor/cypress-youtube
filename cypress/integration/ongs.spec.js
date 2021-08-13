/// <reference types="cypress" />

describe('Ongs', () => {
    it('Devem poder realizar um cadastro', () => {
        cy.visit('http://localhost:3000/register');
        cy.get('[data-cy=name]').type('Dogs queridos');
        cy.get('[data-cy=email]').type('dogs@mail.com');
        cy.get('[data-cy=whatsapp]').type('51999999999');
        cy.get('[data-cy=city]').type('Porto Alegre');
        cy.get('[data-cy=uf]').type('RS');

        cy.intercept('POST', '**/ongs').as('postOng');

        cy.get('[data-cy=submit]').click();

        cy.wait('@postOng').then((xhr) => {
            expect(xhr.response.statusCode).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        });
    });

    it('Devem poder realizar um login no sistema', () => {
        cy.visit('http://localhost:3000/');
        cy.get('[data-cy=id]').type(Cypress.env('createdOngId'));
        cy.get('[data-cy=button-login]').click();
    });

    it('Devem poder fazer logout', () => {
        cy.login();
        cy.get('[data-cy=button-logout]').click();
    });

    it('Devem poder cadastrar novos casos', () => {
        cy.login();
        cy.get('[data-cy=button-new-incident]').click();

        cy.get('[data-cy=title]').type('Animal abandonado');
        cy.get('[data-cy=description]').type('Animal precisa de apoio para ter onde morar.');
        cy.get('[data-cy=value]').type('200');

        cy.intercept('POST', '**/incidents').as('newIncident');

        cy.get('[data-cy=button-save]').click();

        cy.wait('@newIncident').then((xhr) => {
            expect(xhr.response.statusCode).to.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        });
    });

    it('Devem poder excluir um caso', () => {
        cy.createNewIncident();
        cy.login();

        cy.intercept('DELETE', '**/incidents/*').as('deleteIncident');

        cy.get('ul > :nth-child(1) > button').click();

        cy.wait('@deleteIncident').then((xhr) => {
            expect(xhr.response.statusCode).to.eq(204);
            expect(xhr.response.body).to.be.empty;
        })
    });
});