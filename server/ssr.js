const Koa = require('koa')
const koaStatic = require("koa-static");
const path = require('path')
const portfinder = require('portfinder')

const resolve = file => path.resolve(__dirname, file);
const app = new Koa()

const isDev = process.env.NODE_ENV !== 'production'
const router = isDev ? require('./dev.ssr') : require('./server')
const clientPort = require('./dev.ssr').clientPort
app.use(router.routes()).use(router.allowedMethods())
// 开放目录
app.use(koaStatic(resolve("../dist")));
app.use(koaStatic(resolve("../public")));

let serverPort = process.env.PORT;
if (!serverPort) {
  portfinder.basePort = 3000;
  portfinder.getPort(function (err, port) {
    if (err) { throw err; }
    serverPort = port
    app.listen(serverPort, () => {
      console.log(`server started at localhost:${serverPort}`);
    });
  });
} else {
  app.listen(serverPort, () => {
    console.log(`server started at localhost:${serverPort}`);
  });
}


module.exports = app
module.exports.clientPort = clientPort
module.exports.serverPort = serverPort