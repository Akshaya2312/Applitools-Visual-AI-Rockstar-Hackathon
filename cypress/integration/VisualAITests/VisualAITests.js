/// <reference types="cypress" />

describe("VisualAI Test", () => {
  context("Login Page UI Elements Test", () => {
    beforeEach(() => {
      cy.eyesOpen({
        appName: "Hackathon App",
        batchName: 'Hackathon',
        browser: [{ name: "chrome", width: 1024, height: 768 }]
      });
    });

    afterEach(() => {
      cy.eyesClose();
    });

    before(() => {
      cy.visit(`/${Cypress.env("APP_URL")}`);
    });

    it("should check all fields on Login Page", () => {
      cy.eyesCheckWindow("login form");
    });
  });

  context("Data driven test", () => {
    beforeEach(() => {
      cy.eyesOpen({
        appName: "Hackathon App",
        batchName: "Hackathon",
        browser: [{ name: "chrome", width: 1024, height: 768 }]
      });
    });

    afterEach(() => {
      cy.eyesClose();
    });

    before(() => {
      cy.visit(`/${Cypress.env("APP_URL")}`);
    });

    it("should fail login when no username and password are filled", () => {
      cy.get('button:contains("Log In")').click();
      cy.eyesCheckWindow("login form when no username and password");
    });

    it("should fail login when password is blank and username is filled", () => {
      cy.get("#username")
        .clear()
        .type("Applitool Cool Tester");
      cy.get("#password").clear();
      cy.get('button:contains("Log In")').click();
      cy.eyesCheckWindow("login form when no password");
    });

    it("should fail login when username is blank and password is filled", () => {
      cy.get("#username").clear();
      cy.get("#password")
        .clear()
        .type("secret");
      cy.get('button:contains("Log In")').click();
      cy.eyesCheckWindow("login form when no username");
    });

    it("should login when username and password are entered", () => {
      cy.get("#username")
        .clear()
        .type("Applitool Cool Tester");
      cy.get("#password")
        .clear()
        .type("secret");
      cy.get('button:contains("Log In")').click();
      cy.get(".alert.alert-warning").should("not.be.visible");
      cy.get('button:contains("Log In")').should("not.be.visible");
      cy.get("#showExpensesChart").should("be.visible");
      cy.eyesCheckWindow("login suceesfull");
    });
  });

  context("Table sort test", () => {
    beforeEach(() => {
      cy.eyesOpen({
        appName: "Hackathon App",
        batchName: "Hackathon",
        browser: [{ name: "chrome", width: 1024, height: 768 }]
      });
    });

    afterEach(() => {
      cy.eyesClose();
    });

    before(() => {
      cy.visit(`/${Cypress.env("APP_URL")}`);
    });

    it("should sort amounts table in ascending order", () => {
      cy.login("root", "toor");
      cy.eyesCheckWindow("before sorting");
      cy.get("#amount").click();
      cy.eyesCheckWindow("after sortting");
    });
  });

  context("Canvas chart test", () => {
    beforeEach(() => {
      cy.visit(`/${Cypress.env("APP_URL")}`);
      cy.eyesOpen({
        appName: "Hackathon App",
        batchName: "Hackathon",
        browser: [{ name: "chrome", width: 1024, height: 768 }]
      });
    });

    afterEach(() => {
      cy.eyesClose();
    });

    it("should display a bar chart", () => {
      cy.login("root", "toor");
      cy.eyesCheckWindow("no bar chart");
      cy.get("#showExpensesChart").click();
      cy.wait(3000); // wait for chart to be visible
      cy.eyesCheckWindow("bar chart should be visible");
    });

    it("should display data for year 2019", () => {
      cy.login("root", "toor");
      cy.get("#showExpensesChart").click();
      cy.get("#canvas")
        .should("be.visible")
        .and(chart => {
          expect(chart.height()).to.be.greaterThan(400);
        });
      cy.wait(3000);
      cy.get("#addDataset").click();
      cy.wait(3000);
      cy.eyesCheckWindow("display data for year 2019");
    });
  });
  context("Dynamic content test", () => {
    beforeEach(() => {
      cy.eyesOpen({
        appName: "Hackathon App",
        batchName: "Hackathon",
        browser: [{ name: "chrome", width: 1024, height: 768 }]
      });
    });

    afterEach(() => {
      cy.eyesClose();
    });

    it("should check content of the dynamic ad", () => {
      cy.visit(
        `https://demo.applitools.com/${Cypress.env("APP_URL")}?showAd=true`
      );
      cy.login("test", "test");
      cy.eyesCheckWindow("content of the dynamic ad is visible");
    });
  });
});
