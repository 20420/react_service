// 入口路由只有这一个，所以前台、后台路由都要引过来
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  // 前台
  router.get('/blog/index', controller.blog.home.index);
  router.get('/blog/getArticleList', controller.blog.home.getArticleList);
  // 有参数的路由配置
  router.get('/blog/getArticleById/:id', controller.blog.home.getArticleById);
  router.get('/blog/getTypeInfo', controller.blog.home.getTypeInfo);
  router.get('/blog/getListById/:id', controller.blog.home.getListById);
  // 后台
  router.get('/admin/index', controller.admin.main.index);
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
  router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo);
  router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle);
  router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle);
  router.get('/admin/getArticleList', adminauth, controller.admin.main.getArticleList);
  router.get('/admin/delArticle/:id', adminauth, controller.admin.main.delArticle);
  router.get('/admin/getArticleById/:id', adminauth, controller.admin.main.getArticleById);
  router.get('/admin/outLogin', adminauth, controller.admin.main.outLogin);
};
