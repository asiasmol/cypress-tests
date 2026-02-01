/// <reference types="cypress" />

// importuje Page Object menu
import MenuPage from '../support/pages/MenuPage';

describe('Main Menu Navigation Tests', () => {

    // beforeEach wykona się przed każdym testem
    beforeEach('Open home page', () => {

        // ustawiamy widok desktopowy
        cy.setViewport('desktop');

        // otwieramy stronę główną
        cy.visit('/');
    });


    // TEST 1 — przejście do About


    it('Should navigate to About page from menu', () => {

        // klikamy w zakładkę About w menu
        MenuPage.clickAbout();

        // sprawdzamy czy adres URL zmienił się na /about
        cy.url().should('contain', '/about');

        // sprawdzamy czy nagłówek strony About jest widoczny
        cy.get('h1').should('be.visible');
    });


    // TEST 2 — przejście do Contact


    it('Should navigate to Contact page from menu', () => {

        // klikamy w zakładkę Contact
        MenuPage.clickContact();

        // sprawdzamy czy jesteśmy na stronie kontaktowej
        cy.url().should('contain', '/contact');

        // sprawdzamy czy formularz kontaktowy istnieje
        cy.get('#wpforms-submit-10').should('be.visible');
    });


    // TEST 3 — powrót na Home


    it('Should navigate back to Home page', () => {

        // przechodzimy najpierw na About
        MenuPage.clickAbout();

        // wracamy na Home
        MenuPage.clickHome();

        // sprawdzamy czy wróciliśmy na stronę główną
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    // TEST 4 — obsługa podmenu


    it('Should open submenu and navigate to submenu page', () => {

        // najeżdżamy myszką na menu Shop
        MenuPage.openShopMenu();

        // klikamy element z podmenu
        MenuPage.clickShopSubmenuItem();

        // sprawdzamy czy nastąpiła zmiana URL
        cy.url().should('not.eq', Cypress.config().baseUrl + '/');
    });

});