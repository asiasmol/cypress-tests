class MenuPage {


    // ELEMENTY MENU GŁÓWNEGO

    // link Home w menu
    get homeLink() {
        return cy.contains('a.menu-link', 'Home');
    }

    // link About w menu
    get aboutLink() {
        return cy.contains('a.menu-link', 'About');
    }

    // link Contact w menu
    get contactLink() {
        return cy.contains('a.menu-link', 'Contact');
    }

    // PODMENU (HOVER)


    // element menu który posiada podmenu (Shop / Products)
    get shopMenu() {
        return cy.get('#menu-item-1341 > a');
    }

    // element w podmenu (przykładowy element)
    get shopSubmenuItem() {
        return cy.get('#menu-item-1435 > a');
    }

    // METODY AKCJI


    // kliknięcie w Home
    clickHome() {
        this.homeLink.click({ force: true });
    }

    // kliknięcie w About
    clickAbout() {
        this.aboutLink.click({ force: true });
    }

    // kliknięcie w Contact
    clickContact() {
        this.contactLink.click({ force: true });
    }

    // najechanie myszką na menu z podmenu
    openShopMenu() {

        // trigger mouseover symuluje najechanie kursorem myszy
        this.shopMenu.trigger('mouseover');
    }

    // kliknięcie w element podmenu
    clickShopSubmenuItem() {

        // force:true pozwala kliknąć element nawet jeśli jest częściowo niewidoczny
        this.shopSubmenuItem.click({ force: true });
    }

}

export default new MenuPage();