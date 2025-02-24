import { Sequelize } from "sequelize"

const dbDashboard = new Sequelize('iafeclgw_dashboard', 'iafeclgw_ragata', 'Fadris321!@##@!', {
    host: 'api.ragata.id',
    dialect: "mysql"
})

export default dbDashboard