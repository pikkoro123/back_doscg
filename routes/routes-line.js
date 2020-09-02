const express = require('express');

const LineBotController = require('../controller/line-bot/line-bot');
const lineBotCache = require('../middleware/memory-cache/line-bot');

const router = express.Router();

router.get("/", lineBotCache.getLineBotStatusCache, LineBotController.getStatusLine);
router.post("/webpack", LineBotController.postWebpack);

module.exports = router;
