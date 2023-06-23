const express = require("express");
const router = express.Router();

require("./currencycloud")(router)
require("./fiat")(router);
require("./litecoin")(router);
require("./stripe")(router)
require("./transaction")(router)
require("./user")(router)


module.exports = router;
