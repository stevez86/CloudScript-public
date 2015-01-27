var express = require('express');
var router = express.Router();
var Postmates = require('postmates');
var mongoose = require('mongoose');
var request = require('request');
var Q = require('q');

var Conversation = require('../models/Conversation');
var Message = require('../models/Message');
var User = require('../models/User');
var Prescription = require('../models/Prescription');

router.get('/', require('./homepage'));

router.get('/video/test', require('./video_test'));

//API - PATIENTS

router.get('/api/patients/:patientid', require('./patientinfo'));

router.get('/api/patients/:patientid/doctors', require('./patientdoctors'));

router.get('/api/patients/:patientid/rxs', require('./patientrxs'));

router.get('/api/patients/:patientid/doctors/:doctorid', require('./patientdoctor'));

//API - DOCTORS

router.get('/api/doctors/:doctorid', require('./doctor'));

router.get('/api/doctors/:doctorid/patients', require('./doctorpatients'));

router.get('/api/doctors/:doctorid/patients/:patientid', require('./doctorpatient'));

router.get('/api/doctors/:doctorid/rxs', require('./doctorrxs'));

// OTHER

router.get('/api/messages', require('./get_messages'));

router.post('/api/messages', require('./post_message'));

router.post('/orders', require('./post_orders'));

module.exports = router;
