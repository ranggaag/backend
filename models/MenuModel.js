import { Sequelize } from "sequelize"
import db from "../config/database.js"

const {DataTypes} = Sequelize

const Menu = db.define('tb_menu', {
    label : DataTypes.STRING,
    url : DataTypes.STRING
}, {
    tableName : 'tb_menu'
})

export default Menu;

// (async() => {
//     await db.sync()
// })()
