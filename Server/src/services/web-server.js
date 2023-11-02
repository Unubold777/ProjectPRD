let express = require("express");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require('path');
const app = express();
const port = process.env.PORT;


//db table add 
const requestData = require('../models/requestData')
const responseData = require('../models/responseData')


function initialize() {
  const app = express();
  app.use(morgan("dev"));
  // app.use(express.json());
  // app.use(express.urlencoded({ extended: false }));
  app.use(
    express.json({
      limit: "50mb",
    })
  );
  app.use(
    express.urlencoded({
      limit: "50mb",
    })
  );
  app.use(
    helmet.hidePoweredBy(),
    helmet.noSniff(),
    helmet.xssFilter(),
    helmet.contentSecurityPolicy(),
    helmet.crossOriginEmbedderPolicy(),
    helmet.frameguard()
  );
  app.use(cors());
  app.use(express.json());
  
  const requestRoute = require('../routes/requests.Route');
  const responseRoute = require('../routes/responses.Route');



  app.use('/request', requestRoute);
  app.use('/response', responseRoute);
 
  // Creating table from web-server
  requestData.sync().then(()=> responseData.sync());
  app.listen(process.env.PORT, function () {
    console.log("Server is ready at" + process.env.PORT);
  });
}

function close() {}

module.exports.initialize = initialize;
module.exports.close = close;