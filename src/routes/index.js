var express = require('express');
var router = express.Router();
var Postmates = require('postmates');
var mongoose = require('mongoose');
var request = require('request');
var Q = require('q');

var Conversation = require('../models/Conversation');
var Message = require('../models/Message');
var User = require('../models/User')
var Prescription = require('../models/Prescription');

router.get('/', require('./homepage'));

router.get('/video/test', require('./video_test'));

router.get('/api/messages', require('./get_messages'));

router.get('/api/login', require('./validate_login'));

router.post('/api/users', require('./create_user'));

router.post('/api/messages', require('./post_message'));

router.post('/orders', require('./post_orders'));

// router.param('doctor', require('./doctor_param'));

// router.param('patient', require('./patient_param'));

module.exports = router;
