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
	    //let r2 = await aliSDK.userInfo(r1);  Ali deleted getUserInfo at backend 
		let order = await aliSDK.payment('0.01','a',r1.userId);
		console.log(r1,order)
	    ctx.body = {
			r1,order
		}
	}
	catch (e) {
	   console.log(e);
	}
});

router.post('/payment',async (ctx,next) => {
    let {subject, amount} = ctx.request.body
	console.log(ctx.request.body)
	try {
	    let trade_NO = await aliSDK.payment(subject,amount);
	   
	    ctx.body = {
			trade_NO
		}
	}
	catch (e) {
	   console.log(e);
	}
});


//the alipayment call_back(notify_url) after finishing payment 
router.get('/my_callback',async (ctx,next) => {
    
	console.log(ctx.query)
	var a = ctx.query
	try {
	 
	    ctx.body = {
			a
		}
	}
	catch (e) {
	   console.log(e);
	}
});

module.exports = router
