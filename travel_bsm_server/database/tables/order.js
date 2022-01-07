module.exports = (sequelize, DataTypes) => {
    //创建article表模型
    const Order = sequelize.define(
        "Order",
        {
            // 在这里定义模型属性(相当于创建article表)
            orderId: {
                type: DataTypes.INTEGER, //模型字段类型
                primaryKey: true, //主键
                autoIncrement: true, //自增长
            },
            orderPrice: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            orderQuantity: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: "order",
            timestamps: true,
        }
    );

    return Order;
};