const Router = require('koa-router')
const router = new Router({
  prefix: '/v1'
})
const { Validator } = require('./../../validators/validator')

router.get('/book', async (ctx) => {
  const { id } = ctx.request.body

  await new Validator([
    {
      field: id,
      isOptional: false,    // 是否必选
      rules: [
        {  type: 'isInt', param: { min: 124 } }
      ],
      custom() {
        // 自定义规则，必须retur布尔
        return true
      }
    }
  ])

  ctx.body = {
    key: 'book',
    id: id
  }
})

module.exports = router;
