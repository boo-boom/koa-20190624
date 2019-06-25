const { HttpException } = require('../core/httpException')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // console.log(error)
    const isHttpException = error instanceof HttpException
    if (isHttpException) {
      // 已知异常
      ctx.status = error.code
      ctx.body = {
        msg: error.msg,
        errorCode: error.errorCode,
        requestUrl: `${ctx.method} ${ctx.path}`
      }
    } else {
      // 未知错误
      ctx.status = 500
      ctx.body = {
        msg: '服务器内部错误',
        errorCode: -104,
        requestUrl: `${ctx.method} ${ctx.path}`
      }
    }
  }
}

module.exports = catchError
