var express = require('express');
const {addMsg} = require("../business/message");
const {getMessages} = require("../utils/db");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Porfolio' });
});

router.post('/add-message', async function(req, res, next ) {
  let result = await addMsg(req, res, next);
  res.send(result);
});

router.get('/messages', function (req, res, next) {
  res.render("messages")
});

router.get('/msg-list', async function(req, res, next) {
  let result = await getMessages()
  res.send(result)
})

module.exports = router;
