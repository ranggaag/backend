import { Sequelize } from "sequelize"
import db from "../config/database.js"

const {DataTypes} = Sequelize

const Comment = db.define('comment', {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  attendance: {
    type: DataTypes.ENUM,
    values: ['hadir', 'tidak hadir']
  }
}, {
  tableName: 'tb_comments'
})

export default Comment;

// (async() => {
//     await db.sync()
// })()
