var apn = require("apn");

var deviceToken = "device token";

var service = new apn.Provider({
  cert: "../keys/cert.pem",
  key: "../keys/key.pem",
});

var note = new apn.Notification();

note.expiry = Math.floor(Date.now() / 1000) + 60; // Expires 1 minute from now.
// note.badge = 3;
// note.sound = "ping.aiff";
// note.alert = " You have a new message";
const payload = {
  id: 1,
  type: "bumpcall",
};
note.payload = payload;
note.topic = "(com.chartmaker.social.bumpcal).voip";
note.priority = 10;
note.pushType = "alert";

service.send(note, deviceToken).then((err, result) => {
  if (err) return console.log(JSON.stringify(err));
  return console.log(JSON.stringify(result));
});
