// 用egg的中间件 当作路由守卫
// 为什么要用路由守卫 我们要防止一些人没有登录 但是知道了我们的后台接口 就可以对我们的后台进行操作
// 弹幕说这是后端路由守卫 为什么不用前端路由守卫？？  可以对比一下
'use strict';
module.exports = () => {
  return async function adminauth(ctx, next) {
    console.log(ctx.session.openId);
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = { data: '没有登录' };
    }
  };
};
