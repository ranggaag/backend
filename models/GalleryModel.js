import { Sequelize } from "sequelize"
import db from "../config/database.js"

const {DataTypes} = Sequelize

const Gallery = db.define('gallyer', {
    image_name : DataTypes.STRING,
    url_image : DataTypes.STRING
}, {
    tableName : 'tb_gallery'
})

export default Gallery;

// (async() => {
//     await db.sync()
// })()