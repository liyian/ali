const { mysql, mssql } = require('../../mysql')
var jwt = require('jsonwebtoken')

var crypto = require('crypto');

function _hash_image(str, secret) {
    var cipher = crypto.createCipher("aes192", secret); //设置加密类型 和 要使用的加密密钥
    var enc = cipher.update(str, "utf8", "hex");    //编码方式从utf-8转为hex;
    enc += cipher.final("hex"); //编码方式从转为hex;
    return enc; //返回加密后的字符串
}

function _dehash_image(str, secret) {
    var decipher = crypto.createDecipher("aes192", secret);
    var dec = decipher.update(str, "hex", "utf8");//编码方式从hex转为utf-8;
    dec += decipher.final("utf8");//编码方式从utf-8;
    return dec;
}

async function queryPostById(ctx) {
    let token = ctx.request.header.authorization;
    let result = jwt.verify(token, 'edf');
    const { post_id} = ctx.query;
    const allPost = await mysql('post').leftJoin('user','user.user_id','post.reporter_id').where({
    'post_id': post_id
    }).select()

    for (var i = 0; i < allPost.length; i++) {
            allPost[i].img_url = _dehash_image(allPost[i].img_url,'Edf$2020')
    }

    ctx.body = {
        'post':allPost,
    }
}

async function queryPost(ctx) {
    let token = ctx.request.header.authorization;
    try {
        let result = jwt.verify(token, 'edf');

        const {status} =ctx.query;
        const allPost = await mysql('post').leftJoin('user','user.user_id','post.reporter_id').where({
        'status': status
        }).where({'category':null}).select()
       // const user = await mysql.raw('SELECT p.location, u.nickname FROM user u, post p WHERE u.user_id = p.reporter_id')
        for (var i = 0; i < allPost.length; i++) {
            allPost[i].img_url = _dehash_image(allPost[i].img_url,'Edf$2020')
        }

        ctx.body = {
            'allPost':allPost
        }
    }
    catch (e) {
         ctx.body = 'get post by status failed'+e;
    }
}

async function getAllPost(ctx) {
    let token = ctx.request.header.authorization;
    try {
        let result = jwt.verify(token, 'edf');
        const allPost = await mysql('post').leftJoin('user','user.user_id','post.reporter_id').select()
        for (var i = 0; i < allPost.length; i++) {
            allPost[i].img_url = _dehash_image(allPost[i].img_url,'Edf$2020')
        }

        ctx.body = {
            'allPost':allPost
        }
    }
    catch (e) {
         ctx.body = 'get post by status failed'+e;
    }
}

async function queryPostByCategory(ctx) {
    let token = ctx.request.header.authorization;
    try {
        let result = jwt.verify(token, 'edf');

        const {status,category} =ctx.query;
        const allPost = await mysql('post').leftJoin('user','user.user_id','post.reporter_id').where({
            'status': status,
            'category': category
        }).select()
       // const user = await mysql.raw('SELECT p.location, u.nickname FROM user u, post p WHERE u.user_id = p.reporter_id')
        for (var i = 0; i < allPost.length; i++) {
            allPost[i].img_url = _dehash_image(allPost[i].img_url,'Edf$2020')
        }

        ctx.body = {
            'allPost':allPost
        }
    }
    catch (e) {
         ctx.body = 'get post by status failed'+e;
    }
}

async function queryCategoryCount(ctx) {
    try {
        const {category} =ctx.query;
        const allPost = await mysql('post').leftJoin('user','user.user_id','post.reporter_id').where({
            'category': category
        }).count()

        ctx.body = allPost
    }
    catch (e) {
         ctx.body = 'get post by status failed'+e;
    }
}

async function queryCount(ctx) {
    try {
        const {category,priority} =ctx.query;
        var Priority;
        var Category;
        const allPost = await mysql('post').leftJoin('user','user.user_id','post.reporter_id').where({
            'status': 4
        }).count()

        if(priority) {
            Priority = await mysql('post').leftJoin('user', 'user.user_id', 'post.reporter_id').where({
                'status': 4,
                'priority': priority
            }).count()
        }
        if(category) {
            Category = await mysql('post').leftJoin('user', 'user.user_id', 'post.reporter_id').where({
                'status': 4,
                'category': category
            }).count()
        }
        ctx.body = {
            allPost:allPost,
            finished_priority:Priority,
            finished_category:Category
        }
    }
    catch (e) {
         ctx.body = 'get post by status failed'+e;
    }
}


//添加完了返回Primary Key，data为 post ID
async function addPost(ctx) {
    var { title, img_url, description, location, reporter_id, person_in_charge_id, comments, status } = ctx.request.body
    img_url = _hash_image(img_url,'Edf$2020')
    console.log(img_url)
    var data = await mysql('post').insert({
        'img_url':img_url,
        'title':title,
        'description':description,
        'location':location,
        'reporter_id':reporter_id,
        'person_in_charge_id':person_in_charge_id,
        'comments':comments,
        'status':status
    })

     ctx.body = {
      data: data
    }
}

//把修改post的用户token传过来得到他的唯一openId
async function reviewPost(ctx) {
    let token = ctx.request.header.authorization;
    try {
        let result = jwt.verify(token, 'edf');

        const {post_id, status} = ctx.query

        var findPost = await mysql('post').where({
            'post_id': post_id
        }).select()

        if (findPost.length > 0) {
            const post = await mysql('post').where({
                'post_id': post_id
            }).update({
                'status': status
            });

            if (data) {
                ctx.body = {
                    data: true
                }
            }
            else {
                ctx.body = {
                    data: false
                }
            }
        }
    }
    catch(e){
        ctx.body = 'update status failed'+e+token;
    }
}

async function updatePerson(ctx) {
    let token = ctx.request.header.authorization;
    try {
        let result = jwt.verify(token, 'edf');

        const {post_id, person} = ctx.query

        var findPost = await mysql('post').where({
            'post_id': post_id
        }).select()

        if (findPost.length > 0) {
            const post = await mysql('post').where({
                'post_id': post_id
            }).update({
                'person_in_charge_id': person
            });

            if (data) {
                ctx.body = {
                    data: true
                }
            }
            else {
                ctx.body = {
                    data: false
                }
            }
        }
    }
    catch(e){
        ctx.body = 'update status failed'+e+token;
    }
}

async function addCategory(ctx) {
    let token = ctx.request.header.authorization;
    try {
        let result = jwt.verify(token, 'edf');

        const {post_id, category} = ctx.query

        var findPost = await mysql('post').where({
            'post_id': post_id
        }).select()

        if (findPost.length > 0) {
            const post = await mysql('post').where({
                'post_id': post_id
            }).update({
                'category': category
            });

            if (data) {
                ctx.body = {
                    data: true
                }
            }
            else {
                ctx.body = {
                    data: false
                }
            }
        }
    }
    catch(e){
        ctx.body = 'update status failed'+e+token;
    }
}

async function updatePriority(ctx) {
    let token = ctx.request.header.authorization;
    try {
        let result = jwt.verify(token, 'edf');

        const {post_id, priority} = ctx.query

        var findPost = await mysql('post').where({
            'post_id': post_id
        }).select()

        if (findPost.length > 0) {
            const post = await mysql('post').where({
                'post_id': post_id
            }).update({
                'priority': priority
            });

            if (data) {
                ctx.body = {
                    data: true
                }
            }
            else {
                ctx.body = {
                    data: false
                }
            }
        }
    }
    catch(e){
        ctx.body = 'update status failed'+e+token;
    }
}
module.exports = {
    queryPost,
    queryPostById,
    addPost,
    reviewPost,
    updatePerson,
    addCategory,
    updatePriority,
    queryPostByCategory,
    queryCategoryCount,
    queryCount,
    getAllPost
}


