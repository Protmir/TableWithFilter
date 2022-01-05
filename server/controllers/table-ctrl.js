const Table = require('../models/table-model')

createTable = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a table',
        })
    }

    const table = new Table(body)

    if (!table) {
        return res.status(400).json({success: false, error: err})
    }

    table
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: table._id,
                message: 'Table created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Table not created!',
            })
        })
}

updateTable = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Table.findOne({_id: req.params.id}, (err, table) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Table not found!',
            })
        }
        table.name = body.name
        table.age = body.age
        table.position = body.position
        table.start_date = body.start_date
        table
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: table._id,
                    message: 'Table updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Table not updated!',
                })
            })
    })
}

deleteTable = async (req, res) => {
    await Table.findOneAndDelete({_id: req.params.id}, (err, table) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        if (!table) {
            return res
                .status(404)
                .json({success: false, error: `Table not found`})
        }

        return res.status(200).json({success: true, data: table})
    }).catch(err => console.log(err))
}

getTableById = async (req, res) => {
    await Table.findOne({_id: req.params.id}, (err, table) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        if (!table) {
            return res
                .status(404)
                .json({success: false, error: `Table not found`})
        }
        return res.status(200).json({success: true, data: table})
    }).catch(err => console.log(err))
}

getTables = async (req, res) => {
    await Table.find({}, (err, tables) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        if (!tables.length) {
            return res
                .status(404)
                .json({success: false, error: `Table not found`})
        }
        return res.status(200).json({success: true, data: tables})
    }).catch(err => console.log(err))
}

module.exports = {
    createTable,
    updateTable,
    deleteTable,
    getTables,
    getTableById,
}