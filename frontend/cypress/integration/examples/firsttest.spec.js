describe("My first test", function() {
  it("Is Luca", function() {
    cy.visit("http://localhost:8080/home");
    cy.contains("constructie").select();
  });
});
