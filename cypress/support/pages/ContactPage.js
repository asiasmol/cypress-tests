class ContactPage {


    // pole imię i nazwisko
    get nameInput() {
        return cy.get('#wpforms-10-field_0');
    }

    // pole email
    get emailInput() {
        return cy.get('#wpforms-10-field_1');
    }

    // pole telefon
    get phoneInput() {
        return cy.get('#wpforms-10-field_3');
    }

    // select kraj
    get countrySelect() {
        return cy.get('#wpforms-10-field_4');
    }

    // checkbox zgody
    get consentCheckbox() {
        return cy.get('#wpforms-10-field_5_2');
    }

    // przycisk submit
    get submitButton() {
        return cy.get('#wpforms-submit-10');
    }

    // komunikaty błędów formularza
    get validationError() {
        return cy.get('.wpforms-error');
    }

    // otwarcie strony kontaktowej
    visit() {
        cy.visit('/contact');
    }

    // wpisywanie imienia
    fillName(name) {
        this.nameInput.clear().type(name);
    }

    // wpisywanie emaila
    fillEmail(email) {
        this.emailInput.clear().type(email);
    }

    // wpisywanie telefonu
    fillPhone(phone) {
        this.phoneInput.clear().type(phone);
    }

    // wybór kraju z listy
    selectCountry(country) {
        this.countrySelect.select(country);
    }

    // uzupełnienie podstawowych danych formularza
    fillBasicForm(name, email, phone) {
        this.fillName(name);
        this.fillEmail(email);
        this.fillPhone(phone);
    }

    // zaznaczenie checkboxa zgody
    checkConsent() {
        this.consentCheckbox.check();
    }

    // odznaczenie checkboxa zgody
    uncheckConsent() {
        this.consentCheckbox.uncheck();
    }

    // wysłanie formularza
    submitForm() {
        this.submitButton.click();
    }

}

export default new ContactPage();