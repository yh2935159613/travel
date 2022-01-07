module.exports = (sequelize, DataTypes) => {
    //创建article表模型
    const Article = sequelize.define(
        "article",
        {
            // 在这里定义模型属性(相当于创建article表)
            articleId: {
                type: DataTypes.INTEGER, //模型字段类型
                primaryKey: true, //主键
                autoIncrement: true, //自增长
            },
            articleTitle: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            articleImg: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            articleContent: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: "article",
            timestamps: true,
        }
    );

    return Article;
};