const router = require("@koa/router")();
//导入用户表
const { User } = require('../database/index');
const jwt = require("jsonwebtoken");
//1.0 用户注册
router.post("/register", async ctx => {
    let { username, password, name, age, sex, photo, motto } = ctx.request.body;
    const user = await User.create({
        username, password, age, name, sex, photo, motto
    })
    if (user) {
        ctx.body = {
            code: '200',
            msg: 'success',
            data: user
        }
    } else {
        ctx.body = {
            code: '500',
            msg: 'fail',
            data: '注册失败'
        }
    }

})

// 2.0 用户登录
router.post('/login', async ctx => {
    //输入框获取用户名密码
    let { username, password } = ctx.request.body;
    //根据获取的用户名，密码查询User表中的数据，如果有？
    const user = await User.findOne({
        where: {
            username,
            password
        }
    });
    //获取信息
    if (user) {
        const { userId, name, age, sex, photo, motto, status } = user;
        const accessToken = jwt.sign(
            {
                userId,
                username,
                name,
                age,
                sex,
                photo,
                motto,
                status
            },
            "travel_bsm",
            {
                expiresIn: 3600 * 24 * 7,
            }
        );
        ctx.body = {
            code: '200',
            msg: 'success',
            data: {
                accessToken,
                user
            }
        }

    } else {
        ctx.body = {
            code: '500',
            msg: 'fail',
            data: '登录失败'
        }
    }
})

// 3.0 获取所有用户信息
router.get("/getAlluser", async ctx => {
    const user = await User.findAll();
    if (user) {
        ctx.body = {
            code: '200',
            msg: 'success',
            data: user
        }
    } else {
        ctx.body = {
            code: '500',
            msg: 'fail',
            data: "查询所有信息错误"
        }
    }

})


// 3.1 根据用户id获取用户信息
router.get("/getUserByuserId", async ctx => {
    const { userId } = ctx.request.query;
    const user = await User.findOne({
        where: {
            userId
        }
    });
    if (user) {
        ctx.body = {
            code: '200',
            msg: 'success',
            data: user.name
        }
    } else {
        ctx.body = {
            code: '500',
            msg: 'fail',
            data: "查询失败"
        }
    }

})


// 4.0 删除用户信息
router.get('/deleteUser', async ctx => {
    const { userId } = ctx.request.query;
    await User.destroy({
        where: {
            userId
        }
    })
    ctx.body = {
        code: '200',
        msg: 'success',
        data: '删除成功'
    }
})

// 5.0 修改用户信息
router.post('/updateUser', async ctx => {
    const { userId } = ctx.request.query;
    const { username, password, name, age, sex, photo, motto, status } = ctx.request.body;
    await User.update({
        username, password, name, age, sex, photo, motto,
    }, {
        where: {
            userId
        }
    })
    //根据userId查询用户信息，显示修改后的数据
    const user = await User.findOne({
        where: {
            userId
        }
    })
    if (user) {
        ctx.body = {
            code: '200',
            msg: 'success',
            data: user
        }
    } else {
        ctx.body = {
            code: '500',
            msg: 'fail',
            data: '修改失败'
        }
    }
})


// 6.0 修改用户密码
router.post('/updatePassword', async ctx => {
    const { userId } = ctx.request.query;
    const { password } = ctx.request.body;
    await User.update({
        password
    }, {
        where: {
            userId
        }
    })
    //根据userId查询用户信息，显示修改后的数据
    const user = await User.findOne({
        where: {
            userId
        }
    })
    if (user) {
        ctx.body = {
            code: '200',
            msg: 'success',
            data: user
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