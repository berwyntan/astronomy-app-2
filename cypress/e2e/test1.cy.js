describe('My First Test', () => {
    it('Latest into Shuffle into Grid', () => {
      cy.visit('http://127.0.0.1:5173')
    
      cy.wait(1111)
      cy.contains('Shuffle').click()

      cy.url().should('include', '/shuffle')

      cy.contains('Grid').click()

      cy.get('.grid').should('be.visible')

    });
    it('Check Infinity Scroll', () => {
        const selector = "div.grid"
        cy.wait(500)
        cy.get(selector).then($els => {
            const initialCount = $els.length
            cy.scrollTo("bottom", { duration: 1000 });
            cy.wait(2111)

            cy.get(selector).then($els2 => {
            const currentCount = $els2.length
            expect(initialCount <= currentCount).to.be.true
            // cy.scrollTo("bottom", { duration: 1000 })
            // cy.wait(4111)

            // cy.get(selector).then($els3 => {
            //     const lastCount = $els3.length
            //     expect(currentCount <= lastCount).to.be.true
            //     })
            })
        })
    });
    it('Search for 10 Jan 2020', () => {
        cy.wait(2111)
        cy.contains('Search').click()
        
        cy.wait(2111)
        cy.get('.react-datepicker__month-select')
        .should('be.visible')
        .select('January')

        cy.get('.react-datepicker__year-select')
        .should('be.visible')
        .select('2020')

        cy.wait(2111)
        cy.get('.react-datepicker__day--010')
        .click()
        
        cy.contains('Feed').click()

        cy.wait(4111)
        cy.get('.ml-5')
        .children().first().should('have.id', '2020-01-10')        
      });
      it('Go to Likes without login', () => {
        cy.wait(1111)

        cy.contains('Likes').click()
        cy.url().should('include', '/login')
      });
      it('Go back to Latest and try to like and save the first post', () => {
        cy.wait(1111)

        cy.contains('Latest').click()
        cy.wait(3111)

        // get first like button and click
        cy.get('.ml-5')
        .children().first().children().get('.btn').first().click()

        // check the like button img, it should be an empty heart
        cy.get('.ml-5')
        .children().first().children().get('.btn').first()
        .children().should('have.attr', 'src').should('include', '/src/icons/heart-empty.svg')

        // get the first bookmark button and click
        cy.get('.ml-5')
        .children().first().children().get('.dropdown.dropdown-right').children().children().first().click()

        // check that the first album dropdown does not exist
        cy.get('.ml-5')
        .children().first().children().get('.dropdown.dropdown-right')
        .get('.dropdown-content').should('not.exist')
      });
      it('Go to Albums without login', () => {
        cy.wait(1111)

        cy.contains('Albums').click()
        cy.url().should('include', '/login')
      });
})
    


           
  
 