/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1652105499596_3512';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'admin123',
      // database
      database: 'react_blog',
    },
    // 是否挂载到app上
    app: true,
    // 是否挂载到代理上
    agent: false,
  };
  // 跨域配置
  // 安全机制
  config.security = {
    // 跨站点请求伪造(Cross—Site Request Forgery)关闭
    csrf: {
      enable: false,
    },
    // 白名单 里面填自己的域名
    domainWhiteList: [ '*' ],
  };

  config.cors = {
    // 允许哪些域名可以跨域访问  默认是所有
    // origin: 'http://localhost:3000',
    origin: 'http://127.0.0.1:3000',
    // 哪些请求可以跨域访问
    allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH',
    // 允许cookie跨域
    credentials: true,
  };


  return {
    ...config,
    ...userConfig,
  };
};
