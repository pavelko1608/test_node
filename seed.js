const models = require("./models")

const Cars = models.Cars

const car_models = [
	"Tesla Model S",
	"Tesla Model X",
	"Ford Focus",
	"Toyota Prado",
	"Chevrolet Tahoe"
]


	car_models.forEach((model) => {
	Cars.create({model: model})
})

