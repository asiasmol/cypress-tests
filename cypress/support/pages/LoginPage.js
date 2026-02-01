class LoginPage {
    //lokalizator getter
    get inputUsername() {
        return cy.get('#username');
    }
      
    get inputPassword() {
        return cy.get('#password');
    }

    get rememberMeCheckbox() {
        return cy.get('#rememberme');
    }

    get loginButton() {
        return cy.get(`button[name="login"]`);
    }

    get errorMessage() {
        return cy.get('.woocommerce-error li');

    }

    //uzupełnianie formularza
    fillForm(username, password, rememberMe = false) {
        this.inputUsername.type(username);
        this.inputPassword.type(password);
    }

    checkRememberMe() {
        this.rememberMeCheckbox.check();
    }

    unCheckRememberMe() {
        this.rememberMeCheckbox.uncheck();
    }
    
    submitForm() {
        this.loginButton.click();
    }



}

export default new LoginPage();
//eksportujemy i inicjalizujemy 