const validator = require('validator')
const { ParameterException } = require('./httpException')


class Validator {
  constructor(rules) {
    if (!Validator.instance) {
      this.rules = rules;
      this.rule();
      Validator.instance = this;
    }
    return Validator.instance;
  }
  init(rules) {
    this.rules = rules;
    this.rule();
  }
  rule() {
    this.rules.forEach(v => {
      if (v.isOptional == null) {
        v.isOptional = true;
      }
      if (v.isOptional && v.field) {
        Validator.exception(v);
      }
      if (v.isOptional && !v.field) {
        Validator.exception(v);
      }
    });
  }
  static exception(v) {
    const errMsg = typeof v.errMsg !== "string" ? "" : v.errMsg;
    if (Array.isArray(v.rules) && v.rules.length) {
      v.rules.forEach(iv => {
        if (!validator[iv.type](v.field + "", iv.param)) {
          throw new ParameterException(errMsg);
        }
      });
    }
    if (v.custom && !v.custom()) {
      throw new ParameterException(errMsg);
    }
  }
}

module.exports = {
  Validator
};
