const { createHotel, updateHotel, deleteHotel, getSingleHotel, getAllHotel, typeByCount, typeByCity, } = require('../controllers/hotel.js');
const express = require('express');
const {verifyAdmin} = require('../middleware/verify.js');

const router = express.Router();

router.post('/createHotel', verifyAdmin, createHotel)
router.put('/updateHotel/:id', verifyAdmin, updateHotel)
router.delete('/deleteHotel/:id', verifyAdmin, deleteHotel)
router.get('/getSingleHotel/:id', getSingleHotel)
router.get('/getAllHotel', getAllHotel)
router.get('/typeByCount', typeByCount)
router.get('/typeByCity', typeByCity)

module.exports = router