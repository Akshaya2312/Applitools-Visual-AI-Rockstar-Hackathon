/// <reference types="cypress" />

describe('Traditional Test', () => {

    beforeEach(() => {
        cy.visit(`/${Cypress.env('APP_URL')}`);
    });

    context('Login Page UI Elements Test', () => {
        it('should check all fields on Login Page', () => {
            cy.get('h4').should('contain', 'Login Form');
            cy.get('.pre-icon.os-icon-user-male-circle').should('be.visible');
            cy.get('.pre-icon.os-icon-fingerprint').should('be.visible');
            cy.get('label:contains("Username")').should('be.visible');
            cy.get('label:contains("Password")').should('be.visible');
            cy.get('label:contains("Remember Me")').should('be.visible');
            cy.get('.form-check-input').should('be.visible');
            cy.get('#log-in:contains("Log In")').should('be.visible');
            cy.get('a[href$="index.html"]').should('be.visible');
            cy.get('img[src="img/social-icons/twitter.png"]').should('be.visible');
            cy.get('img[src="img/social-icons/facebook.png"]').should('be.visible');
            cy.get('img[src="img/social-icons/linkedin.png"]').should('be.visible');
            cy.get('#username').should('be.visible');
            cy.get('#username').should('have.attr', 'placeholder', 'Enter your username');
            cy.get('#password').should('be.visible');
            cy.get('#password').should('have.attr', 'placeholder', 'Enter your password');
            // a check to verify the underline color of the Login Header title text
            cy.get('h4')
                .then($els => {
                const win = $els[0].ownerDocument.defaultView
                const after = win.getComputedStyle($els[0], 'after')
                const underLineColor = after.getPropertyValue('background-color')
                const width = after.getPropertyValue('width')
                expect(underLineColor).to.eq('rgb(4, 123, 248)')
                expect(width).to.eq('32px')
                })

        })

    });

    context('Data driven test', () => {
        it('should fail login when no username and password are filled', () => {
            cy.get('button:contains("Log In")').click();
            cy.get('.alert.alert-warning').should('be.visible');
            cy.get('.alert.alert-warning').should('contain', 'Both Username and Password must be present');
            cy.get('button:contains("Log In")').should('be.visible');
        })

        it('should fail login when password is blank and username is filled', () => {
            cy.get('#username').clear().type("Applitool Cool Tester");
            cy.get('#password').clear();
            cy.get('button:contains("Log In")').click();
            cy.get('.alert.alert-warning').should('be.visible');
            cy.get('.alert.alert-warning').should('contain', 'Password must be present');
            cy.get('button:contains("Log In")').should('be.visible');
        })
        
        it('should fail login when username is blank and password is filled', () => {
            cy.get('#username').clear();
            cy.get('#password').clear().type("secret");
            cy.get('button:contains("Log In")').click();
            cy.get('.alert.alert-warning').should('be.visible');
            cy.get('.alert.alert-warning').should('contain', 'Username must be present');
            cy.get('button:contains("Log In")').should('be.visible');
        })

        it('should fail login when no username and password are entered', () => {
            cy.get('#username').clear().type("Applitool Cool Tester");
            cy.get('#password').clear().type("secret");
            cy.get('button:contains("Log In")').click();
            cy.get('.alert.alert-warning').should('not.be.visible');
            cy.get('button:contains("Log In")').should('not.be.visible');
            cy.get('#showExpensesChart').should('be.visible');
        })
    });

    context('Table sort test', () => {

        it('should sort amounts table in ascending order', () => {
            cy.login('root', 'toor');
            
            // read all data in a map before sorting Amount column
            let beforeSortTableData = new Map();
            let afterSortTableData = new Map();
            cy.get('tbody tr').then(($rows) => {
                [...$rows].forEach(($row, i) => {
                    cy.get(`tbody tr:nth-of-type(${i + 1})`).invoke('text').then((rowText) => {
                        cy.get(`tbody tr:nth-of-type(${i + 1}) td:nth-of-type(5)`).invoke('text').then((amt) => {
                            amt = parseFloat(amt.replace('USD', '').replace('+', '').replace(',', '').replace('- ', '-').trim());
                            beforeSortTableData.set(amt, rowText);
                        });
                    });
                });
            });
            cy.log('before sort row content', beforeSortTableData);
            cy.wrap(beforeSortTableData).as('beforeSortTableData');
            

            //click amount column to sort
            cy.get('#amount').click();

            //verify column values are sorted
            let unsorted = [] , sorted = [];
            cy.get('tbody tr').then(($rows) => {
                [...$rows].forEach(($row, i, arr) => {
                    cy.get(`tbody tr:nth-of-type(${i + 1}) td:nth-of-type(5)`).invoke('text').then((text) => {
                        text = parseFloat(text.replace('USD', '').replace('+', '').replace(',', '').replace('- ', '-').trim());
                        unsorted.push(text);
                    });
                })
                cy.wrap(unsorted).its('length').should('eq', 6);
                cy.wrap(unsorted).then((arr) => {
                    sorted = unsorted.slice();
                    cy.log('sorted', sorted);
                    sorted.sort((a,b) => {
                        return (+a) - (+b);
                    }).forEach((item, index) => { 
                        cy.log('item', item);
                        cy.log('unsortedItem', unsorted[index]);
                        expect(item === unsorted[index]).to.be.true;
                    });
                }) 
            });

            // verify row data is intact
            cy.get('tbody tr').then(($rows) => {
                [...$rows].forEach(($row, i) => {
                    cy.get(`tbody tr:nth-of-type(${i + 1})`).invoke('text').then((rowText) => {
                        cy.get(`tbody tr:nth-of-type(${i + 1}) td:nth-of-type(5)`).invoke('text').then((amt) => {
                            amt = parseFloat(amt.replace('USD', '').replace('+', '').replace(',', '').replace('- ', '-').trim());
                            afterSortTableData.set(amt, rowText);
                        });
                    });
                });
            });

            cy.log('after sort row content', afterSortTableData);
            cy.wrap(afterSortTableData).as('afterSortTableData');
            cy.wrap(beforeSortTableData).as('beforeSortTableData');
            cy.get('@afterSortTableData').then(newData => {
                cy.get('@beforeSortTableData').then(oldData => {
                    oldData.forEach((value, i) => {
                        expect(value).to.eq(newData.get(i));
                    });
                })
            })
        });
    });

    context('Canvas Chart Test', () => {

        it('should verify compare expenses chart', () => {
            cy.login('test','test');
            cy.get('#showExpensesChart').click();
            cy
                .get('#canvas')
                .should('be.visible')
                .and(chart => {
                    expect(chart.height()).to.be.greaterThan(400)
                });

            // Its not possible in this test case to verify the data from a canvas using functional test
        });

    });

    context('Dynamic content test', () => {

        it('should check content of the dynamic ad', () => {
            cy.visit(`https://demo.applitools.com/${Cypress.env('APP_URL')}?showAd=true`);
            cy.login('test','test');
            cy.get('img[src="img/flashSale.gif"]').should('be.visible');
            cy.get('img[src="img/flashSale2.gif"]').should('be.visible');
        })

    });

});