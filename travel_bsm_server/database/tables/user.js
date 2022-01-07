module.exports = (sequelize, DataTypes) => {
    //创建user表
    const User = sequelize.define(
        "user",
        {
            // 在这里定义模型属性(相当于创建用户表)
            userId: {
                type: DataTypes.INTEGER, //模型字段类型
                primaryKey: true, //主键
                autoIncrement: true, //自增长
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            age: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            sex: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            photo: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            motto: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: "users",
            timestamps: true,
        }
    );

    return User;
};