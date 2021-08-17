const el = require('./elements').ELEMENTS;

class Profile {
    clicarEmLogout() {
        cy.get(el.logoutButton).click();
    }

    clicarEmNovoCaso() {
        cy.get(el.newIncidentButton).click();
    }

    clicarEmExcluirCaso() {
        cy.intercept('DELETE', '**/incidents/*').as('deleteIncident');
        cy.get(el.deleteButton).click();
    }

    validarExclusaoDeCaso() {
        cy.wait('@deleteIncident').then((xhr) => {
            expect(xhr.response.statusCode).to.eq(204);
            expect(xhr.response.body).to.be.empty;
        })
    }
}

export default new Profile();