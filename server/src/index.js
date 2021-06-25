//imports
const express = require("express");
const cors = require("cors");
const { data } = require("./data");

const chalk = require("chalk");
const GLOBALKEY = "prueba_tecnica_talentum";
const app = express();

//configuration express
app.set("PORT", process.env.PORT || 3030);
app.set("ORIGIN", process.env.ORIGIN || "http://localhost:3000");
//Middleware
app.use(cors()); //cors

app.use(function (req, res, next) {
  //key validation and origin
  const headerKey = req.headers["key"];
  const origin = req.headers["origin"];

  if (typeof headerKey !== "undefined" && origin === app.get("ORIGIN")) {
    console.log(chalk.blue(`The origin ${origin} valid its key`));
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
});

//routes GET
app.get("/data/:key", ({ params: { key } }, res) => {
  console.log(chalk.green("Enter the route with the key ") + chalk.blue(key));
  if (key == "Cali") {
    res.json(data);
  } else if (key == "Medellin") {
    res.json(data);
  } else {
    res.sendStatus(404);
  }
});

app.listen(app.get("PORT"), () => {
  // console.log(data);
  console.log(`server running on http://localhost:${app.get("PORT")}`);
});
