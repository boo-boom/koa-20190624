const validator = require('validator')
const { ParameterException } = require('../../core/httpException')

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
    v.rules.forEach(iv => {
      if (!validator[iv.type](v.field + '', iv.param)) {
        throw new ParameterException()
      }
    })
    if (v.custom && !v.custom()) {
      throw new ParameterException()
    }
  }
}

module.exports = {
  Validator
}
