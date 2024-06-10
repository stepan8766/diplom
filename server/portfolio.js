const mongoose = require('mongoose')

const PortfolioSchema = new mongoose.Schema( {
    title: {type: String, required: true},
    content: {type: String, required: true},
    picture: {type: String},
    port_picture1: {type: String},
    port_picture2: {type: String},
    port_picture3: {type: String}

})

const Portfolio = mongoose.model('Portfolio', PortfolioSchema)
module.exports = Portfolio