const VonageVideo = require("opentok");
const vonageVideo = new VonageVideo(apiKey, apiSecret);

// vonageVideo.createSession((err, session) => {
//   console.log(session.sessionId);
// });

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// const token = vonageVideo.generateToken(sess)
app.get("/token", (req, res) => {
  res.json({
    apiKey,
    sessionId,
    token: vonageVideo.generateToken(sessionId),
  });
});

app.listen(3000);
