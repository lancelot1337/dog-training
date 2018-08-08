const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const User = require('../../models/user');

router.get('/', (req, res, next) => {
    console.log('/users GET logged');
    res.status(200).json({
        status: "success"
    });
});

router.post('/', (req, res, next) => {
    console.log('/users post logged');
});

module.exports = router;