const Sequelize = require('sequelize')
const sequelize = new Sequelize('mainDB', null, null, {
  dialect: 'sqlite',
  storage: './database.sqlite'
})
const db = {}
db.Sequelize = Sequelize;  
db.sequelize = sequelize;
db.cars = require("./models/Car.js")(sequelize, Sequelize)
db.appointments = require("./models/Appointment.js")(sequelize, Sequelize)

db.appointments.belongsTo(db.cars)
db.cars.hasMany(db.appointments)
db.cars.sync()
db.appointments.sync()
db.sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.')
  }, function (err) {
    console.log('Unable to connect to the database:', err)
  })

module.exports = db






