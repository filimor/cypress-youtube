/// <reference types="cypress" />

import Logon from "../support/pages/Logon";
import NewIncident from "../support/pages/NewIncident";
import Profile from "../support/pages/Profile";
import Register from "../support/pages/Register";

describe('Ongs', () => {
    it('Devem poder realizar um cadastro', () => {
        Register.acessarCadastro();
        Register.preencherCadastro();
        Register.validarCadastro();
    });

    it('Devem poder realizar um login no sistema', () => {
        Logon.acessarLogin();
        Logon.preencherLogin();
    });

    it('Devem poder fazer logout', () => {
        cy.login();
        Profile.clicarEmLogout();
    });

    it('Devem poder cadastrar novos casos', () => {
        cy.login();

        Profile.clicarEmNovoCaso();
        NewIncident.preencherCadastro();
        NewIncident.validarCadastro();
    });

    it.only('Devem poder excluir um caso', () => {
        cy.createNewIncident();
        cy.login();

        Profile.clicarEmExcluirCaso();
        Profile.validarExclusaoDeCaso();

        
    });
});