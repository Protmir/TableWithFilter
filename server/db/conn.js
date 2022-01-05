const mongoose = require('mongoose')

try {
    mongoose.connect('mongodb+srv://kirill:kirill1234@cluster0.yh5bw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
} catch (e) {
    console.log(e)
}

const db = mongoose.connection

module.exports = db