const Router = require("koa-router");
const winston = require ('winston');
const router = new Router({
  prefix: "/v1"
});
const { Validator } = require("../../../core/validator");

router.get("/book", async ctx => {
  const { id, type } = ctx.request.body;
  const { LoginType } = global.config;

  console.log(LoginType.isUserType(200));

  winston.log('info', 'Hello distributed log files!');
  winston.info('Hello again distributed logs');

  new Validator([
    {
      field: id,
      isOptional: false, // 是否必选
      rules: [{ type: "isInt", param: { min: 120 } }],
      custom() {
        // 回调，必须return布尔
        return true;
      }
    },
    {
      field: type,
      custom() {
        return false;
      }
    }
  ]);
  ctx.body = {
    key: "book",
    id: id
  };
});

module.exports = router;
