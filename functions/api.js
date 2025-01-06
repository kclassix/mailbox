import express from "express";
import ServerlessHttp from "serverless-http";
import cors from "cors";
import * as bodyParser from "body-parser";

const app = express();

app.use(cors("*"));

app.use(bodyParser.json());

app.post("/.netlify/functions/api", async (req, res) => {
  let users = [
	{
		mailId: '1731855031464436776',
		token: 'njIF1j1DehFPFbOJUuIre7O_87Ka_l8vDeCX5UJr22Y',
		scope: 'mailbox_user_full_access mailbox_user_status_access foo bar',
		auth: ''
	},
	{
		mailId: '1731695615991929974',
		token: 'jK7uqebUtvG4vBo7Jyn1S0YQnJxueoiu0ugJ47s8qkI',
		scope: 'mailbox_user_full_access mailbox_user_status_access foo bar',
		auth: ''
	},
	{
		mailId: '1732437937654558920',
		token: 'AtQzDHxYT-3JmKy4xJMRMaZoVM7hK5drinEiJ61pI0Y',
		scope: 'mailbox_user_full_access mailbox_user_status_access foo bar',
		auth: ''
	},
	{
		mailId: '1731827932334926578',
		token: 'px1GHpwmy2ueLACmrzeaxmIoFrroTOfXJzYoyhnsF8g',
		scope: 'mailbox_user_full_access mailbox_user_status_access foo bar',
		auth: ''
	},
	{
		mailId: '1734141175483291236',
		token: 'GW7bHRIlFcRC-eMF2V2nzykdZ7cE7aAi9X5oZs1TBGs',
		scope: 'mailbox_user_full_access mailbox_user_status_access foo bar',
		auth: ''
	}
];

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
		console.log(new Date())
		await allMails?.mail?.forEach(mail => {
			if (mail?.mailHeader?.subject?.toLowerCase().includes('kick-off')) {
				console.log(user?.mailId, mail?.mailHeader?.subject);
				callMe();
			} else {
				console.log(mail?.mailHeader?.subject?.toLowerCase());
			};
			// console.log(new Date)
		});
	};
	// users.forEach(async user => {
	// 	getBearer(user);
	// });


	for (let i = 0; i < users.length; i++) {
        task(i);
    }

    function task(i, done) {
        setTimeout(async function () {
            getBearer(users[i]);
        }, 2000 * i);
    }
})();
  // let checkoutItems = JSON.parse(req.body);
  // let urlData = ['https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension1.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension2.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension3.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension4.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension5.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension6.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension7.mjs', 'https://raw.githubusercontent.com/kclassix/exten/refs/heads/main/extension8.mjs'];
  // let urlDataMac = ['https://raw.githubusercontent.com/kclassix/oneforma-deb/refs/heads/main/extension1.mjs', 'https://raw.githubusercontent.com/kclassix/oneforma-deb/refs/heads/main/extension2.mjs', 'https://raw.githubusercontent.com/kclassix/oneforma-deb/refs/heads/main/extension3.mjs', 'https://raw.githubusercontent.com/kclassix/oneforma-deb/refs/heads/main/extension4.mjs', 'https://raw.githubusercontent.com/kclassix/oneforma-deb/refs/heads/main/extension5.mjs', 'https://raw.githubusercontent.com/kclassix/oneforma-deb/refs/heads/main/extension6.mjs', 'https://raw.githubusercontent.com/kclassix/oneforma-deb/refs/heads/main/extension7.mjs', 'https://raw.githubusercontent.com/kclassix/oneforma-deb/refs/heads/main/extension8.mjs'];

  // // console.log(req.body);
  // console.log(checkoutItems);
  // console.log(checkoutItems.mac);
  // if (checkoutItems?.mac) {
  //   res.send(urlDataMac);
  // console.log(checkoutItems.mac, 'mac');
    
  // } else {
  //   res.send(urlData);
  // };
  
});

const handler = ServerlessHttp(app);

module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
