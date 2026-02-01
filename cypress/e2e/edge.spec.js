/// <reference types="cypress" />

import ContactPage from '../support/pages/ContactPage';

describe('Edge Case Tests', () => {

    beforeEach('Open contact page for edge tests', () => {

        // ustawiamy widok desktopowy
        cy.setViewport('desktop');

        // przechodzimy na stronę formularza
        ContactPage.visit();

        // ładujemy dane edge cases
        cy.fixture('edgeCases').as('edge');

    });

    // EDGE TEST 1 — SQL injection attempt

it('Should block SQL injection attempt in email field', function () {

    // wpisujemy payload SQL injection do pola email
    ContactPage.fillEmail(this.edge.sqlInjection);

    // wysyłamy formularz
    ContactPage.submitForm();

    // sprawdzamy czy formularz NIE został wysłany poprawnie
    // oczekujemy komunikatu walidacyjnego
    ContactPage.validationError.should('be.visible');

});

// EDGE TEST 2 — emoji input

it('Should handle emoji characters in name field', function () {

    // wpisujemy emoji do pola imienia
    ContactPage.fillName(this.edge.emojiText);

    // sprawdzamy czy pole nie jest puste
    ContactPage.nameInput.should('not.have.value', '');

    // sprawdzamy czy emoji faktycznie zostały zapisane
    ContactPage.nameInput
        .invoke('val')
        .should('contain', '🔥');

});

    // EDGE TEST 3 — very large text paste (wklejanie)

    it('Should allow pasting very large text into input field', function () {

        // symulujemy wklejenie bardzo dużego tekstu do pola imienia
        ContactPage.nameInput
            .clear()
            .invoke('val', this.edge.longText)
            .trigger('input'); // informuje framework JS o zmianie wartości

        // sprawdzamy czy pole nie jest puste
        ContactPage.nameInput.should('not.have.value', '');

        // sprawdzamy czy ilość znaków jest bardzo duża
        ContactPage.nameInput
            .invoke('val')
            .should('have.length.greaterThan', 500);

});

    // EDGE TEST  — bardzo długi input (pisanie ręczne)

    it('Should handle very long text input without breaking the form', function () {

    // wpisujemy bardzo długi tekst do pola imienia
    ContactPage.fillName(this.edge.longText);

    // sprawdzamy czy pole nie jest puste po wpisaniu danych
    ContactPage.nameInput.should('not.have.value', '');

    // sprawdzamy czy długość wpisanego tekstu jest większa niż 100 znaków
    ContactPage.nameInput
        .invoke('val')
        .should('have.length.greaterThan', 100);

});






});