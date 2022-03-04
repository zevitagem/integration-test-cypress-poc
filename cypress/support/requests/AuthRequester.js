class AuthRequester {
  generateToken(product, alias = 'generateToken') {
    var urlBase = Cypress.config('urlBase'),
      headers = Cypress.config('headers')

    return cy
      .makeRequest(`${urlBase}/generate-token`, 'POST', headers, { product })
      .as(alias)
  }
}

export default new AuthRequester()
