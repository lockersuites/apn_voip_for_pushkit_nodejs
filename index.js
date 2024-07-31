var apn = require("apn");
const express = require('express');
const app = express();

var options = {
  token: {
    key: "./keys/k2.p8",  // Ensure this path is correct
    keyId: "79SB9M6354",  // Ensure this keyId is correct
    teamId: "RD3BT9HJWM"  // Ensure this teamId is correct
  },
  production: false  // Set to true if you are using the production environment
};

var apnProvider = new apn.Provider(options);

var note = new apn.Notification();

note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now
note.badge = 3;
// note.sound = "ping.aiff";
note.alert = "You have a new call";
note.payload = {
  "aps": {"alert": "Hien Nguyen Call"},
  "id": "44d915e1-5ff4-4bed-bf13-c423048ec97a",
  "nameCaller": "Hien Nguyen",
  "handle": "0123456789",
  "isVideo": true
};
note.topic = "com.lockersuites.doorCall.voip";

app.get('/sendVoip', (req, res) => {
  // g
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});