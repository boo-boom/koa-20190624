const validator = require('validator')
const { ParameterException } = require('./httpException')

class Validator {
  constructor(rules) {
    this.rules = rules
    this.rule()
  }
  rule() {
    this.rules.forEach(v => {
      if (v.isOptional && v.field) {
        Validator.exception(v)
      }
      if (!v.isOptional) {
        Validator.exception(v)
      }
    })
  }
  static exception(v) {
    if (v.type) {
      v.rules.forEach(iv => {
        if (!validator[iv.type](v.field + '', iv.param)) {
          throw new ParameterException()
        }
      })
    }
    if (v.custom && !v.custom()) {
      throw new ParameterException()
    }
  }
}

module.exports = {
  Validator
}
