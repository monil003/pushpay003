var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/additional/services/test', async (req, res) => {
  try {
    console.log('Payload received:', req.body);

    const netsuiteResponse = await axios.post(
      'https://6358471-sb1.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=3572&deploy=1',
      req.body, // 👈 forwarding same payload
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'OAuth realm="6358471_SB1",oauth_consumer_key="a0288b4616c039d39f11941e7c46f2e1fcce5fed6b98bc9646c5e5d0ea1704f4",oauth_token="f1d8be2cab2f85eda1b99e09573c6a5519a284015d0fb64f8052946ae3be260a",oauth_signature_method="HMAC-SHA256",oauth_timestamp="1768411583",oauth_nonce="AssHScRtBDr",oauth_version="1.0",oauth_signature="Kop%2Bbj0Uiytzb99NzcSD1T9gpuX96feL2rzCO5XlGpQ%3D"'
        },
        timeout: 15000
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Payload forwarded to NetSuite successfully',
      netsuiteResponse: netsuiteResponse.data
    });

  } catch (error) {
    console.error('NetSuite error:', error?.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: 'Failed to forward payload to NetSuite',
      error: error?.response?.data || error.message
    });
  }
});


module.exports = router;
