const app = require("express")()
const bodyParser = require("body-parser")
const path = require("path")
const {Cars, Appointments} = require("./models")

app
.set('port', process.env.PORT || 3000)
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended:false}))
.set("views", path.join(__dirname, "views"))
.set("view engine", "pug")
.get("/", (req, res) => {
	Cars.findAll().then((cars_data) => {
		Appointments.findAll().then((appointments_data) => {
			let val
			const data = []
			cars_data.forEach((car) => {
				val = {}
				val.car = car.dataValues
				val.appointments = []
				if(appointments_data.length > 0) {
					appointments_data.forEach((appointment) => {
						if(appointment.dataValues.car_id === car.dataValues.id) {
							val.appointments.push(appointment.dataValues)
						}
					})
				}
				data.push(val)
			})
		res.json(data)
		})
		
	})
})
// .get("/createCar", (req, res) => {
// 	db.cars.create({model: "Toyota"}).then((car) => console.log(car.model))
// 	db.cars.create({model: "Ford"}).then((car) => console.log(car.model))
// 	db.cars.create({model: "Mercedes"}).then((car) => console.log(car.model))
// })
.post("/createAppointment/:car_id/", (req, res) => {
	Appointments.create({car_id: req.params.car_id, time: req.body.time})
	.then((result) => res.json(result.dataValues))
})
.put("/updateAppointment/:id/", (req, res) => {
	Appointments.update(
		{ time: req.body.time },
  		{ where: { id: req.params.id } })
	.then(result => res.json(result))
})
.delete("/deleteAppointment/:id", (req, res) => {
	Appointments.destroy({where: {
		id: req.params.id
	}}).then(result => res.json(result))
})

.listen(app.get("port"), () => {
	console.log("successfully listening on port " + app.get("port"))
})