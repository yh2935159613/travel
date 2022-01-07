const router = require("@koa/router")();
//新增订单
const { Order, Scenic } = require('../database/index');
router.post('/addOrder', async ctx => {
    const { orderPrice, orderQuantity, scenicId } = ctx.request.body;
    const scenic = await Scenic.findByPk(scenicId);
    if (scenic) {
        const order = await Order.create({
            orderPrice, orderQuantity, scenicId
        })
        order.setScenic(scenic)
        if (order) {
            ctx.body = {
                code: '200',
                msg: 'success',
                data: order
            }
        } else {
            ctx.body = {
                code: '500',
                msg: 'fail',
                data: '增加失败'
            }
        }

    }

})

// 2.0 查看所有订单
router.get('/getAllOrder', async ctx => {
    const order = await Order.findAll()
    if (order) {
        ctx.body = {
            code: '200',
            msg: 'success',
            data: order
        }
    } else {
        ctx.body = {
            code: '500',
            msg: 'fail',
            data: '查询失败'
        }
    }
})

// 通过scenicId获取订单
router.get('/getOrderByScenicId', async ctx => {
    const { scenicId } = ctx.request.query;
    //记住，千万别忘了await
    const order = await Order.findAll({
        where: {
            scenicId
        }
    })
    if (order) {
        ctx.body = {
            code: '200',
            msg: 'success',
            data: order
        }
    } else {
        ctx.body = {
            code: '500',
            msg: 'fail',
            data: '查询失败'
        }
    }
})

// 修改订单内容
router.post("/updateOrder", async ctx => {
    const { orderId } = ctx.request.query;
    const { orderPrice, orderQuantity, scenicId } = ctx.request.body;

    await Order.update({
        orderPrice, orderQuantity, scenicId
    }, {
        where: {
            orderId
        }
    })
    ctx.body = {
        code: '200',
        msg: 'success',
        data: '修改成功'
    }

})



//删除订单
router.get('/destroyOrder', async ctx => {
    const { orderId } = ctx.request.query;
    await Order.destroy({
        where: {
            orderId
        }
    })
    ctx.body = {
        code: '200',
        msg: 'success',
        data: '删除成功'
    }


})























module.exports = router