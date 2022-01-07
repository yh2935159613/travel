const router = require("@koa/router")();
const { Scenic } = require('../database/index');

// 1.0 新增景点信息
router.post("/addScenic", async ctx => {
    let { scenicTitle, scenicPrice, address, imgSrc, introduce, status } = ctx.request.body;
    const scenic = await Scenic.create({
        scenicTitle, address, imgSrc, scenicPrice, introduce, status
    })
    if (scenic) {
        ctx.body = {
            code: '200',
            msg: 'success',
            data: scenic
        }
    } else {
        ctx.body = {
            code: '500',
            msg: 'fail',
            data: '新增失败'
        }
    }
})

// 2.0 通查看所有景点信息
router.get("/getScenic", async ctx => {
    const scenic = await Scenic.findAll()
    if (scenic) {
        ctx.body = {
            code: '200',
            msg: 'success',
            data: scenic
        }
    } else {
        ctx.body = {
            code: '500',
            msg: 'fail',
            data: '没有信息，请添加数据'
        }
    }

})


// 2.1 通过status查看景点信息
router.get("/getScenicByStatus", async ctx => {
    let { status } = ctx.request.query;
    const scenic = await Scenic.findAll({
        where: {
            status
        }
    })
    if (scenic) {
        ctx.body = {
            code: '200',
            msg: 'success',
            data: scenic
        }
    } else {
        ctx.body = {
            code: '500',
            msg: 'fail',
            data: '查询失败'
        }
    }
})

//3.0 修改景点信息
router.post('/updateScenic', async ctx => {
    const { scenicId } = ctx.request.query;
    const { scenicTitle, address, imgSrc, scenicPrice, introduce, status } = ctx.request.body;
    await Scenic.update({
        scenicTitle, address, imgSrc, introduce, scenicPrice, status
    }, {
        where: {
            scenicId
        }
    })

    const scenic = await Scenic.findOne({
        where: {
            scenicId
        }
    })
    if (scenic) {
        ctx.body = {
            code: '200',
            msg: 'success',
            data: scenic
        }
    } else {
        ctx.body = {
            code: '500',
            msg: 'faile',
            data: '修改失败'
        }
    }
})

// 4.0 删除景点
router.get("/destroyScenic", async ctx => {
    const { scenicId } = ctx.request.query;
    await Scenic.destroy({
        where: {
            scenicId
        }
    })
    const scenic = await Scenic.findOne({
        where: {
            scenicId
        }
    })
    if (scenic) {
        ctx.body = {
            code: '500',
            msg: 'fail',
            data: '删除失败'
        }
    } else {
        ctx.body = {
            code: '200',
            msg: 'success',
            data: '删除成功'
        }
    }
})





module.exports = router