import mongoose from 'mongoose'

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United']
  },
  airport: {
    type: String,
    enum: ['DFW', 'DEN', 'LAX', 'SAN']
  },
  flightNo: {
    type: Number,
  },
  departs: {
    type: Number,
    default: function() {
      return new Date().getFullYear()
    }
  }
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}