module.exports = (sequelize, DataTypes) => {
    //创建article表模型
    const Comment = sequelize.define(
        "article",
        {
            // 在这里定义模型属性(相当于创建article表)
            commentId: {
                type: DataTypes.INTEGER, //模型字段类型
                primaryKey: true, //主键
                autoIncrement: true, //自增长
            },
            commentTitle: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            commentContent: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "comment",
            timestamps: true,
        }
    );

    return Comment;
};