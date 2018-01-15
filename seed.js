const db  = require("./db")

const car_models = [
	"Tesla Model S",
	"Tesla Model X",
	"Ford Focus",
	"Toyota Prado",
	"Chevrolet Tahoe"
]


	car_models.forEach((model) => {
	db.cars.create({model: model})
})

