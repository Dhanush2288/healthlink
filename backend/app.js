let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
const cookieParser = require("cookie-parser");
let app = express();
var http = require("http").createServer(app);
require("dotenv").config();
const routeconfig = require('./config/router-config');

// Enable CORS before other middleware and route configurations
app.use(cors());

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser("secret"));
var io = require("socket.io")();
app.use(function (req, res, next) {
  res.io = io;
  next();
});
routeconfig.init(app)
app.use(cors());

io.attach(http);
http.listen(process.env.PORT, (err, success) => {
  if (err) throw err;
  else console.log("server is running in port",process.env.PORT);
});
