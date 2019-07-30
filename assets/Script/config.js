/**
 * 配置运行环境
 * office      本地开发环境
 * development 线上开发环境
 * production  生产环境
 */
window.GS_ENV = 'production';
//是否打印log
window.GS_DEBUG = true;

/**
 * 配置游戏ID
 */
window.GS_GAME_ID = 102;

const gs = {};
window.gs = gs;
let user = require("user");
window.user = new user();