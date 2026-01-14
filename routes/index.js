var express = require('express');
var router = express.Router();
const axios = require('axios');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');

const oauth = OAuth({
  consumer: {
    key: 'a0288b4616c039d39f11941e7c46f2e1fcce5fed6b98bc9646c5e5d0ea1704f4',
    secret: '73b8d3f37b8c777b33ded3e7a5e575aec5fbfc18b77513d7afb98a143c10e642'
  },
  signature_method: 'HMAC-SHA256',
  hash_function(baseString, key) {
    return crypto.createHmac('sha256', key).update(baseString).digest('base64');
  }
});

router.post('/additional/services/test', async (req, res) => {
  const url =
    'https://6358471-sb1.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=3572&deploy=1';

  try {
    console.log('Payload received:', req.body);

    // Generate OAuth headers with access token
    const token = {
      key: 'f1d8be2cab2f85eda1b99e09573c6a5519a284015d0fb64f8052946ae3be260a',
      secret: 'c0057c82bd2261055a662cb5883a55cc101b9e31299526d62bc1acbd49c17dea'
    };

    const oauthHeader = oauth.toHeader(oauth.authorize({ url, method: 'POST' }, token));

    // Add realm manually (required by NetSuite)
    oauthHeader['Authorization'] = oauthHeader['Authorization'].replace(
      'OAuth ',
      `OAuth realm="6358471_SB1", `
    );

    const response = await axios.post(url, req.body, {
      headers: {
        ...oauthHeader,
        'Content-Type': 'application/json'
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Payload sent to NetSuite successfully',
      netsuiteResponse: response.data
    });

  } catch (error) {
    console.error('NetSuite error:', error?.response?.data || error.message);
    return res.status(500).json({
      success: false,
      error: error?.response?.data || error.message
    });
  }
});


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
