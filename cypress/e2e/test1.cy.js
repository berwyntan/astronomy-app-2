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
        cy.wait(2111)
        cy.get(selector).then($els => {
            const initialCount = $els.length
            cy.scrollTo("bottom", { duration: 1000 });
            cy.wait(4111)

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

        cy.wait(3111)
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
        cy.wait(2111)

        cy.contains('Albums').click()
        cy.url().should('include', '/login')
      });
      it('Attempt to login using unregistered username: TesterASDFG and password: asdf', () => {
        cy.get('input').first().type('TesterASDFG')
        cy.get('input').first().should('have.value', 'TesterASDFG')
        cy.get('input[placeholder="password"]').type('asdf')
        cy.get('input[placeholder="password"]').should('have.value', 'asdf')
        cy.get('button[type="submit"]').click()

        cy.wait(1111)
        cy.get('.text-red-600').should('have.text', 'Incorrect Username or Password')
      });
      it('Signup using username: TesterASDFG and password: asdf', () => {
        cy.contains('Create one').click()
        cy.url().should('include', '/signup')

        cy.get('input').first().type('TesterASDFG')
        cy.get('input').first().should('have.value', 'TesterASDFG')
        cy.get('input[placeholder="password"]').type('asdf')
        cy.get('input[placeholder="password"]').should('have.value', 'asdf')
        cy.get('button[type="submit"]').click()

        cy.wait(1111)
        cy.url().should('include', '/login')
      });
      it('Attempt to login using signed up username: TesterASDFG and password: asdf', () => {
        cy.get('input').first().type('TesterASDFG')
        cy.get('input').first().should('have.value', 'TesterASDFG')
        cy.get('input[placeholder="password"]').type('asdf')
        cy.get('input[placeholder="password"]').should('have.value', 'asdf')
        cy.get('button[type="submit"]').click()

        cy.wait(1111)
        cy.get('.rounded-full').should('exist')
      });
      it('Like the first post, then check likes, logout/login and check again', () => {
        cy.wait(2111)

        // get first like button and click
        cy.get('.ml-5')
        .children().first().children().get('.btn-square').first().click()
        cy.wait(2111)
        // check the like button img, it should be a solid heart
        cy.get('.ml-5')
        .children().first().children().get('.btn-square').first()
        .children().should('have.attr', 'src').should('include', '/src/icons/heart-solid.svg')
        
        // get id of liked post, then go to likes to verify
        cy.get('.ml-5')
        .children().first()
        .invoke('attr', 'id')
        .then((id) => {
          cy.log(id)
          cy.contains('Likes').click()
          cy.wait(1111)
          cy.url().should('include', '/likes')
          cy.get('.ml-5').children().first().should('have.attr', 'id').should('equal', id)

          // log out
          cy.get('.dropdown-end').click()
          cy.get('ul.menu').children().next().click()

          cy.wait(1111)
          cy.get('.rounded-full').should('not.exist')

          // log in
          cy.contains('Likes').click()
          cy.url().should('include', '/login')

          cy.get('input').first().type('TesterASDFG')
          cy.get('input').first().should('have.value', 'TesterASDFG')
          cy.get('input[placeholder="password"]').type('asdf')
          cy.get('input[placeholder="password"]').should('have.value', 'asdf')
          cy.get('button[type="submit"]').click()

          cy.wait(2111)
          cy.get('.rounded-full').should('exist')

          // check likes
          cy.contains('Likes').click()
          cy.wait(2111)
          cy.url().should('include', '/likes')
          cy.get('.ml-5').children().first().should('have.attr', 'id').should('equal', id)

        })
      });
      it('Check grid and grid selection in likes', () => {
        cy.contains('Grid').click()
        cy.wait(1111)
        cy.get('.grid').should('exist')

        cy.get('.grid').children().first().click()
        cy.wait(2111)
        cy.get('div.w-screen').should('exist')

        // close grid selection
        cy.get('button[data-cy="close"]').click()
        cy.get('.rounded-full').should('exist')

      });
      it('Check removing like', () => {
        cy.wait(1111)
        cy.get('.grid').children().first().click()
        cy.wait(1111)
        cy.get('div.w-screen').should('exist')

        // unlike
        cy.get('button[data-cy="unlike"]').click()

        // close grid selection
        // cy.get('button[data-cy="close"]').click()
        
        cy.wait(1111)
        cy.get('.rounded-full').should('exist')

        cy.get('div.grid').should('not.exist')
      });
      it('Log out and try to sign up TesterASDFG again', () => {

        cy.get('.dropdown-end').click()
        cy.get('ul.menu').children().next().click()

        cy.wait(1111)
        cy.get('.rounded-full').should('not.exist')

        cy.contains('Login').click()
        cy.url().should('include', '/login')

        cy.contains('Create one').click()
        cy.url().should('include', '/signup')

        cy.get('input').first().type('TesterASDFG')
        cy.get('input').first().should('have.value', 'TesterASDFG')
        cy.get('input[placeholder="password"]').type('asdf')
        cy.get('input[placeholder="password"]').should('have.value', 'asdf')
        cy.get('button[type="submit"]').click()

        cy.wait(1111)
        cy.get('.text-red-600').should('have.text', 'Username already taken')      
      });
      it('Delete TesterASDFG from MongoDB', () => {

        cy.deleteOne({ username: "TesterASDFG" }, {collection: 'users', database: 'test'}).then(res => {
          cy.log(res); // prints 1 (or 0) document deleted
      });
      });
      it('Attempt to login using unregistered username: TesterASDFG and password: asdf', () => {
        cy.contains('Login').click()
        cy.url().should('include', '/login')

        cy.get('input').first().type('TesterASDFG')
        cy.get('input').first().should('have.value', 'TesterASDFG')
        cy.get('input[placeholder="password"]').type('asdf')
        cy.get('input[placeholder="password"]').should('have.value', 'asdf')
        cy.get('button[type="submit"]').click()

        cy.wait(1111)
        cy.get('.text-red-600').should('have.text', 'Incorrect Username or Password')
      });
})
    


           
  
 