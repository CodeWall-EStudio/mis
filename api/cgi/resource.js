var co = require('co');
var fs = require('fs');
var path = require('path');

var ERR = require('../errorcode');
var Logger = require('../logger');
var config = require('../config');
var db = require('../modules/db');
var Util = require('../util');
var iconv = require('iconv-lite');
//视频处理
//需要安装ffmpeg客户端 window下需要配置ffmpeg的bin目录地址到path变量中.
var ffmpeg = require('fluent-ffmpeg');

exports.upload = function*(req, res) {
    var file = req.files.file;
    var format = req.query.format || req.body.format || false;
    var loginUser = req.loginUser;

    if (!file || !file.path) {
        return res.json({
            code: ERR.UPLOAD_FAILURE,
            msg: '上传失败'
        });
    }
    // 保存到指定目录和创建db记录
    var dbFileDir = Util.formatDate(new Date(), 'yyyy/MM/dd/hhmm/');
    var saveDir = path.join(config.DATA_ROOT, dbFileDir);
    Util.mkdirsSync(saveDir);

    var filePath = saveDir + '/' + file.name;
    Util.moveFile(file.path, filePath, function(err) {
        if (err) {
            return res.json({
                code: ERR.UPLOAD_FAILURE,
                msg: '上传成功, 保存文件失败'
            });
        }

        // 创建db记录
        co(function*() {
            var result =
                yield req.conn.yieldQuery('INSERT INTO resource SET ?', {
                    name: decodeURIComponent(file.originalname),
                    size: file.size,
                    ext: file.extension,
                    path: dbFileDir + file.name,
                    mimetype: file.mimetype,
                    type: formatType(file.mimetype, file.extension),
                    creator: loginUser.id
                });

            var rows =
                yield req.conn.yieldQuery('SELECT * FROM resource WHERE id = ?', result.insertId);

            var data = {
                code: ERR.SUCCESS,
                data: rows[0]
            };

            if(format === 'json'){
                res.json(data);                
            }else{
                res.write('<script>top.uploadComp(' + JSON.stringify(data) + ')</script>');
            }
            res.end();

            // res.json({
            //     code: ERR.SUCCESS,
            //     data: rows[0]
            // });

            // req.conn.release();

        }).catch(function(err) {
            db.handleError(req, res, err.message);
        });

    });
};

exports.download = function*(req, res) {
    var parameter = req.parameter;
    var id = parameter.id;
    var loginUser = req.loginUser;


    var rows =
        yield req.conn.yieldQuery('SELECT * FROM resource WHERE id = ?', id);

    if (!rows[0]) {
        return res.send(404, '没有找到该资源');
    }

    var resource = rows[0];
    var filePath = path.join(config.DATA_ROOT, resource.path);

    Logger.info('redirect to :' + filePath, 'mimes: ' + resource.mimetype, 'fileName: ', resource.name);

    res.download(filePath, encodeURIComponent(resource.name));
};


exports.preview = function*(req, res) {
    var parameter = req.parameter;
    var id = parameter.id;
    var loginUser = req.loginUser;


    var rows =
        yield req.conn.yieldQuery('SELECT * FROM resource WHERE id = ?', id);

    if (!rows[0]) {
        return res.send(404, '没有找到该资源');
    }

    var resource = rows[0];
    var filePath = path.join(config.DATA_ROOT, resource.path);


    //1. 图片, 直接给url
    //2. 文档, 给出swf url
    //3. txt, 给出 text的文本内容
    //4. 音频/视频, 直接给出url

    switch (resource.type) {
        case 2: // 文档
            // var swfFile = filePath + '.swf';
            // if(!fs.existsSync(swfFile)){
            //     Logger.error('can\'t find ' + swfFile + '! try to convert...');
            //     var suffix = path.extname(filePath).slice(1);
            //     convert(path.join(config.FILE_SAVE_ROOT, filePath), resource.mimes, suffix, function(err){
            //         if(err){
            //             res.json({ err: ERR.NOT_FOUND, msg: 'can not find this file and convert failure' });
            //             return;
            //         }
            //         Logger.info('convert success: ' + filePath);
            //         res.set({
            //             'Content-Type': 'application/x-shockwave-flash',
            //             'X-Accel-Redirect': filePath + '.swf'
            //         });
            //         res.send();
            //     });
            // }else{
            //     res.set({
            //         'Content-Type': 'application/x-shockwave-flash',
            //         'X-Accel-Redirect': filePath + '.swf'
            //     });
            //     res.send();
            // }
            // break;
        case 1: //image
        case 3: //audio
        case 4: //video
        case 5: //stream
            // res.set({
            //     'Content-Type': resource.type,
            //     'X-Accel-Redirect': filePath
            // });
            // res.set({
            //     'Content-Type': resource.type,
            //     'X-Accel-Redirect': filePath
            // });
            // res.send();
            res.sendfile(filePath);
            break;
        case 8: //text
            try {
                var data = fs.readFileSync(filePath,{encoding:'binary'});
                var buf = new Buffer(data, 'binary');
                var str = iconv.decode(buf, 'GBK');
                res.send(str);
            } catch (e) {
                res.send(404, '没有找到该资源');
            }
            break;
        default:
            res.send(405, '不支持这种类型文件的预览');
    }
};

//分割视频文件
exports.mark = function*(req,res){
    var parameter = req.parameter;
    var id = parameter.id,
        start = parameter.startTime,
        end = parameter.endTime,
        mark = parameter.mark;
}

//分割视频文件
exports.split = function*(req,res){

    var parameter = req.parameter;
    var id = parameter.id,
        start = parameter.startTime,
        length = parameter.length;

    var rows =
        yield req.conn.yieldQuery('SELECT * FROM resource WHERE id = ?', id);    

    if(!rows[0]){
        return res.send(404, '没有找到该资源');   
    }

    var dbFileDir = Util.formatDate(new Date(), 'yyyy/MM/dd/hhmm/');
    var saveDir = path.join(config.DATA_ROOT, dbFileDir);
    Util.mkdirsSync(saveDir);

    var filePath = saveDir + '/mark'+new Date().getTime()+Math.random()+'.mp4';    

    var scorePath = path.join(config.DATA_ROOT, rows[0].path);

    var proc = new ffmpeg({ source: scorePath })
        .withAspect('4:3')
        .withSize('100%')
        //这里是生成截图的代码.
        // .screenshots({
        //     count : 1,
        //     folder: './',
        //     size: '320x240'
        // })        
        .setStartTime(start)
        .duration(length)
        .applyAutopadding(true, 'white')
        .on('error', function(err) {
            res.json({
                code: err.message
            });            
        })
        .on('end', function() {
            res.download(filePath, encodeURIComponent(Math.random()+'.mp4'));
            // res.json({
            //     code: 0
            // });
        })        
        .saveToFile(filePath, function(retcode, error) {
            console.log('file has been converted succesfully');

            res.json({
                code: 0
            });
        });    
}

exports.list = function*(req,res){
   var params = req.parameter;
   var id = params.id;

    var rows =
        yield req.conn.yieldQuery('SELECT COUNT(*) AS count FROM resource_mark WHERE resource_id = ?', id);
    var total = rows[0].count;

    var sql = 'select m.*,u.name from resource_mark m,user u where u.id = m.creator and m.resource_id =? order by m.id desc';

    rows =
        yield req.conn.yieldQuery(sql, [id, params.start, params.limit]);   

    res.json({
        code: ERR.SUCCESS,
        data: {
            total: total,
            list: rows
        }
    });
}

exports.mark = function*(req,res){
   var params = req.parameter;
   var loginUser = req.loginUser;
   var id = params.id,
       mark = params.mark,
       startTime = params.startTime,
       endTime = params.endTime;


    var result =
        yield req.conn.yieldQuery('INSERT INTO resource_mark SET ?', {
            start: params.startTime,
            end: params.endTime,
            creator: loginUser.id,
            mark: params.mark,
            resource_id : params.id
        });

    var id = result.insertId;

    rows =
        yield req.conn.yieldQuery('SELECT rm.*,u.name FROM resource_mark rm,user u WHERE rm.creator = u.id and rm.id = ?', id);

    res.json({
        code: ERR.SUCCESS,
        data: rows[0]
    });    

}


function formatType(mimes, ext) {
    if (config.FILE_MIMES['image'].indexOf(mimes) > -1) {
        return 1;
    } else if (config.FILE_MIMES['document'].indexOf(mimes) > -1) {
        return 2;
    } else if (config.FILE_MIMES['pdf'].indexOf(mimes) > -1) {
        return 2;
    } else if (config.FILE_MIMES['audio'].indexOf(mimes) > -1) {
        return 3;
    } else if (config.FILE_MIMES['video'].indexOf(mimes) > -1) {
        return 4;
    } else if (config.FILE_MIMES['application'].indexOf(mimes) > -1) {
        return 5;
    } else if (config.FILE_MIMES['archive'].indexOf(mimes) > -1) {
        return 6;
    } else if (config.FILE_MIMES['text'].indexOf(mimes) > -1) {
        return 8;
    } else if (ext) {

        if (config.FILE_SUFFIX['image'].indexOf(ext) > -1) {
            return 1;
        } else if (config.FILE_SUFFIX['document'].indexOf(ext) > -1) {
            return 2;
        } else if (config.FILE_SUFFIX['pdf'].indexOf(ext) > -1) {
            return 2;
        } else if (config.FILE_SUFFIX['audio'].indexOf(ext) > -1) {
            return 3;
        } else if (config.FILE_SUFFIX['video'].indexOf(ext) > -1) {
            return 4;
        } else if (config.FILE_SUFFIX['application'].indexOf(ext) > -1) {
            return 5;
        } else if (config.FILE_SUFFIX['archive'].indexOf(ext) > -1) {
            return 6;
        } else if (config.FILE_SUFFIX['text'].indexOf(ext) > -1) {
            return 8;
        } else {
            return 7;
        }
    } else {
        return 7;
    }
}


function convert(filepath, mimes, ext, callback) {
        Logger.info('>>>convert file: mimes', filepath, mimes, ext);
        var cmd;
        //doc 文档要生成 swf 格式文件
        if (config.FILE_MIMES['document'].indexOf(mimes) > -1 || config.FILE_SUFFIX['document'].indexOf(ext) > -1) {
            cmd = 'java -jar ' + config.JOD_CONVERTER + ' ' + filepath + ' ' + filepath + '.pdf';
            Logger.info('>>>convert file: exec', cmd);
            process.exec(cmd, function(err, stdout, stderr) {
                if (!err) {
                    cmd = 'pdf2swf ' + filepath + '.pdf -s flashversion=9 -o ' + filepath + '.swf';
                    Logger.info('>>>convert file: exec', cmd);
                    process.exec(cmd, function(err, stdout, stderr) {
                        callback(err);
                        if (err) {
                            Logger.error('>>>file convert error: to swf: ', err, stderr, mimes, ext);
                        } else {
                            Logger.info('>>>convert file: done with ', cmd);
                        }
                    });
                } else {
                    callback(err);
                    Logger.error('>>>file convert error: to pdf', err, stderr, mimes, ext);
                }
            });
        } else if (config.FILE_MIMES['pdf'].indexOf(mimes) > -1 || config.FILE_SUFFIX['pdf'].indexOf(ext) > -1) {
            cmd = 'pdf2swf ' + filepath + '.pdf -s flashversion=9 -o ' + filepath + '.swf';
            Logger.info('>>>convert file: exec', cmd);
            process.exec(cmd, function(err, stdout, stderr) {
                callback(err);
                if (err) {
                    Logger.error('>>>file convert error2: to swf', err, stderr, mimes, ext);
                } else {
                    Logger.info('>>>convert file: done with ', cmd);
                }
            });

        } else {
            callback();
        }
    }
    // };