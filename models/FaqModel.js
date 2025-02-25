import { Sequelize } from "sequelize"
import db from "../config/database.js"

const {DataTypes} = Sequelize

const FaqRecord = db.define('tb_faq', {
    question : DataTypes.STRING,
    answare : DataTypes.STRING
}, {
    tableName: 'tb_faq'
})

export default FaqRecord;

// (async() => {
//     await db.sync()
// })()