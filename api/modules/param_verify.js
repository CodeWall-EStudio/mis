var EventProxy = require('eventproxy');
var us = require('underscore');

var config = require('../config');
var ERR = require('../errorcode');
var Util = require('../util');
var Logger = require('../logger');
var ParamConfig = require('./param_config');

var OBJECT_ID_LENGTH = 24;

var ARRAY_REGEXP = /\[\w+\]/;

// 封装一下查询数据库的方法
// function findOne(coll, value, pcfg, callback) {
//     if (value.length !== OBJECT_ID_LENGTH) {
//         return callback(pcfg.name + '\'s length must be ' + OBJECT_ID_LENGTH);
//     }
//     db[coll].findOne({
//         _id: value
//     }, function(err, doc) {
//         if (err) {
//             return callback(err);
//         }
//         if (!doc) {
//             return callback('can\'t find ' + pcfg.name + ': ' + value, ERR.NOT_FOUND);
//         }
//         // if(doc.toJSON){
//         //     doc = doc.toJSON();
//         // }
//         callback(null, doc);
//     });
// }

// function findArray(coll, value, pcfg, callback) {
//     if (!value.forEach) {
//         return callback(pcfg.name + ' must be an array, value: ' + value);
//     }
//     if (!value.length) {
//         return callback(null, value);
//     }

//     value = us.compact(value);

//     var ep = new EventProxy();
//     ep.fail(callback);

//     ep.after('getValueDone', value.length, function(list) {
//         callback(null, list);
//     });

//     value.forEach(function(value) {
//         findOne(coll, value, pcfg, ep.group('getValueDone'));
//     });

// }

var checkers = {
    'any': function(value, pcfg, callback) {
        callback(null, value);
    },

    'number': function(value, pcfg, callback) {
        value = Number(value);
        if (isNaN(value)) {
            return callback(pcfg.name + ' must be a number, value: ' + value);
        }
        if (('min' in pcfg) && value < pcfg.min) {
            return callback(pcfg.name + ' must be less than ' + pcfg.min);
        }
        if (('max' in pcfg) && value > pcfg.max) {
            return callback(pcfg.name + ' must be greater than ' + pcfg.max);
        }
        callback(null, value);
    },

    'string': function(value, pcfg, callback) {
        if (pcfg.length && value.length !== pcfg.length) {
            return callback(pcfg.name + '\'s length must be ' + pcfg.length);
        }
        if (('min' in pcfg) && value < pcfg.min) {
            return callback(pcfg.name + ' must be less than ' + pcfg.min);
        }
        if (('max' in pcfg) && value > pcfg.max) {
            return callback(pcfg.name + ' must be greater than ' + pcfg.max);
        }
        callback(null, value);
    },

    'boolean': function(value, pcfg, callback) {
        var val = Number(value);
        if (!isNaN(val)) {
            value = val === 1;
        } else {
            value = value === 'true';
        }
        callback(null, value);
    },

    'object': function(value, pcfg, callback) {
        try {
            value = Util.jsonParse(value);
            callback(null, value);
        } catch (e) {
            callback(pcfg.name + ' must be an object, value: ' + value);
        }
    },

    '[number]': function(value, pcfg, callback) {
        var notAnArrayMsg = pcfg.name + ' must be a number array, value: ' + value;
        try {
            value = Util.jsonParse(value);
        } catch (e) {
            throw new Error('value parse error: ' + value);
        }
        if (!value.forEach) {
            return callback(notAnArrayMsg);
        }
        value.forEach(function(v, i) {
            v = Number(v);
            if (isNaN(v)) {
                return callback(pcfg.name + '[' + i + '] must be a number');
            } else {
                value[i] = v;
            }
        });
        callback(null, value);
    },
    'array': function(value, pcfg, callback) {
        try {
            value = Util.jsonParse(value);
            if (!value.forEach) {
                throw new Error('not an array');
            }
            callback(null, value);
        } catch (e) {
            callback(pcfg.name + ' must be an array, value: ' + value);
        }
    }
};


function getChecker(type) {

    var checkMethod = checkers[type];
    if (!checkMethod) {

        // if (ARRAY_REGEXP.test(type)) { // 数组类型
        //     var subType = type.substring(1, type.length - 1);
        //     if (subType in db) { // 验证 db 的数据值
        //         checkMethod = function(value, pcfg, callback) {
        //             findArray(subType, value, pcfg, callback);
        //         };
        //         checkers[type] = checkMethod;
        //     } else {
        //         checkMethod = checkers['array'];
        //     }
        // } else if (type in db) {
        //     checkMethod = function(value, pcfg, callback) {
        //         findOne(type, value, pcfg, callback);
        //     };
        //     checkers[type] = checkMethod;
        // }
    }
    return checkMethod;
}

function verifyParam(value, pcfg, parameter, callback) {
    var valueHasSet = typeof value !== 'undefined';

    if(!valueHasSet && 'default' in pcfg){
        value = pcfg.default;
    }

    valueHasSet = typeof value !== 'undefined';

    if (!valueHasSet && pcfg.required) {
        return callback(pcfg.name + ' is required');
    }
    if (!valueHasSet) {
        return callback();
    }

    var type = pcfg.type || 'string';
    var checkMethod = getChecker(type);
    Logger.debug('[getChecker] ', !!checkMethod);
    if (!checkMethod) {
        Logger.error('[verifyParam] can\'t find checkMethod of type "', type, '" ');
        return callback();
    }

    checkMethod(value, pcfg, function(err, newValue) {
        if (err) {
            return callback(err, newValue);
        }
        if (pcfg.required) {
            if (typeof newValue === 'undefined') {
                return callback(pcfg.name + '\'s value is null');
            }
            if (us.isArray(newValue) && !newValue.length) {
                return callback(pcfg.name + '\'s length is 0');
            }
        }
        // if(newValue){
        //     newValue.__type = type;
        // }
        parameter[pcfg.name] = newValue;
        callback();
    });
}

/**
 * 1. 检查参数格式是否正确
 * 2. 检查参数值是否正确, 查询参数所代表的数据是否在数据库中,
 *     如果有, 则取出来, 存入 parameter 替换掉原来的参数
 */
module.exports = function(req, res, next) {
    var path = req.redirectPath || req.path;
    var method = req.method;
    var cfg = ParamConfig[path];
    var parameter = req.parameter = {};

    if (!cfg) {
        return next();
    }
    var cfgParams = cfg.params || [];

    var ep = new EventProxy();
    ep.fail(function(err, errCode) {

        Logger.info('[checkParams]', errCode, ':', err, 'path: ', path, ', method: ', method);
        res.json({
            err: errCode || ERR.PARAM_ERROR,
            msg: err
        });
    });

    if (cfg.method && cfg.method.indexOf(method) === -1) {

        Logger.info('[checkParams] not support method.', 'path: ', path, ', method: ', method);
        return res.json({
            err: ERR.NOT_SUPPORT,
            msg: 'not support method [' + method + ']'
        });
    }

    ep.after('verifyParamDone', cfgParams.length, function() {

        Logger.debug('[checkParams] verifyParamDone.', 'path: ', path, ', method: ', method, ', parameter: ', parameter);

        next();
    });

    cfgParams.forEach(function(pcfg) {
        var value = req.param(pcfg.name);

        verifyParam(value, pcfg, parameter, ep.group('verifyParamDone'));
    });

};