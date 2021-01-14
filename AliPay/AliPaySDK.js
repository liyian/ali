var fs = require('fs')
let AlipaySdk = require("alipay-sdk").default;
const AlipayFormData = require('alipay-sdk/lib/form').default;

const alipaySdk = new AlipaySdk({
    appId:'2021002119669650',
    privateKey: fs.readFileSync('./AliPay/rsa_private_key.pem','ascii'),
    alipayPublicKey: fs.readFileSync('./AliPay/rsa_public_key.pem', 'ascii'),
	sign_type: 'RSA2',
	charset: 'utf-8'

	});
	
class aliplayApi {
  /**
   * get accToken
   * @param {obj} param0 
   */
  static async accToken(code) {
    console.log("code token", code);
    try {
      let params = {
        grantType: 'authorization_code',
        code,
      };
      let options = {};
      let r1 = await alipaySdk.exec("alipay.system.oauth.token", params, options);
      return r1;
    }
    catch (e) {
      console.log('get access token error:'+e);
    }
  }

   /**
   * get detailed user info
   * @param {obj} param0 
   */
    static async userInfo( accessToken) {
		try {
		  let params = {
			auth_token: accessToken
		  };
		  let options = {};
		  let r1 = await alipaySdk.exec("alipay.user.info.share", params, options);
		  return r1;
		}
		catch (e) {
		  console.log(e);
		}
    }
	
	static async payment(totalAmount, subject, buyer_id ){
		const formData = new AlipayFormData();
		formData.setMethod('get');
		formData.addField('notifyUrl', 'https://test.*****.com/my_callback');
		formData.addField('bizContent', {
		  outTradeNo: 'T232222222', 
		  totalAmount: totalAmount,  //'1.00' must be string
		  subject: subject,
		  buyer_id: buyer_id //user_id *required otherwise get invalid param error
		});
		 
		const payUrl = await alipaySdk.exec('alipay.trade.create', {}, { formData: formData });
		// * exec return an callback url, we must send http request to get the ali server response 必须自己发送http请求去获取服务器返回结果
		const response = await utils.httpGetSync(payUrl);
		 
		// check sign
		if (!alipaySdk.checkResponseSign(response, 'alipay_trade_create_response')) {
		  throw new Error('payment failed');
		}
		const { alipay_trade_create_response: res, sign } = JSON.parse(response);
		return alipay_trade_create_response
		logger.info('services.order.createMyOrder res=', res);
	}
};


module.exports = aliplayApi;
