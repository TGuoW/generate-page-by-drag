const app = require("../server/ssr");
const serverPort = require("../server/ssr").serverPort;
console.log('port', serverPort);
app.listen(serverPort, () => {
  console.log(`server started at localhost:${serverPort}`);
});
