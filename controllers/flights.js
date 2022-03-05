import { Flight } from '../models/flight.js'
import { Meal } from '../models/meal.js'

function newFlight(req, res) {
  res.render('flights/new', {
    title: "Add Flight",
  })
}

function create(req, res) {
  for(let key in req.body) {
    if(req.body[key] === '') delete req.body[key]
  }
  const flight = new Flight(req.body)
  flight.save(function(err){
    if (err) {
     return res.render('flights/new', {err:null, title:'Add Flight'})
    }
    res.redirect('/flights')
  })
}

function index(req, res) {
  Flight.find({}, function(error, flights){
    res.render('flights/index', {
      flights: flights,
      error: error,
      title: 'All Flights',
    })
  }) .sort({departs: 'ascending'})
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('meal')
  .exec(function(error, flight) {
    Meal.find({_id: {$nin: flight.meal}}, function(error, meals) {
    res.render('flights/show', { 
      title: 'Flight Detail', 
      flight : flight,
      meals: meals,
    })
    })
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id, function(error, flight){
    res.redirect('/flights')
  })
}

function edit(req, res) {
  Flight.findById(req.params.id, function(error, flight){
    res.render('flights/edit',  {
      flight,
      error,
      title: "Edit Flight",
    })
  })
}

function update(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Flight.findByIdAndUpdate(req.params.id, req.body, function(error, flight) {
    res.redirect(`/flights/${flight._id}`)
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id, function(error, flight) {
    flight.tickets.push(req.body)
    flight.save(function(error) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function addToMeal(req, res) {
  Flight.findById(req.params.id, function(error, flight) {
    flight.meal.push(req.body.mealId)
    flight.save(function(error) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket,
  addToMeal,
}
