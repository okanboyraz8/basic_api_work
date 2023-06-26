const User = require("../models/User.js");

const updateUser = async(req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(user)        
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const deleteUser = async(req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "The delete was successful..."})        
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const detailUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)        
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const allUser = async(req, res, next) => {
    try {
        const user = await User.find()
        res.status(200).json(user)        
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

module.exports = { updateUser, deleteUser, detailUser, allUser }