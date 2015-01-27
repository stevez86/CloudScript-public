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

//API - PATIENTS

router.get('/api/patients/:patientid', require('./patient/patientinfo'));

// router.get('/api/patients/:patientid/doctors', require('./patient/patientdoctors'));

// router.get('/api/patients/:patientid/rxs', require('./patient/patientrxs'));

// router.get('/api/patients/:patientid/doctors/:doctorid', require('./patient/patientdoctor'));

//API - DOCTORS

router.get('/api/doctors/:doctorid', require('./doctor/doctor'));

// router.get('/api/doctors/:doctorid/patients', require('./doctor/doctorpatients'));

// router.get('/api/doctors/:doctorid/patients/:patientid', require('./doctor/doctorpatient'));

// router.get('/api/doctors/:doctorid/rxs', require('./doctor/doctorrxs'));

// OTHER

router.get('/api/messages', require('./get_messages'));

router.get('/api/login', require('./validate_login'));

router.post('/api/users', require('./create_user'));

router.post('/api/messages', require('./post_message'));

router.post('/api/orders', require('./post_orders'));

module.exports = router;
