import AuthRequester from '../requests/AuthRequester'

class Auth {
  constructor() {
    this.configIndex = null
  }

  setConfigIndex(index) {
    this.configIndex = index
  }

  getConfig() {
    return Cypress.config(this.configIndex)
  }

  refreshToken(product) {
    AuthRequester.generateToken(product).then((data) => {
      let config = this.getConfig()
      config.AUTH_TOKEN = data.body.token
      config.TOKEN_START_DATE = Date.now()

      Cypress.config(this.configIndex, config)
    })
  }

  checkExpired(startDate, periodInMinutes) {
    let currentDate = Date.now()
    let diff = Math.abs(currentDate - startDate) / 1000
    let diffInMinutes = Math.floor(diff / 60) % 60

    return diffInMinutes > periodInMinutes
  }

  authenticate(product) {
    var config = this.getConfig()

    let tokenStartDate = config.TOKEN_START_DATE,
      currentToken = config.AUTH_TOKEN,
      tokenExpireMinutes = config.TOKEN_EXPIRE_MINUTES

    let expiredToken =
      !currentToken ||
      !tokenStartDate ||
      this.checkExpired(tokenStartDate, tokenExpireMinutes)

    if (expiredToken) {
      this.refreshToken(product)
    }
  }
}

export default new Auth()
