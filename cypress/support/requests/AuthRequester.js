class AuthRequester {
  generateToken(product, alias = 'generateToken') {
    let urlBase = Cypress.config('urlBase'),
      headers = Cypress.config('headers')

    return cy
      .makeRequest(`${urlBase}/generate-token`, 'POST', headers, { product })
      .as(alias)
  }
}

export default new AuthRequester()
