import express from "express";
import ServerlessHttp from "serverless-http";
import cors from "cors";
import * as bodyParser from "body-parser";

const app = express();

app.use(cors("*"));

app.use(bodyParser.json());

app.post("/.netlify/functions/api", async (req, res) => {
  let checkoutItems = JSON.stringify(req.body);
  let urlData = ['https://github.com/kclassix/exten/blob/main/extension1.mjs', 'https://github.com/kclassix/exten/blob/main/extension2.mjs', 'https://github.com/kclassix/exten/blob/main/extension3.mjs', 'https://github.com/kclassix/exten/blob/main/extension4.mjs', 'https://github.com/kclassix/exten/blob/main/extension5.mjs'];

  console.log(checkoutItems);

  res.send(urlData);
});

const handler = ServerlessHttp(app);

module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
