



var apn = require("apn");

var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const fs = require('fs')
fs.readFileSync("k.p8");

const port = process.env.PORT || 3001;

var options = {
  token: {
    key: "k.p8",  // Ensure this path is correct
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
note.alert = "You have a new call from door";

note.topic = "com.lockersuites.doorCall.voip";

app.post('/sendVoip', (req, res) => {

  note.payload = {
    "aps": {"alert": "Hien Nguyen Call"},
    "id": "44d915e1-5ff4-4bed-bf13-c423048ec97a",
    "nameCaller": "Door Call",
    "handle": "0123456789",
    "isVideo": false,
    'meeting_id':req.body.meeting_id,
    'token':req.body.token,
  };
  //0b3de039371ba820d34309ed316128458e3944318e9611bd2e6ab16489baf242
  // console.log(req.body); // teh posted data

  // return res.json({ success: false,data: req.body });

  apnProvider.send(note, req.body.token).then((response) => {
    if (response.failed.length > 0) {
      console.log("Failed to send notification:", response.failed);
      return res.json({ success: false, errors: response.failed});
    } else {
      console.log("Notification sent successfully:", response.sent);
      return res.json({ success: true, sent: response.sent,data:note.payload });
    }
  }).catch((error) => {
    console.error("Error sending notification:", error);
    return res.status(500).json({ success: false, error: error.message });
  });
});
app.listen(port, () => {
  console.log('Server is running on port ${port}');
});

