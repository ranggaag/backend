import { Sequelize } from "sequelize"
import dbDashboard from "../config/dashboard.js"

const {DataTypes} = Sequelize

const User = dbDashboard.define('user', {
  uuid : {
    type : DataTypes.STRING,
    defaultValue : DataTypes.UUIDV4,
    allowNull : false,
    validate : {
      notEmpty : true
    }
  },
  name : {
    type : DataTypes.STRING,
    allowNull : false,
    validate : {
      notEmpty : true,
      len : [3, 100]
    }
  },
  email : {
    type : DataTypes.STRING,
    allowNull : false,
    validate : {
      notEmpty : true,
      isEmail : true
    }
  },
  phone_number : {
    type : DataTypes.STRING,
    allowNull : false,
    validate : {
      notEmpty : true,
    }
  },
  password : {
    type : DataTypes.STRING,
    allowNull : false,
    validate : {
      notEmpty : true,
    }
  },
  role : {
    type : DataTypes.STRING,
    allowNull : false,
    validate : {
      notEmpty : true,
    }
  },
  token : {
    type : DataTypes.STRING,
    allowNull : false,
    validate : {
      notEmpty : true,
    }
  },
  salt : {
    type : DataTypes.STRING,
    allowNull : false,
    validate : {
      notEmpty : true,
    }
  },
  hash : {
    type : DataTypes.STRING,
    allowNull : false,
    validate : {
      notEmpty : true,
    }
  },
  expired : {
    type : DataTypes.DATE,
    allowNull : false,
    validate : {
      notEmpty : true,
      isDate : true
    }
  },
  last_login : {
    type : DataTypes.DATE,
    allowNull : false,
    validate : {
      notEmpty : true,
      isDate : true
    }
  },
  login_attempt : {
    type : DataTypes.INTEGER,
    allowNull : false,
    validate : {
      notEmpty : true,

    }
  }
}, {
  tableName: 'tb_user',
  freezeTableName : true
})

export default User;

// (async() => {
//   await dbDashboard.sync()
// })()