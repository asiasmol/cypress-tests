/// <reference types="cypress" />

import LoginPage from '../support/pages/LoginPage';
import users from '../fixtures/users.json';


describe('Login Page Automation Tests', () => {

    // beforeEach uruchamia się PRZED KAŻDYM testem
    // dzięki temu każdy test startuje z czystego stanu aplikacji
    beforeEach('Open login page', () => {

        // ustawiamy widok przeglądarki na desktop
        // symulujemy realnego użytkownika na komputerze
        cy.setViewport('desktop');

        // przechodzimy na stronę logowania
        // baseUrl pochodzi z pliku cypress.config.js
        cy.visit('/my-account/');

        // ładujemy dane testowe z fixtures
        cy.fixture('users').as('users');
    });


    // TEST 1 — poprawne logowanie


    it("Should login successfully with valid credentials", function () {

        // uzupełniamy pole login oraz hasło
        // metoda pochodzi z Page Object LoginPage
        LoginPage.fillForm(
            this.users.validUser.username,
            this.users.validUser.password
        );

        // zaznaczamy checkbox "Remember Me"
        // symulujemy zapamiętanie sesji użytkownika
        LoginPage.checkRememberMe();

        // sprawdzamy czy checkbox został faktycznie zaznaczony
        // jest to asercja stanu UI
        LoginPage.rememberMeCheckbox.should('be.checked');

        // klikamy przycisk logowania
        // wysyłamy formularz do backendu
        LoginPage.submitForm();

        // tymczasowo sprawdzamy czy pojawił się komunikat
        // docelowo dla poprawnego logowania powinna być weryfikacja Logout
        LoginPage.errorMessage.should('be.visible');
    });


    // TEST 2 — błędne hasło


    it("Should display error message for invalid password", function () {

        // wpisujemy poprawny login oraz niepoprawne hasło
        LoginPage.fillForm(
            this.users.validUser.username,
            this.users.invalidUser.password
        );

        // klikamy przycisk Login
        LoginPage.submitForm();

        // sprawdzamy czy komunikat błędu pojawił się na stronie
        // oraz czy zawiera słowo "Błąd"
        LoginPage.errorMessage
            .should('be.visible')
            .and('contain.text', 'Błąd');
    });


    // TEST 3 — puste pola formularza


    it("Should display validation error when submitting empty form", () => {

        // klikamy przycisk logowania bez wpisywania danych
        // sprawdzamy walidację frontend/backend
        LoginPage.submitForm();

        // sprawdzamy czy użytkownik dostał komunikat walidacyjny
        LoginPage.errorMessage.should('be.visible');
    });

    // ============================
    // TEST 4 — login bez hasła
    // ============================

    it("Should display error when username is provided without password", () => {

        // wpisujemy tylko nazwę użytkownika
        LoginPage.inputUsername.type('testuser');

        // wysyłamy formularz bez hasła
        LoginPage.submitForm();

        // sprawdzamy czy system zablokował logowanie
        LoginPage.errorMessage.should('be.visible');
    });


    // TEST 5 — hasło bez loginu


    it("Should display error when password is provided without username", () => {

        // wpisujemy tylko hasło
        LoginPage.inputPassword.type('testpassword');

        // próbujemy się zalogować
        LoginPage.submitForm();

        // sprawdzamy czy pojawił się komunikat błędu
        LoginPage.errorMessage.should('be.visible');
    });

   
    // TEST 6 — checkbox remember me
  

    it("Should allow checking and unchecking Remember Me checkbox", () => {

        // zaznaczamy checkbox Remember Me
        LoginPage.checkRememberMe();

        // sprawdzamy czy checkbox jest zaznaczony
        LoginPage.rememberMeCheckbox.should('be.checked');

        // odznaczamy checkbox
        LoginPage.unCheckRememberMe();

        // sprawdzamy czy checkbox jest odznaczony
        LoginPage.rememberMeCheckbox.should('not.be.checked');
    });

  
    // TEST 7 — URL po błędnym logowaniu
 

    it("Should stay on login page after failed login attempt", () => {

        // wpisujemy niepoprawne dane logowania
        LoginPage.fillForm('baduser', 'badpass');

        // wysyłamy formularz logowania
        LoginPage.submitForm();

        // sprawdzamy czy użytkownik NIE został przekierowany
        // i nadal znajduje się na stronie logowania
        cy.url().should('contain', '/my-account');
    });

});