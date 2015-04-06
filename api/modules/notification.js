var EventProxy = require('eventproxy');
var co = require('co');
var ERR = require('../errorcode');
var Logger = require('../logger');
var config = require('../config');
var db = require('../modules/db');



exports.notify = function(connection, who, doWhat, toWho, withData, message){

    return connection.yieldQuery('INSERT INTO notification SET ?', {
        who: who,
        doWhat: doWhat,
        toWho: toWho,
        withData: withData ? JSON.stringify(withData) : '',
        message: message || ''
    });

};

exports.read = function(connection, notifyId){

    return connection.yieldQuery('UPDATE notification SET ? WHERE id = ?', [{
        hasRead: 1,
        readTime: new Date()
    }, notifyId]);
};