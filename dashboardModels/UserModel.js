import { Sequelize } from "sequelize"
import dbDashboard from "../config/dashboard.js"

const {DataTypes} = Sequelize

const User = dbDashboard.define('user', {
  username : DataTypes.STRING,
  password : DataTypes.STRING,
  role : DataTypes.STRING,
  token : DataTypes.STRING,
  salt : DataTypes.STRING,
  has : DataTypes.STRING,
  expired : DataTypes.DATE,
  last_login : DataTypes.DATE,
  login_attempt : DataTypes.INTEGER
}, {
  tableName: 'tb_user'
})

export default User;

(async() => {
  await dbDashboard.sync()
})()