



var apn = require("apn");
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

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
note.alert = "You have a new call from door";

note.topic = "com.lockersuites.doorCall.voip";

app.post('/sendVoip', (req, res) => {

  note.payload = {
    "aps": {"alert": "Hien Nguyen Call"},
    "id": "44d915e1-5ff4-4bed-bf13-c423048ec97a",
    "nameCaller": "Hien Nguyen",
    "handle": "0123456789",
    "isVideo": true,
    'meeting_id':req.meeting_id,
    'token':req.token,
  };
  //0b3de039371ba820d34309ed316128458e3944318e9611bd2e6ab16489baf242
  
  apnProvider.send(note, req.token).then((response) => {
    if (response.failed.length > 0) {
      console.log("Failed to send notification:", response.failed);
      return res.json({ success: false, errors: response.failed });
    } else {
      console.log("Notification sent successfully:", response.sent);
      return res.json({ success: true, sent: response.sent,data:payload });
    }
  // }).catch((error) => {
  //   console.error("Error sending notification:", error);
  //   return res.status(500).json({ success: false, error: error.message });
  // });
});
app.listen(port, () => {
  console.log('Server is running on port 3000');
});

