'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    const { ctx } = this;

    // 从数据库中获取的内容 因为是异步的所以要await  this.app.mysql是因为配置的时候将mysql挂载到了app上
    // const result = await this.app.mysql.get('blog_content');
    ctx.body = 'hi,api';
  }

  // 登录的后台接口
  async checkLogin() {
    // 登录肯定需要用户名和密码 从请求中得到
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
              "' AND password = '" + password + "'";
    // 如果查询正确 得到的是一个数组
    const res = await this.app.mysql.query(sql);
    console.log(res, '2333');

    if (res.length > 0) { // 成功
      // 用时间戳当密钥
      const openId = new Date().getTime();
      // 保存
      this.ctx.session.openId = { openId };
      // 返回给客户端
      this.ctx.body = { data: '登录成功', openId };
    } else { // 失败
      this.ctx.body = { data: '登录失败' };
    }
  }

  // 获得文章类型的接口
  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = { data: resType };
  }

  // 添加文章
  async addArticle() {
    // 获得添加的文章的信息
    const tmpArticle = this.ctx.request.body;
    // 向数据库中添加文章
    const result = await this.app.mysql.insert('article', tmpArticle);
    // 判断插入是否成功
    const insertSuccess = result.affectedRows === 1; // 如果插入了一行 则为true
    const insertId = result.insertId;// 把插入的id返回来 用于之后修改

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };

    console.log(this.ctx.body);

  }

  // 修改文章
  async updateArticle() {

    const tmpArticle = this.ctx.request.body;

    const result = await this.app.mysql.update('article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }

  // 得到文章列表
  async getArticleList() {

    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
                'type.typeName as typeName ' +
                'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
                // 我们希望是倒叙排列 即新添加的在前面
                'ORDER BY article.id DESC ';

    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resList };
  }

  // 删除文章的方法
  async delArticle() {
    // 得到要删除文章的Id
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { id });
    this.ctx.body = { data: res };
  }

  // 修改文章的方法 首先要根据id获取文章的内容
  async getArticleById() {
    const id = this.ctx.params.id;

    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.article_content as article_content,' +
                 "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
                 'article.view_count as view_count ,' +
                 'type.typeName as typeName ,' +
                 'type.Id as typeId ' +
                  'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
                  'WHERE article.id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  // 退出登录的方法
  async outLogin() {
    this.ctx.session.openId = null;
    this.ctx.body = { data: '退出成功' };

  }

}

module.exports = MainController;
