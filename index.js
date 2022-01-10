const http = require('http');

const host = 'localhost';
const port = process.env.PORT || 8000;

let server = http.createServer((req, res) => {

  // Endpoints to mock:
  // /system/reset/boot
  // /config/statusLeds/brightness/set.json
  // /config/ioBoards/config.json
  // /config/load.json
  // /config/save.json
  // /config/enable.json
  // /config/disable.json
  // /config/set.json
  // /config/wireless/set.json
  // /dmxBuffer/set.json
  // /config/partyMode/set.json
  // /config/statusLeds/brightness/get.json
  // /webServer/ip/get.json
  // /wireless/get.json
  // /wireless/spectrum/get.json
  // /wireless/stats/get.json
  // /dmxBuffer/<nn>/get.json
  // /log/get.json
  // /overview/get.json
  // /overview/ioBoards/get.json
  // /overview/statusleds/get.json

  console.log('Request: ', req);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end({});
});

server.listen(port, host, () => {
  console.log(`Server is listening ${host}:${port}`);
});
