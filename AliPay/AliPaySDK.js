const fs = require('fs');
let AlipaySdk = require("alipay-sdk").default;

const alipaySdk = new AlipaySdk({
    appId:'2021002119669650',
    privateKey: fs.readFileSync('../AliPay/private-key.pem','ascii')
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
};

module.exports = aliplayApi;
