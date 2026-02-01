/// <reference types="cypress" />

// importujemy Page Object strony kontaktowej
import ContactPage from '../support/pages/ContactPage';

describe('Contact Page Automation Tests', () => {

    // beforeEach wykona się przed każdym testem
    beforeEach('Open contact page', () => {

        // ustawiamy widok desktopowy
        cy.setViewport('desktop');

        // przechodzimy na stronę formularza
        ContactPage.visit();
    });


    // TEST 1 — widoczność formularza


    it('Should display contact form elements', () => {

        // sprawdzamy czy pole imienia jest widoczne
        ContactPage.nameInput.should('be.visible');

        // sprawdzamy czy pole email jest widoczne
        ContactPage.emailInput.should('be.visible');

        // sprawdzamy czy przycisk submit istnieje
        ContactPage.submitButton.should('be.visible');
    });


    // TEST 2 — pusty formularz


    it('Should show validation errors when submitting empty form', () => {

        // wysyłamy pusty formularz
        ContactPage.submitForm();

        // sprawdzamy czy pojawił się komunikat walidacyjny
        ContactPage.validationError.should('be.visible');
    });


    // TEST 3 — wpisywanie danych
    

    it('Should allow filling contact form fields', () => {

        // uzupełniamy podstawowe dane formularza
        ContactPage.fillBasicForm(
            'Jan Kowalski',
            'test@test.pl',
            '600600600'
        );

        // weryfikujemy czy dane zostały poprawnie wpisane
        ContactPage.nameInput.should('have.value', 'Jan Kowalski');
        ContactPage.emailInput.should('have.value', 'test@test.pl');
        ContactPage.phoneInput.should('have.value', '600600600');
    });


    // TEST 4 — select kraj


    it('Should allow selecting country', () => {

        // wybieramy kraj z listy
        ContactPage.selectCountry('Polska');

        // sprawdzamy czy wartość została ustawiona
        ContactPage.countrySelect.should('have.value', 'Polska');
    });


    // TEST 5 — checkbox zgody
  

    it('Should allow checking and unchecking consent checkbox', () => {

        // zaznaczamy checkbox
        ContactPage.checkConsent();

        // sprawdzamy czy jest zaznaczony
        ContactPage.consentCheckbox.should('be.checked');

        // odznaczamy checkbox
        ContactPage.uncheckConsent();

        // sprawdzamy czy jest odznaczony
        ContactPage.consentCheckbox.should('not.be.checked');
    });

    // TEST 6 — błędny email


    it('Should display error for invalid email format', () => {

        // wpisujemy niepoprawny email
        ContactPage.emailInput.type('zlyemail');

        // wysyłamy formularz
        ContactPage.submitForm();

        // sprawdzamy komunikat walidacji
        ContactPage.validationError.should('be.visible');
    });

});