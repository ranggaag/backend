import { Sequelize } from "sequelize"

const db = new Sequelize('iafeclgw_website', 'iafeclgw_ragata', 'Fadris321!@##@!', {
    host: 'ragata.my.id',
    dialect: "mysql"
})

export default db