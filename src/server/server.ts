import * as express from 'express';
import { Application } from 'express';
import { apiHello, apiRedirectUrls } from "./routes/routes";

const redis = require("redis");

const bodyParser = require('body-parser');

const app: Application = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var client = redis.createClient({ host: '127.0.0.1', port: 6379 })
client.on("error", function (err) {
  console.log("Redis Error " + err);
});

client.on('connect', function () {
  console.log('Redis connected');
});

app.redisClient = client;
//client.set('framework', 'AngularJS');

apiHello(app);
apiRedirectUrls(app);

app.listen(8090, () => {
  console.log('Server is now running on port 8090 ...');
});