const app = require("express")()
const bodyParser = require("body-parser")
const path = require("path")
const {Cars, Appointments} = require("./models")
const { check, validationResult } = require('express-validator/check')


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
.post("/createAppointment/:car_id/", [
	check("time", "You need to enter time").exists(),
	check("car_id", "it's got to be a valid id").isLength({ min: 36 , max: 36})
	], (req, res) => {
		const errors = validationResult(req);
  		if (!errors.isEmpty()) {
    		return res.status(422).json({ errors: errors.mapped() });
  		}
  		Cars.findOne({where: {id: req.params.car_id}})
  		.then((result) => {
  			if(result) {
  				Appointments.create({car_id: req.params.car_id, time: req.body.time})
  				.then(result => res.json(result.dataValues))
  			} else {
  				let err = new Error("Bad request")
				err.status = 400
				throw err
  			}
  		})
  		.catch((err) => res.json({
			status: err.status,
			message: err.message
		}))
})
.put("/updateAppointment/:id/", [
		check("time", "You need to enter time").exists(),
		check("id", "it's got to be a valid id").isLength({ min: 36 , max: 36})
	], (req, res) => {
		const errors = validationResult(req);
  		if (!errors.isEmpty()) {
    		return res.status(422).json({ errors: errors.mapped() });
  		}
	Appointments.update(
		{ time: req.body.time },
  		{ where: { id: req.params.id } })
	.then((result) => {
		if(result.dataValues) {
			res.json(result)
		} else {
			let err = new Error("Bad request")
			err.status = 400
			throw err
		}
	})
	.catch((err) => res.json({
		status: err.status,
		message: err.message
	}))
})
.delete("/deleteAppointment/:id", [
		check("id", "it's got to be a valid id").isLength({ min: 36 , max: 36})
	], (req, res) => {
		const errors = validationResult(req);
  		if (!errors.isEmpty()) {
    		return res.status(422).json({ errors: errors.mapped() });
  		}
	Appointments.destroy({where: {
		id: req.params.id
	}}).then((result) => {
		if(result) {
			res.json(result)
		} else {
			let err = new Error("Bad request")
			err.status = 400
			throw err
		}
	})
	.catch((err) => res.json({
		status: err.status,
		message: err.message
	}))
})

.listen(app.get("port"), () => {
	console.log("successfully listening on port " + app.get("port"))
})