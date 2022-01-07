module.exports = (sequelize, DataTypes) => {
    //创建景点scenic模型
    const Scenic = sequelize.define(
        "scenic",
        {
            // 在这里定义模型属性(相当于创建用户表)
            scenicId: {
                type: DataTypes.INTEGER, //模型字段类型
                primaryKey: true, //主键
                autoIncrement: true, //自增长
            },
            scenicTitle: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            scenicPrice: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            imgSrc: {
                type: DataTypes.STRING(9999),
                allowNull: false,
            },
            introduce: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "scenic",
            timestamps: true,
        }
    );

    return Scenic;
};