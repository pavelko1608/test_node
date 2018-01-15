const Sequelize = require('sequelize')
const sequelize = new Sequelize('mainDB', null, null, {
  dialect: 'sqlite',
  storage: './database.sqlite'
})
const Cars = sequelize.define("cars", {
   id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    model: {
      type: Sequelize.STRING,
      required: true
    }
})

const Appointments = sequelize.define("appointments", {
    car_id: {
          type: Sequelize.UUID,
          allowNull: false
      },
     id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      time: {
          type: Sequelize.DATE,
          required: true
      }
})

Cars.sync()
Appointments.sync()
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.')
  }, function (err) {
    console.log('Unable to connect to the database:', err)
  })

module.exports.Cars = Cars
module.exports.Appointments = Appointments







