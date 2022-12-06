
const server = require('./src/app.js');
const {validateConnection} = require('./src/utils/validateConnection');
const port = 3001
server.listen(port, () => {
  validateConnection(port)// eslint-disable-line no-console
});

