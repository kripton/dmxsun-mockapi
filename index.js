const http = require('http');
const { url } = require('inspector');

const host = 'localhost';
const port = process.env.PORT || 8000;

const mockEndpoints = {
  '// SETTERS all return an empty object': () => {},
  '/system/reset/boot': (req, res) => {},
  '/config/statusLeds/brightness/set.json': (req, res) => {},
  '/config/ioBoards/config.json': (req, res) => {},
  '/config/load.json': (req, res) => {},
  '/config/save.json': (req, res) => {},
  '/config/enable.json': (req, res) => {},
  '/config/disable.json': (req, res) => {},
  '/config/set.json': (req, res) => {},
  '/config/wireless/set.json': (req, res) => {},
  '/dmxBuffer/set.json': (req, res) => {},
  '/config/partyMode/set.json': (req, res) => {},

  '// GETTERS return something meaningful': () => {},
  '/config/statusLeds/brightness/get.json': (req, res) => {
    return {value: 20};
  },
  '/config/webServer/ip/get.json': (req, res) => {
    return {ownIp:'169.254.99.1',ownMask:'255.255.255.0',hostIp:'169.254.99.2'};
  },
  '/config/wireless/get.json': (req, res) => {},
  '/config//wireless/spectrum/get.json': (req, res) => {},
  '/config/wireless/stats/get.json': (req, res) => {},
  '/log/get.json': (req, res) => {},
  '/overview/get.json': (req, res) => {},
  '/overview/ioBoards/get.json': (req, res) => {},
  '/overview/statusleds/get.json': (req, res) => {},

  '// A bit of a hybrid one: URL includes the buffer number and we have getter and setter ...': () => {},
  '/dmxBuffer': (req, res) => {
    if (req.url.endsWith('set.json')) {
      return {};
    } else {
      let bufferNum = req.url.split('/')[2];
      return {buffer:bufferNum,value:'gAQYAho6i8T/AP4BAP4BAP4BAP4BAP4BAP4BAP4BAOIBAA=='};
    }
  },
};

let server = http.createServer((req, res) => {
  // See if the URL matches one of the mocked endpoints
  let contentFunc = undefined;
  Object.getOwnPropertyNames(mockEndpoints).forEach((key) => {
    if (req.url.startsWith(key)) {
      contentFunc = mockEndpoints[key];
    }
  });

  // If we have a match, send a HTTP 200 response, 404 otherwise
  if (contentFunc) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    let content = contentFunc(req, res);
    if (content) {
      res.end(JSON.stringify(content) + '\n');
    } else {
      res.end('{}');
    }
  } else {
    console.warn('No handler found for URL ' + req.url);
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end();
  }
});

server.listen(port, host, () => {
  console.log(`Server is listening ${host}:${port}`);
});
