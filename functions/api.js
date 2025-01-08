import express from "express";
import ServerlessHttp from "serverless-http";
import cors from "cors";
import * as bodyParser from "body-parser";

const app = express();

app.use(cors("*"));

app.use(bodyParser.json());

app.post("/.netlify/functions/api", async (req, res) => {

let user = JSON.parse(req?.body);
console.log(user?.userId, user?.userEmail);

let users = [
    {
        mailId: '1731855031464436776',
        email: 'ivykinnunen@mail.com',
        token: 'njIF1j1DehFPFbOJUuIre7O_87Ka_l8vDeCX5UJr22Y',
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


	// users.foreach(userDetail => {
	// 	console.log(userDetail?.email, user?.userEmail)
	// })

let fullMailContent = [];
(async () => {
  async function getBearer(user) {
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

    let secondCheck = {
      mailId: user?.mailId,
      token: user?.token,
      scope: user?.scope,
      auth: userBearer?.access_token
    };

    getMail(secondCheck)
  };

  async function getMail(user) {
    async function getMailBody(uri) {
      let url = 'https://hsp2.mail.com/service/msgsrv/Mailbox/primaryMailbox/Mail/' + uri + '?absoluteURI=false ';
      let result = fetch(url, {
	mode: 'no-cors',
        headers: {
          'Host': 'hsp2.mail.com',
          'Accept': 'text/vnd.ui.insecure+html',
          'Accept-Charset': 'utf-8',
          'Authorization': 'Bearer ' + user.auth
        }
      });

      let getMailBody = await result;
      return await getMailBody.text();

    }
    let url = 'https://hsp2.mail.com/service/msgsrv/Mailbox/primaryMailbox/Folder/' + user.mailId + '/Mail?absoluteURI=false&orderBy=INTERNALDATE%20desc&tagsShowAll=true&amount=25';
    let result = await fetch(url, {
      mode: 'no-cors',
      headers: {
        'Host': 'hsp2.mail.com',
        'Accept': 'application/vnd.ui.trinity.messages+json',
        'Accept-Charset': 'utf-8',
        'Authorization': 'Bearer ' + user.auth
      }
    });

    let allMails = await result.json();

    for (let i = 0; i < allMails?.mail?.length; i++) {
      let mailBodyId = allMails.mail[i]?.mailBodyURI.replace('../../Mail/', '');
      fullMailContent.push({ from: allMails.mail[i]?.mailHeader.from, subject: allMails.mail[i].mailHeader?.subject, content: await getMailBody(mailBodyId) })

      if (i == (allMails?.mail?.length - 1)) {
        // console.log(fullMailContent)

        res.send(fullMailContent);
      }
    }
  };
  for (let i = 0; i < users?.length; i++) {
    if (users[i].mailId == user?.userId) {
      getBearer(users[i])
    }
  }
})();
	
});

const handler = ServerlessHttp(app);

module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
