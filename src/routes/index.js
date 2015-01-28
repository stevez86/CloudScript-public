var express = require('express');
var router = express.Router();
var Q = require('q');
//questionable if these below are required
var Postmates = require('postmates');
var mongoose = require('mongoose');
var request = require('request');

router.get('/', require('./homepage'));

//API - USERS

router.get('/api/users/:userid', require('./user_info'));

router.post('/api/users', require('./create_user'));

// OTHER

router.get('/api/messages', require('./get_messages')); //to get all messages initially

router.post('/api/messages', require('./post_message'));

router.get('/api/login', require('./validate_login'));

router.post('/api/orders', require('./post_orders'));

module.exports = router;
