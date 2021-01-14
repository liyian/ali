const router = require('koa-router')({
    prefix: '/aliPay'
})
let Fly = require("flyio/src/node")
let fly = new Fly()
const { mysql } = require('../mysql')
var jwt = require('jsonwebtoken')
let aliSDK = require("../AliPay/AliPaySDK.js")

router.post('/oauth',async (ctx,next) => {
    let {code} = ctx.request.body
	console.log('code',code)
	try {
	    let r1 = await aliSDK.accToken(code);
	    let r2 = await aliSDK.userInfo(r1);
	    ctx.body = {
			r1,r2
		}
	}
	catch (e) {
	   console.log(e);
	}
});


module.exports = router
