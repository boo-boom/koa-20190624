module.exports = {
  env: process.env.NODE_ENV,
  isDevelopment: process.env.NODE_ENV === "development",
  // 登陆类型
  LoginType: {
    USER_EMAIL: 101,
    USER_MOBILE: 102,
    ADMIN_EMAIL: 200,
    isUserType(val) {
      for (let key in this) {
        if (this[key] === val) return true
      }
      return false
    }
  }
}
