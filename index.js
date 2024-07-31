
// var deviceToken = "0b3de039371ba820d34309ed316128458e3944318e9611bd2e6ab16489baf242";

// var service = new apn.Provider({
//   cert: "../keys/cert.pem",
//   key: "../keys/key.pem",
// });

// var note = new apn.Notification();

// note.expiry = Math.floor(Date.now() / 1000) + 60; // Expires 1 minute from now.
// // note.badge = 3;
// // note.sound = "ping.aiff";
// // note.alert = " You have a new message";
// const payload = {
//   id: 1,
//   type: "bumpcall",
// };
// note.payload = payload;
// note.topic = "com.lockersuites.adminq.voip";
// note.priority = 10;
// note.pushType = "alert";

// service.send(note, deviceToken).then((err, result) => {
//   if (err) return console.log(JSON.stringify(err));
//   return console.log(JSON.stringify(result));
// });
var apn = require("apn");

const express = require('express');

const app = express();
var options = {
  token: {
    key: "./keys/k2.p8",
    keyId: "79SB9M6354",
    teamId: "RD3BT9HJWM"
  },
  production: false
};

var apnProvider = new apn.Provider(options);

var note = new apn.Notification();

note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
note.badge = 3;
// note.sound = "ping.aiff";
note.alert = "You have a new call";
note.payload = {"aps":{"alert": "Hien Nguyen Call"}, "id": "44d915e1-5ff4-4bed-bf13-c423048ec97a", "nameCaller": "Hien Nguyen", "handle": "0123456789", "isVideo": true};
note.topic = "com.lockersuites.doorCall.voip";


 app.get('/sendVoip', (req, res) => {
  apnProvider.send(note, "0b3de039371ba820d34309ed316128458e3944318e9611bd2e6ab16489baf242").then((err, result) => {
    if (err) return console.log(JSON.stringify(err));
    //return console.log(JSON.stringify(result));
     return res.json(result);

  });
});

