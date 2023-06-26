const { updateUser, deleteUser, detailUser, allUser } = require('../controllers/user.js');
const express = require('express');
const {verifyAdmin, verifyUser} = require('../middleware/verify.js');

const router = express.Router();

router.put('/updateUser/:id', verifyUser, updateUser)
router.delete('/deleteUser/:id', verifyUser, deleteUser)
router.get('/detailUser/:id', verifyUser, detailUser)
router.get('/allUser', verifyAdmin, allUser)


module.exports = router