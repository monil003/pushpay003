var express = require('express');
var router = express.Router();
const apiRouter = require('./api/index');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/additional/services/test', (req, res) => {
  console.log('Payload received:', req.body);

  return res.status(200).json({
    success: true,
    message: 'Test route hit successfully',
    payload: req.body
  });
});

router.use('/api', apiRouter);

module.exports = router;
