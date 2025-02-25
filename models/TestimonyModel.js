import { Sequelize } from "sequelize"
import db from "../config/database.js"

const {DataTypes} = Sequelize

const Testimony = db.define('testimony', {
    rating : DataTypes.INTEGER,
    name : DataTypes.STRING,
    description : DataTypes.TEXT,
    profile: DataTypes.STRING,
    url_profile: DataTypes.STRING
}, {
    tableName: 'tb_testimony'
})

export default Testimony;

// (async() => {
//     await db.sync()
// })()