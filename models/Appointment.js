module.exports = (sequelize, DataTypes) => {
	const Appointments = sequelize.define("appointments", {
		car_id: {
      		type: DataTypes.UUID,
      		allowNull: false
    	},
		 id: {
		    type: DataTypes.UUID,
		    primaryKey: true,
		    defaultValue: DataTypes.UUIDV4,
		   	allowNull: false
  		},
  		time: {
      		type: DataTypes.DATE,
      		required: true
  		}
	})
	return Appointments
}