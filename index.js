const app = require("express")()
const bodyParser = require("body-parser")
const path = require("path")
const db = require("./db")

app
.set('port', process.env.PORT || 3000)
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended:false}))
.set("views", path.join(__dirname, "views"))
.set("view engine", "pug")
.get("/", (req, res) => {
	db.cars.findAll().then((cars_data) => {
		db.appointments.findAll().then((appointments_data) => {
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
		res.render("index", {data: data})
		})
		
	})
})
.get("/createCar", (req, res) => {
	db.cars.create({model: "Toyota"}).then((car) => console.log(car.model))
	db.cars.create({model: "Ford"}).then((car) => console.log(car.model))
	db.cars.create({model: "Mercedes"}).then((car) => console.log(car.model))
})
.post("/createAppointment/:car_id/", (req, res) => {
	db.appointments.create({car_id: req.params.car_id, time: req.body.time})
	.then((result) => res.redirect("/"))
})
.post("/updateAppointment/:id/", (req, res) => {
	db.appointments.update(
		{ time: req.body.time },
  		{ where: { id: req.params.id } })
	.then(() => {
		res.redirect("/")
	})
})
.post("/deleteAppointment/:id", (req, res) => {
	db.appointments.destroy({where: {
		id: req.params.id
	}}).then(() => res.redirect("/"))
})

.listen(app.get("port"), () => {
	console.log("successfully listening on port " + app.get("port"))
})