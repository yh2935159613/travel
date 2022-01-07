const router = require("@koa/router")();
const jwt = require('jsonwebtoken');
const { Comment, User } = require('../database/index');
// 1.0 发表评论
router.post('/publishComment', async ctx => {
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
        const { commentTitle, commentContent } = ctx.request.body;
        const comment = await Comment.create({
            commentTitle, commentContent
        })
        //关联user表
        comment.setUser(user)
        if (comment) {
            ctx.body = {
                code: '200',
                msg: 'success',
                data: comment
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


// 2.0 查看所有评论
router.get('/getAllComment', async ctx => {
    const comment = await Comment.findAll()
    if (comment) {
        ctx.body = {
            code: '200',
            msg: 'success',
            data: comment
        }
    } else {
        ctx.body = {
            code: '500',
            msg: 'fail',
            data: '查询失败'
        }
    }
})


// 通过userId查看评论
router.get('/getCommentById', async ctx => {
    const { userId } = ctx.request.query;
    //记住，千万别忘了await
    const comment = await Comment.findAll({
        where: {
            userId
        }
    })
    if (comment) {
        ctx.body = {
            code: '200',
            msg: 'success',
            data: comment
        }
    } else {
        ctx.body = {
            code: '500',
            msg: 'fail',
            data: '查询失败'
        }
    }
})

// 修改评论内容
router.post("/updateComment", async ctx => {
    const { commentId } = ctx.request.query;
    const { commentTitle, commentContent } = ctx.request.body;
    await Comment.update({
        commentTitle, commentContent
    }, {
        where: {
            commentId
        }
    })
    const comment = await Comment.findOne({
        where: {
            commentId
        }
    })
    if (comment == null) {
        ctx.body = {
            code: '500',
            msg: 'fail',
            data: '修改失败'
        }
    } else {
        ctx.body = {
            code: '200',
            msg: 'success',
            data: comment
        }

    }
})


//删除评论
router.get("/destroyComment", async ctx => {
    const { commentId } = ctx.request.query;
    await Comment.destroy({
        where: {
            commentId
        }
    })
    const comment = await Comment.findOne({
        where: {
            commentId
        }
    })
    if (comment == null) {
        ctx.body = {
            code: '200',
            msg: 'success',
            data: "删除成功"
        }
    } else {
        ctx.body = {
            code: '500',
            msg: 'fail',
            data: '删除失败'
        }
    }
})



module.exports = router