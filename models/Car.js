module.exports = (sequelize, DataTypes) => {
	const Cars = sequelize.define("cars", {
		 id: {
		    type: DataTypes.UUID,
		    primaryKey: true,
		    defaultValue: DataTypes.UUIDV4,
		   	allowNull: false
  		},
  		model: {
      		type: DataTypes.STRING,
      		required: true
  		}
	})
	return Cars
}