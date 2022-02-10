const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USET,
  process.env.MYSQL_PASSWORD,
  {
    dialect: "mysql",
    host: "us-cdbr-east-05.cleardb.net",
  }
);

module.exports = sequelize;
