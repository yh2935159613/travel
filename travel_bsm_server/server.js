const Koa = require('koa');
const app = new Koa();
const parser = require("koa-parser");
const router = require("@koa/router")();
const user = require('./routes/user');
const scenic = require('./routes/scenic');
const article = require('./routes/article');
const comment = require('./routes/comment');
const order = require('./routes/order');
const cors = require('koa2-cors');
//上传
const koaBody = require('koa-body');
const static = require('koa-static');
const path = require('path');
// server.js中执行sequelize对象的sync方法，反向映射生成表
const { User, Scenic, Article, Order, Comment, sequelize } = require("./database/index");
const koajwt = require("koa-jwt")

//上传
app.use(koaBody({
    multipart: true,
    maxFileSize: 1000 * 1024 * 1024,  //设置上传文件最大限制，默认10M
    formidable: {
        // 上传目录
        uploadDir: path.join(__dirname, 'public/uploads'),
        // 保留文件扩展名
        keepExtensions: true,
    }
}))
// console.log('当前项目绝对路径'+__dirname);
app.use(static(path.join(__dirname, 'public')))
//上传单个文件
router.post('/uploadfile', async (ctx) => {
    const file = ctx.request.files.file
    //返回路径中的文件名 basename
    const basename = path.basename(file.path)
    ctx.body = {
        code: '200',
        msg: 'success',
        data: `${ctx.origin}/uploads/${basename}`
    }
})
//上传多个文件
router.post('/uploadfiles', async (ctx, next) => {
    const files = ctx.request.files.file;//获取上传文件

    if (files == null) {
        ctx.body = {
            code: '500',
            msg: 'fail',
            data: "没有上传图片"
        }
    } else {
        const urls = [];
        if (files.length > 0) {
            for (let file of files) {
                const basename = path.basename(file.path);
                const url = `${ctx.origin}/uploads/${basename}`;
                urls.push(url)
            }
            ctx.body = {
                code: '200',
                msg: 'success',
                data: urls
            }
        } else {
            const file = ctx.request.files.file
            //返回路径中的文件名 basename
            const basename = path.basename(file.path);
            const url = `${ctx.origin}/uploads/${basename}`;
            urls.push(url);
            ctx.body = {
                code: '200',
                msg: 'success',
                data: urls
            }
        }
    }
})

//配置跨域
app.use(
    cors({
        origin: function (ctx) {
            //设置允许来自指定域名请求
            // if (ctx.url === '/test') {
            //   return '*'; // 允许来自所有域名请求
            // }
            return "*";
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //设置所允许的HTTP请求方法'
        allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
        exposeHeaders: ["WWW-Authenticate", "Server-Authorization"], //设置获取其他自定义字段
    })
);

//使用jwt验证，放在前面，要不然不生效
app.use(
    koajwt({ secret: "travel_bsm" }).unless({
        //1.0 登录接口不需要验证   2.0 注册接口也不需要验证
        path: [/^\/user\/login/, /^\/user\/register/, /^\/uploadfile/],
    })
);

//发送post请求需要，放在路由前面
app.use(parser());

router.use('/user', user.routes())
router.use('/scenic', scenic.routes())
router.use('/comment', comment.routes())
router.use('/article', article.routes())
router.use('/order', order.routes())
app.use(router.routes());



//1.0 创建user表

// sequelize.sync({ force: true })
//     .then(() => {
//         console.log("数据库表连接成功");
//     })
//     .catch((err) => {
//         console.error("数据库表连接失败:", err);
//     });


/* 调用创建用户表   一旦创建好，force:false  */
User.sync({ force: false })
    .then(() => {
        console.log("用户表连接成功");
    })
    .catch((err) => {
        console.error("用户表连接失败:", err);
    });

/* 调用创建景点表   一旦创建好，force:false  */
Scenic.sync({ force: false }).then(() => {
    console.log("景点表连接成功");
})
    .catch((err) => {
        console.error("景点表连接失败:", err);
    });

/* 调用创建文章表   一旦创建好，force:false  */
Article.sync({ force: false }).then(() => {
    console.log("文章表连接成功");
})
    .catch((err) => {
        console.error("文章表连接失败:", err);
    });

/* 调用创建订单表   一旦创建好，force:false  */
Order.sync({ force: false }).then(() => {
    console.log("订单表连接成功");
})
    .catch((err) => {
        console.error("订单表连接失败:", err);
    });


/* 调用创建评论表   一旦创建好，force:false  */
Comment.sync({ force: false }).then(() => {
    console.log("评论表连接成功");
})
    .catch((err) => {
        console.error("评论表连接失败:", err);
    });



app.listen(8888, () => {
    console.log("server is running at 8888");
})