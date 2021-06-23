//imports
const express = require("express");
const cors = require("cors");
const { data } = require("./data");
const GLOBALKEY = "prueba_tecnica_talentum";
const app = express();

//configuration express
app.set("PORT", process.env.PORT || 3030);

//Middleware
app.use(cors());
function verificationKey(req, res, next) {
  const headerKey = req.headers["key"];
  const origin = req.headers["origin"];

  if (typeof headerKey !== "undefined" && origin === "http://localhost:3000") {
    const key = headerKey.split(" ");
    const keyToken = key[1];

    if (keyToken == GLOBALKEY) {
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
}
//routes GET
app.get("/data/:key", verificationKey, (req, res) => {
  res.json(data);
});

app.listen(app.get("PORT"), () => {
  // console.log(data);
  console.log(`server running on http://localhost:${app.get("PORT")}`);
});
