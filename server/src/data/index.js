const fs = require("fs");

let raw = fs.readFileSync(`${__dirname}/weather.json`);
let data = JSON.parse(raw);
module.exports = { data, json: raw };
