'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    // 从数据库中获取的内容 因为是异步的所以要await  this.app.mysql是因为配置的时候将mysql挂载到了app上
    // const result = await this.app.mysql.get('blog_content');
    ctx.body = 'hi,egg';
  }
  // 得到文章列表的接口
  async getArticleList() {
    const { ctx } = this;
    // mysql语句的左连接是什么意思：用于从多个表中查询记录
    // 因为此处我们查询的文章是需要类名的 所以要有两个表的数据 所以要左连接
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ," +
                'article.view_count as view_count ,' +
                'type.typeName as typeName ' +
                'FROM article LEFT JOIN type ON article.type_id = type.Id';
    // 用语句来查询数据库 用的是query
    const results = await this.app.mysql.query(sql);
    ctx.body = { data: results };
  }

  // 通过id获取文章详细内容的接口
  async getArticleById() {
    // 获取前台传过来的id
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
                 'article.title as title,' +
                 'article.introduce as introduce,' +
                 'article.article_content as article_content,' +
                 "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime," +
                 'article.view_count as view_count ,' +
                 'type.typeName as typeName ,' +
                 'type.Id as typeId ' +
                  'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
                 'WHERE article.id=' + id;
    const results = await this.app.mysql.query(sql);

    this.ctx.body = { data: results };
  }

  // 得到类别名称和编号的接口
  async getTypeInfo() {
    // 这里的请求很简单 所以就不用sql语句了
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }

  // 根据类别ID获得文章列表
  async getListById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
        'article.title as title,' +
        'article.introduce as introduce,' +
         "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
         'article.view_count as view_count ,' +
         'type.typeName as typeName ' +
         'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
         'WHERE type_id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = HomeController;
