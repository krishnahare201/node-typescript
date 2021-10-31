import express from 'express';
import * as bodyParser from "body-parser";
// import * as cors from "cors";
import cors from 'cors';
import routes from "./routes/routes";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb' }));
app.use(bodyParser.raw({ limit: '500mb' }));
const middleWare = (request: express.Request, response: express.Response, next: express.NextFunction) => {
  try {

    console.log("request.url", request.url)
    const splitedUrl = request.url.split("/");
    console.log(splitedUrl)
    const sessionUrl = `${splitedUrl[1]}/${splitedUrl[2]}`
    // checking of req for session start from "pub/proxy", "api/proxy"
    if (["pub/proxy", "api/proxy"].includes(sessionUrl)) {
      console.log("splitedUrl", splitedUrl)
      /// here we can check session 
      next()
    } else {
      next()
    }

  } catch (err) {
    return response.status(400).send("There is some error. Please try again.");
  }
};
app.use(middleWare);
routes.forEach((route: any) => {
  app[route.method](route.path, (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    route.action(request, response)
      .then(() => next)
      .catch((err: any) => next(err));
  });
})


const port = 8000;
app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});
app.listen(port, (err?: any) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});