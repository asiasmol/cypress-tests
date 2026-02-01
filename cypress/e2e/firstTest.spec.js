/// <reference types="cypress" />

describe('First Automation Test', () => {

    before(`Open home page`, () => {
        cy.visit('/');
    }
);

  it('Rodzaje lokalizatorów', () => {

    // lokalizator po tagu HTML`
    cy.get("h2");
    cy.get("p");

    // lokapizator po id
    cy.get("#wpforms-10-field_0");

    // lokalizator po klasie
    cy.get(".elementor-icon-box-description");

    // lokalizator po atrybucie
    cy.get(`input[name="wpforms[fields][1]"]`);

    // lokalizowanie po atrbutach (zaawansowane)
    cy.get(`input[name="wpforms[fields][1]"][type="email"]`);

    // lokalizator po tekście
    cy.contains("Talk To Us");
    cy.contains(`Get In Touch`);

  })

  it(`Dokładniejsze lokalizowanie elementów na stronie`, () => {
    //contains
    cy.contains("Shop Now");
    cy.contains("span", "Shop Now")
    
    cy.visit('/contact');
    
    cy.contains(`div[data-id="3f3d1eda"]`, "Zaznacz opcję").find('select')

  })

  it("Klikniecie w element na stronie", () => {
    cy.visit('/contact');

    //klikniecie w element na stronie
    cy.get(`#wpforms-submit-10`).click();

    cy.contains("a.menu-link", "About").click({force: true});

  })

  it("Wpisywanie tekstu w input/textarea", () => {
    cy.visit('/contact');

    cy.get(`#wpforms-10-field_0`).type("Rafał Drobner", {delay: 100});
    cy.get(`#wpforms-10-field_3`).type("666 666 666");
    cy.get(`#wpforms-10-field_1`).type("example@example.com{backspace}");

    // czyszczenie pola
    cy.get(`#wpforms-10-field_0`).clear();

  });

  it("Przechowywanie elementu", () => {

    cy.visit('/contact');

    // const i let - tak nie robimy
    const inputName = cy.get(`#wpforms-10-field_0`)

    // then()
    cy.get(`#wpforms-10-field_0`)
        .then(($inputName) =>{
            const placeholder = $inputName.attr("placeholder");
            // cy.log(placeholder);
            expect(placeholder).to.equal("Full name");
        })

        // aliasy
        cy.get(`#wpforms-10-field_0`).as('nameInput');
        cy.get(`@nameInput`).should(`have.attr`, `placeholder`, `Full name`);


  });
  

  it("Pobieranie tekstu z elementu", () => {
    cy.visit('/about');


    // przez metode invoke
    cy.get(`h1.elementor-heading-title`)
        .invoke(`text`)
        .then((text) => {
            expect(text).to.contain("WHO ARE WE?");
    })

    //pobieranie tekstu z użyciem then
    cy.get(`h1.elementor-heading-title`)
    .then(($element) => {
        const headingText = $element.text();
        expect(headingText).to.contain("WHO ARE WE?");
    });

    //przypisanie tekstu do aliasu
    cy.get(`h1.elementor-heading-title`)
        .invoke(`text`)
        .as(`title`);

    cy.get(`@title`).then((text) => {
        expect(text).to.contain("WHO ARE WE?");

      });
    });



    it("Obsługa chekboxów i radiobuttonów", () => {
            cy.visit('/contact');

            //zaznaczenie checkboxa

            //1 pobieramy element
            cy.get(`#wpforms-10-field_5_2`)
            // zaznaczamy checkbox
                .check()
            // sprawdzamy czy jest zaznaczony
                .should(`be.checked`);

            
            //odznaczenie checkboxa
            cy.get(`#wpforms-10-field_5_2`)
            //odznaczenie checkboxa
                .uncheck()
            //sprawdzenie czy jest odznaczony
                .should(`not.be.checked`);


            // zaznaczenie radiobuttonu
            cy.get(`#wpforms-10-field_6_3`)
                .check()
                .should(`be.checked`);


    });

    it("Ustawianie daty w datepicker", () => {
      //pobieranie inpt typu date
            cy.get(`#date`).as(`datepicker`)

            // scroll do tego elementu i ustawiamy jak długo ma scrolować 
            .scrollIntoView({duration: 1000})

            // ustawianie daty
            cy.get(`@datepicker`).type("2024-12-31")

            // sprawdzenie czy data została ustawiona
            .should(`have.value`, `2024-12-31`);

    });
  
  it("Select i najechanie na dany element", () => {

    cy.visit('/contact');

     //pobieranie selecta
    cy.get(`select#wpforms-10-field_4`).as(`selectCountry`).select(`Polska`)

    //pobieranie selecta
    cy.get(`select#wpforms-10-field_4`)
    //wybieranie opcji z selecta i wybieramy po wartości
    .select(`Włochy`)

    //pobieranie selecta
    cy.get(`select#wpforms-10-field_4`)
    //wybieranie opcji z selecta i wybieramy po wartości
    .select(`Irlandia`)
    //asercja
    .should(`have.value`, `Irlandia`);

    //pobranie elementu rozwijanego (lista menu)      
    cy.get(`#menu-item-1341 > a`)
    //najechanie na element/wyzwalanie akcji
    .trigger('mouseover');
    //klikniecie w podmenu i wymuszenie klikniecia bo ta zakładka bywa niewidoczna
    cy.get(`#menu-item-1435 > a`).click({force: true})
          
    });

    it("Obsługa alertów", () => {

    cy.visit('/about');
    cy.contains(`span`, "PURCHASE A POSTCARD").click();

    //alerty nie sa wyświetlane, one sa wyzwolona ale dla nas są niewidoczne.
    //metoda, która pozwoli cypressowni 
    cy.on('window:confirm', (text) => {
        expect(text).to.equal("Przycisk został kliknięty!");
        return true;          
    });
    

  });



it("Wgrywanie pliku", () => {

    cy.visit('/contact');


    // załaduj plik o takiej nazwie: (po przecinku mozna przekazać wiele plików w tablicy [])
    cy.get(`#upload-file`).attachFile('logo.png');

    // Sprawdenie wgrania pliku: 
    cy.get(`#upload-file`).then(input => {
        expect(input[0].files[0].name).to.equal('logo.png');
  });

});

it.only(`Asercje`, () => {

  //ASERCJE DOMYŚLNE
    //Weryfikacja tekstu 
    cy.get(`h2.elementor-heading-title`).first()
    .should(`contain.text`, "Multipurpose Store");
    // contain cały zancznik <h2>
    //containsText tylko tekst wewnątrz znacznika


    //Widoczność elementu 
    cy.visit(`/about`);
    cy.get(`span.elementor-button-text`).should(`be.visible`);
    // cy.get(`span.elementor-button-text`).should(`not.be.visible`);

    //Weryfikacja wartosci tekstowej input
    cy.visit(`/contact`);
    cy.get(`#wpforms-10-field_0`)
    .type(`Jan Kowalski`)
    .should(`have.value`, `Jan Kowalski`);

    //Weryfikacja istnienia elementu na stronie
    cy.get(`.error`).should(`not.exist`);


    //ASERCJE JAWNE expect

    cy.get(`h1.elementor-heading-title`).then(($title) => {
        // logika implementacja
        expect($title.text()).to.contain(`CONTACT US`);
    });


    cy.contains(`a`, "About").click();
    //sprawdzamy czy jesteśmy na dobrej stornie
    cy.url().should("contain", "/about");

    //weryfikacja atrybutów na elementach
    // sprawdzamy czy ma atrybut jaki to atrybut i jak jest jego wartość
    // cy.contains(`a`, "About").should(`have.attr`, `href`, `https://automationteststore.com/about/`)








  
   });

      });