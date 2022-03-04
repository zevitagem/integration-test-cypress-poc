import Auth from '../support/helpers/Auth'

const configIndex = 'appEnvironment'

before(() => {
  Auth.setConfigIndex(configIndex)
  Auth.authenticate(Cypress.config(configIndex).PRODUCT)
})

describe('My First Test!', () => {
  it('With valid authentication token', () => {
    assert.isString(Cypress.config(configIndex).AUTH_TOKEN, 'val is string')
  })
})
