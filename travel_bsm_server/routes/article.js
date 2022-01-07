const router = require("@koa/router")();
const jwt = require('jsonwebtoken');
//导入文章表
const { Article, User } = require('../database/index');

// 1.0 发表文章
router.post('/publishArticle', async ctx => {
    // 第一种方法获取userId,需要传参
    // const { userId } = ctx.request.query;

    // 第二种方法获取userId，不需要传参，需要从token中获取，解析token
    // ctx.request.headers["authorization"] 这样才是一个数组
    const token = ctx.request.headers["authorization"].split(' ')[1];
    //获取token，使用jwt.verify(token,"密钥解析token"),获取token里的数据
    const { userId } = jwt.verify(token, 'travel_bsm')
    // console.log(userId);
    //使用主键查找
    const user = await User.findByPk(userId)
    // console.log(user);
    if (user) {
        const { articleTitle, articleContent, articleImg } = ctx.request.body;
        const article = await Article.create({
            articleTitle, articleContent, articleImg,
        })
        //关联user表
        article.setUser(user)
        if (article) {
            ctx.body = {
                code: '200',
                msg: 'success',
                data: article
            }
        } else {
            ctx.body = {
                code: '500',
                msg: 'fail',
                data: '发表失败'
            }
        }
    }
})

// 2.0 查看所有文章
router.get('/getAllArticle', async ctx => {
    const article = await Article.findAll()
    if (article) {
        ctx.body = {
            code: '200',
            msg: 'success',
            data: article
        }
    } else {
        ctx.body = {
            code: '500',
            msg: 'fail',
            data: '查询失败'
        }
    }
})

// 通过userId获取文章
router.get('/getArticleById', async ctx => {
    const { userId } = ctx.request.query;
    //记住，千万别忘了await
    const article = await Article.findAll({
        where: {
            userId
        }
    })
    if (article) {
        ctx.body = {
            code: '200',
            msg: 'success',
            data: article
        }
    } else {
        ctx.body = {
            code: '500',
            msg: 'fail',
            data: '查询失败'
        }
    }
})

// 修改文章内容
router.post("/updateArticle", async ctx => {
    const { articleId } = ctx.request.query;
    const { articleTitle, articleImg, articleContent } = ctx.request.body;
    await Article.update({
        articleTitle, articleImg, articleContent
    }, {
        where: {
            articleId
        }
    })
    const article = await Article.findOne({
        where: {
            articleId
        }
    })
    if (article == null) {
        ctx.body = {
            code: '500',
            msg: 'fail',
            data: '修改失败'
        }
    } else {
        ctx.body = {
            code: '200',
            msg: 'success',
            data: article
        }

    }
})


//删除文章
router.get("/destroyArticle", async ctx => {
    const { articleId } = ctx.request.query;
    await Article.destroy({
        where: {
            articleId
        }
    })
    const article = await Article.findOne({
        where: {
            articleId
        }
    })
    if (article == null) {
        ctx.body = {
            code: '200',
            msg: 'success',
            data: "删除成功"
        }
    } else {
        ctx.body = {
            code: '500',
            msg: 'fail',
            data: '修改失败'
        }
    }
})

module.exports = router