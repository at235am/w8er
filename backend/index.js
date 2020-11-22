const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const accountSid = process.env.SMS_ACCOUNT_SID;
const authToken = process.env.SMS_AUTH_TOKEN;

const sms = require("twilio")(accountSid, authToken);

const port = 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));

app.get("/sms/", (req, res) => {
  console.log("hello");
  res.send("Hello World!");

  console.log("req", req.query);
  if (req.query) {
    try {
      const { phone, reserveTime, id } = req.query;

      const sanitizedNum = `+1${phone.match(/\d/g).join("").substring(0, 10)}`;
      // console.log("sn", sanitizedNum);

      sms.messages
        .create({
          body: `Thank you for ${
            reserveTime ? "reserving" : "waitlisting"
          } through w8r! Check your status at https://w8r.in/c/${id}`,
          from: "+13204463499",
          to: sanitizedNum,
        })
        .then((message) => console.log(message.sid));
    } catch (e) {
      console.log("oops", e);
      res.send("oops no send text");
    }
  }

  // sms.messages
  //   .create({
  //     body: `Thank you for {guestType} with {restaurantName} through W8R.IN! Check your status at https://w8r.in/c/{confirmationNumber}`,
  //     from: "+13204463499",
  //     to: "+14242058477",
  //   })
  //   .then((message) => console.log(message.sid));
});
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
