import { Sequelize } from "sequelize"
import db from "../config/database.js"

const {DataTypes} = Sequelize

const Product = db.define('product', {
    product_name: DataTypes.STRING,
    product_category: {
        type: DataTypes.ENUM,
        values: ['luxury', 'natural', 'basic']
    },
    product_image: DataTypes.STRING,
    url_image: DataTypes.STRING,
    url_product: DataTypes.STRING
}, {
    tableName: 'tb_product'
})

export default Product;

(async() => {
    await db.sync()
})()