var express = require('express');
var router = express.Router();
var Q = require('q');
//questionable if these below are required
var Postmates = require('postmates');
var mongoose = require('mongoose');
var request = require('request');

router.get('/', require('./homepage'));

router.get('/api/users/:userid', require('./user_info'));

router.post('/api/users', require('./create_user'));

router.get('/api/messages', require('./get_messages'));

router.post('/api/messages', require('./post_message'));

router.get('/api/login', require('./validate_login'));

router.post('/api/delivery/quote', require('./post_orders'));

router.post('/api/users/:userid/prescriptions', require('./new_prescription'));

module.exports = router;
