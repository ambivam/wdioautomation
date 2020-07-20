class WebElementNotFoundError extends Error {
    constructor(message) {
      super(message)
      this.name = 'WEB_ELEMENT_NOT_FOUND_ERROR'
      this.message = message
    }
  }
  
  class PageElementNotFoundError extends Error {
    constructor(message) {
      super(message)
      this.name = 'PAGE_ELEMENT_NOT_FOUND_ERROR'
      this.message = message
    }
  }
  
  class EnvironmentError extends Error {
    constructor(message) {
      super(message)
      this.name = 'ENVIRONMENT_ERROR'
      this.message = message
    }
  }
  
  module.exports = {
    WebElementNotFoundError,
    PageElementNotFoundError,
    EnvironmentError
  }