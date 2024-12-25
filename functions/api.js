import express from "express";
import ServerlessHttp from "serverless-http";
import cors from "cors";
import * as bodyParser from "body-parser";

const app = express();

app.use(cors("*"));

app.use(bodyParser.json());

app.post("/.netlify/functions/api", async (req, res) => {
  let checkoutItems = JSON.parse(req.body);
  let urlData = ['https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension1.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension2.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension3.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension4.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension5.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension6.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension7.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension8.mjs'];
  let urlDataMac = ['https://raw.githubusercontent.com/kclassix/oneforma-deb/refs/heads/main/extension1.mjs', 'https://raw.githubusercontent.com/kclassix/oneforma-deb/refs/heads/main/extension2.mjs', 'https://raw.githubusercontent.com/kclassix/oneforma-deb/refs/heads/main/extension3.mjs', 'https://raw.githubusercontent.com/kclassix/oneforma-deb/refs/heads/main/extension4.mjs', 'https://raw.githubusercontent.com/kclassix/oneforma-deb/refs/heads/main/extension5.mjs', 'https://raw.githubusercontent.com/kclassix/oneforma-deb/refs/heads/main/extension6.mjs', 'https://raw.githubusercontent.com/kclassix/oneforma-deb/refs/heads/main/extension7.mjs', 'https://raw.githubusercontent.com/kclassix/oneforma-deb/refs/heads/main/extension8.mjs'];

  // console.log(req.body);
  console.log(checkoutItems);
  console.log(checkoutItems.mac);
  if (checkoutItems?.mac) {
    res.send(urlData);
  } else {
    res.send(urlData);
  };
  
});

const handler = ServerlessHttp(app);

module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
