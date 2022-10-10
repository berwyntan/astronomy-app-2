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

        cy.wait(3111)
        cy.get('.ml-5')
        .children().first().should('have.id', '2020-01-10')
        
      });
})
    


           
  
 