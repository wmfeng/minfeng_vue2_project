var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  var svgCaptcha = require('svg-captcha');
  var captcha = svgCaptcha.create();
  res.send(captcha.data);
});

module.exports = router;