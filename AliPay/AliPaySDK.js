var fs = require('fs')
let AlipaySdk = require("alipay-sdk").default;
const AlipayFormData = require('alipay-sdk/lib/form').default;
const koa2Req = require('koa2-request')

const alipaySdk = new AlipaySdk({
    appId:'2021002119669650',
    privateKey: fs.readFileSync('./AliPay/rsa_private_key.pem','ascii'),
    alipayPublicKey: fs.readFileSync('./AliPay/rsa_public_key.pem', 'ascii'),
	sign_type: 'RSA2',
	charset: 'utf-8'
//privateKey: 'MIIEowIBAAKCAQEAgZgNRQqzHgkmDu+J86E2twGXwb7w5rB0D7uUr3jI7XosscTgqAK1n6vkoRe+FmmFP7CpKpzDRksBqs45aSwMb1wCqJiWtClTphrrIJ+CAh69EwL4p28hgK/t7GrmCroSz2US3z4kaW48EK4lJOjcrDJzGxck4kDjgiPLB7oOssKMKScnapBf8XK5KM6WmJF5kN0Om0l++5ycs2UWuyN/xcrE2IhEcuRrhG9Bh1m5YklFSY1B9+pPV53y93Tn1AyRW3CoTmgej1JrIEAaCqU4MkKTuwsTpyxdwB9MsAcKBizFa2eM+RJ+8bUu3saQV9QK9EZGNbVJRNDnq6TYt2XQ2wIDAQABAoIBADrqR04V+Sw0eIrdt1d8+QTlwnogNiCKI5lra8MCJEZh/qOqn3+CC9PVL5FU2+QQgLVduOpYbiYsv0tJiawYjGar68F97TVmfFLNdgtUuKQCGW7lMOndiduZH48VYhOKWDbU+mlnNOKBbOkgYl6PRpM6ND4inXAGk+d8IjcXDMuTIO/GL8zXRHLS3K3NiKNt+qt4nKqCL4+ncHvZ73pkQhIoQS3of78vmMBfCq6OtdimT/zktZ+T0SMok1uWsjDx2nCro29Pa1LZb4eTNlWTYsc6x2aGLen4EjxVksFrEd5SqJODwEUQaY8rdnCiGnW6C9UcnA7tl+42IwB4QjDRF8ECgYEA4fUnmf9KF9q5Nmb/Uh01KVspGiJrx6UkJ9Z25lS0PhALBS4znTp+4N1m6UYIC2sry3nwOr1SzrBv3qM7XSkbtcRYPq+sXOcpigWUVz7TWch4GrNcC5QOkT8+GP/G8o31k7RgvAsL/iegCF1/e2GcWlYR9ERJDzZTI3ebP2BH7jECgYEAktL/ksEwTvqiNm8qr6eFF3iBhExVUiN+AYaOgrY+EfemQJm7qTvOCsgZATxFoS92WXWGfqSF3Wy4YI8MJERze9Uu0gsKgiPZMNUVdu+vxXkWzTlD3Ttlu2sbvZ8MzTPihIJaUXs1cjzQ3KT7lIrPG5mLJOfwl8iQ9+yFcXZu8MsCgYEAtkYwCv8wQuvzCpqtjgz3rIPYNTfdH/DsqKJNyeI8f/ArI6OwiT39yeFwOe9/X861Rm/4RToiSY90vvGIWs9lhgx8bx0BevQSwz9a+cI5dizMDiXvs3tdAPg2XK5AS7wOhXc1rZtvsjc+1mCuDNah7RGPbC+FjBrzmCHM/6PogpECgYBKCBQP1lNab2vdUJ5QZYJpPDzqDWcz/Gtrr4IqDGQtwRZWGm4SPfJ9YzmgctiVFo5xOx4uuxw4crphDZ/MpaspNGvgQurwhczcn4SsLN0PEChcIFTEt09ree1J5mmZCmFb+TI7RYnEaT/TEWk9E+SsAPa1DDI3Bk16hQsgE9yKkwKBgGF87UK6CfruZWZU/KvR3jRcStgFgxw0PAR0y6zo98MuO0BwyvM3ScpPcbap52R49dVp2a8wgDjYTRjW2ibTZ5a4iKZ1/LKY8bHE0TrQ72r7nKyj8VOk0DVRoipXKQRmVfYc06lW+iKCwBCupT24mLpln7HeSloxkP7XZIrSZbG4',
//	alipayPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0tZ66sfUh96AxQXDuOHqv6bG8gt++A7u+38tI64XuGFMgo16WA1JZ1K9V4snYX7nXD59JL+d1s1N7HxmtBSxuZt8TEcu+49Y+kbTBUIb357wK+awacoEx0F5udJjmU0dQbr5cqVyK6MuiGCP8ZS6oOUkPkKVqKwFYUHQfgIckyQaix2xjJgm56iSpgNfuqbjuu4oqRumXg4KvxpjP597WwmQxT5JzkXLqvbKCwR/DhV/9dgMXEF6L6AqyLWgtBsPKson+E4WtNwjhVtNsXs3BUJgs0VKn/u/KKSZnhtAOZkiC2vDgMMdDpynKu82Iv0EcCBSyk6Rk4jt8rnFQ9z5kQIDAQAB',
	
	});
	
class aliplayApi {
  /**
   * get accToken
   * @param {obj} param0 
   * @return token {
		  accessToken: 'authusrB99089f8bb78a4a1b976975c8523c8B06',
	?	  alipayUserId: '20881038215465844590187660610606',
		  expiresIn: 1296000,
		  reExpiresIn: 2592000,
		  refreshToken: 'authusrBef7fd104520f47079ebc7d0c538bfX06',
	?	  userId: '2088041230814063'
		}
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
	  console.log('token',r1)
	  //TODO: store token and id in a session
	  return r1;
	}
	catch (e) {
	  console.log('get access token error:'+Object.keys(e)+Object.values(e));
	}
	}
	
	static async payment(totalAmount, subject,buyer_id){ 
		const formData = new AlipayFormData();
		formData.setMethod('get');
		formData.addField('notifyUrl', 'https://edflabschina.cn:5758/aliPay/my_callback');
		formData.addField('bizContent', {
		  outTradeNo: 'T232222222', 
		  totalAmount: totalAmount,  //'1.00' must be string
		  subject: subject,
		  buyer_id: buyer_id //user_id *required otherwise get invalid param error
		});
		const payUrl = await alipaySdk.exec('alipay.trade.create', {}, { formData: formData });
		// * exec return an callback url, we must send http request to get the ali server response 
		console.log(payUrl)
		var options = {
		    method: 'get',
		    url: payUrl,
			headers: {
			      'Content-Type': 'application/json',
			      'Accept': 'application/json'
			    },
		}
		var response = await koa2Req(payUrl)
		console.log(response.body)
		response = response.body
		
		//check sign
		if (!alipaySdk.checkResponseSign(response, 'alipay_trade_create_response')) {
		  throw new Error('payment failed');
		}
		const { alipay_trade_create_response: res, sign } = JSON.parse(response);
	
		return res
		logger.info('services.order.createMyOrder res=', res);
	}
};


module.exports = aliplayApi;
