class HttpException extends Error {
  constructor(code = 400, errorCode = -100, msg = '服务器异常') {
    super()
    this.code = code
    this.errorCode = errorCode
    this.msg = msg
  }
}

class ParameterException extends HttpException {
  constructor(code = 400, errorCode = -140, msg = '参数错误') {
    super()
    this.code = code
    this.errorCode = errorCode
    this.msg = msg
  }
}

module.exports = {
  HttpException,
  ParameterException
}
