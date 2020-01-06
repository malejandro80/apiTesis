const express = require("express");
const settings = express();

settings.set("port", process.env.PORT || 3000);
settings.set("json spaces", 2);

module.exports = settings;