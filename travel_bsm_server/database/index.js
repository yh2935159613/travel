const { Sequelize, DataTypes } = require('sequelize');
const config = {
    host: "localhost", //主机名
    database: "travel_bsm", //使用的哪个数据库名
    username: "root", //账号
    password: "root", //密码
    port: 3306, //端口号，mysql默认3306
};
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: "mysql",
        pool: {
            max: 5, //连接池最大连接数量
            min: 0, //最小连接数量
            idle: 10000, //如果一个线程 10秒内么有被使用过的话，就释放
        },
        logging: true,
    }
);
//实例化表模型
const User = require("./tables/user")(sequelize, DataTypes);
const Scenic = require('./tables/scenic')(sequelize, DataTypes);
const Article = require('./tables/article')(sequelize, DataTypes);
const Comment = require('./tables/comment')(sequelize, DataTypes);
const Order = require('./tables/order')(sequelize, DataTypes);


//模型关系
//1.用户在文章表中添加auserid//用户在文章表中添加auserId 指向文章表的userId，因为userId为主键
User.hasMany(Article, {
    foreignKey: 'userId',
});
Article.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'userId'
})

//用户在评论表中添加auserId 指向评论表的userId，因为userId为主键
User.hasMany(Comment, {
    foreignKey: 'userId',
});

Comment.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'userId'
})

Scenic.hasMany(Order, {
    foreignKey: 'scenicId',
})
Order.belongsTo(Scenic, {
    foreignKey: 'scenicId',
    targetKey: 'scenicId'
})

//导出sequlize实例和user模型对象，方便其他地方使用
module.exports = { sequelize, User, Scenic, Article, Order, Comment };