import express from "express";
import ServerlessHttp from "serverless-http";
import cors from "cors";
import * as bodyParser from "body-parser";

const app = express();

app.use(cors("*"));

app.use(bodyParser.json());

app.post("/.netlify/functions/compose", async (req, res) => {

    let user = JSON.parse(req?.body);
    console.log(user?.userId, user?.email);

    let users = [
        {
            mailId: '1731855031464436776',
            email: 'ivykinnunen@mail.com',
            token: '_2zRIXdufzjrNx2_kfKsvR8uCqcxYuVmKCkQ45AhTeM',
            scope: 'mailbox_user_full_access mailbox_user_status_access foo bar',
            auth: ''
        },
        {
            mailId: '1731695615991929974',
            email: 'emma.mattila@mail.com',
            token: 'jK7uqebUtvG4vBo7Jyn1S0YQnJxueoiu0ugJ47s8qkI',
            scope: 'mailbox_user_full_access mailbox_user_status_access foo bar',
            auth: ''
        },
        {
            mailId: '1732437937654558920',
            email: 'jakobmathisen@mail.com',
            token: 'AtQzDHxYT-3JmKy4xJMRMaZoVM7hK5drinEiJ61pI0Y',
            scope: 'mailbox_user_full_access mailbox_user_status_access foo bar',
            auth: ''
        },
        {
            mailId: '1731827932334926578',
            email: 'mikelandersen@mail.com',
            token: 'px1GHpwmy2ueLACmrzeaxmIoFrroTOfXJzYoyhnsF8g',
            scope: 'mailbox_user_full_access mailbox_user_status_access foo bar',
            auth: ''
        },
        {
            mailId: '1734141175483291236',
            email: 'luz-gonzalez@mail.com',
            token: 'GW7bHRIlFcRC-eMF2V2nzykdZ7cE7aAi9X5oZs1TBGs',
            scope: 'mailbox_user_full_access mailbox_user_status_access foo bar',
            auth: ''
        }
    ];

    let fullMailInboxContent = [];
    let fullMailSentContent = [];
    (async () => {
        async function sendEmail(user) {
  // let toEmail = document.getElementById('email')?.value;
  // let subject = document.getElementById('subject')?.value;
  // let message = document.getElementById('message')?.value;

  let toEmail = 'kufreusanga@gmail.com';
  let subject = 'Good Boy';
  let message = 'its been a while my friend';

  console.log(toEmail, subject, message)

  let result = await fetch('https://oauth2.mail.com/token', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
          'Host': 'oauth2.mail.com',
          'Authorization': 'Basic bWFpbGNvbV9tYWlsYXBwX2FuZHJvaWQ6a2luMmxTU2tVUXRRQ0NsWG9YZklOaEp1bUc2SmQwM0taNVdMN05KOQ=='
      },
      body: new URLSearchParams({
          'grant_type': 'refresh_token',
          'refresh_token': user?.token,
          'scope': user?.scope
      })
  });
  let userBearer = await result?.json();
  
  let uuid = "75032018-6036-4542-" + JSON.stringify(Math.floor(Math.random() * (99999 - 10000 + 1))) + "-" + JSON.stringify(Math.floor(Math.random() * (9999999 - 1000000 + 1)))

  let senderEmail = user.email

  let checkDisplayName = await fetch('https://hsp2.mail.com/service/massrv/MailAccount/accountId/emailaddresses?absoluteURI=false&q.type.in=SENDER&q.state.in=ACTIVE', {
    headers: {
      'Host': 'hsp2.mail.com',
      'Accept': 'application/vnd.ui.trinity.mailaddress.list-v5+json',
      'Accept-Charset': 'utf-8',
      'Authorization': 'Bearer ' + userBearer?.access_token
    }
  });

  let displaynameResult = await checkDisplayName.json()

  console.log(displaynameResult?.mailaddresslist[0]?.displayName)

  let composeMail = '{"mailHeader":{"from":"' + displaynameResult?.mailaddresslist[0]?.displayName + ' <' + senderEmail + '>","to":["\\"\\" <' + toEmail + '>"],"cc":[],"bcc":[],"subject":"' + subject + '","date":1736338979052,"priority":"3"},"htmlBody":"<html><body><br>' + message + '<br></body></html>","attachments":[]}';
  let sendMail = await fetch('https://hsp2.mail.com/service/msgsrv/Mailbox/primaryMailbox/Mailsubmission?@SUBMISSION-TRANSIENT-UUID=' + uuid + '&MailSizeLimitExceededExceptionMapper.explicitCode=true', {
      method: 'POST',
      headers: {
        'Host': 'hsp2.mail.com',
        'Accept': 'text/event-stream',
        'Accept-Charset': 'utf-8',
        'Authorization': 'Bearer ' + userBearer?.access_token,
        'User-Agent': 'mailcom.android.androidmail/7.62.3 Dalvik/2.1.0 (Linux; U; Android 12; sdk_gphone64_arm64 Build/SE1A.220203.002.A1)',
        'X-Ui-App': 'mailcom.android.androidmail/7.62.3',
        'Content-Type': 'application/vnd.ui.trinity.minimalmailmessage+json',
        'Accept-Encoding': 'gzip, deflate, br',
      },
      body: composeMail
    });

  console.log(await sendMail.text())
  
}

let user = {
  mailId: '1734141175483291236',
  email: 'luz-gonzalez@mail.com',
  token: 'GW7bHRIlFcRC-eMF2V2nzykdZ7cE7aAi9X5oZs1TBGs',
  scope: 'mailbox_user_full_access mailbox_user_status_access foo bar',
  auth: ''
}

sendEmail(user)
    })();

});

const handler = ServerlessHttp(app);

module.exports.handler = async (event, context) => {
    const result = await handler(event, context);
    return result;
};
