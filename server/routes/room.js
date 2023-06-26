const {createRoom, updateRoom, deleteRoom, getDetailRoom, getAllRoom} = require('../controllers/room.js');
const express = require('express');
const {verifyAdmin} = require('../middleware/verify.js');

const router = express.Router();

router.post('/createRoom/:id/:hotelid', verifyAdmin, createRoom)
router.put('/updateRoom/:id', verifyAdmin, updateRoom)
router.delete('/deleteRoom/:id/:hotelid', verifyAdmin, deleteRoom)
router.get('/getDetailRoom/:id', getDetailRoom)
router.get('/getAllRoom', getAllRoom)

module.exports = router