var co = require('co');
var fs = require('fs');
var path = require('path');

var ERR = require('../errorcode');
var Logger = require('../logger');
var config = require('../config');
var db = require('../modules/db');
var Util = require('../util');


// {
//     "file": {
//     "fieldname": "file",
//     "originalname": "3-10%E4%BE%8B%E4%BC%9A%E7%BA%AA%E8%A6%81.md",
//     "name": "2908371a1c7535977b64b111ea20f17f.md",
//     "encoding": "7bit",
//     "mimetype": "application/octet-stream",
//     "path": "/Users/azrael/Documents/工作室项目/sources/mis/uploads/2908371a1c7535977b64b111ea20f17f.md",
//     "extension": "md",
//     "size": 218,
//     "truncated": false,
//     "buffer": null
//     }
// }
exports.upload = function*(req, res) {
    var file = req.files.file;
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
            console.log(err);
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

            res.write('<script>top.uploadComp(' + JSON.stringify(data) + ')</script>');
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

            res.sendfile(filePath);
            break;
        case 8: //text
            try {
                var data = fs.readFileSync(filePath);

                res.send(data.toString());
            } catch (e) {
                res.send(404, '没有找到该资源');
            }
            break;
        default:
            res.send(405, '不支持这种类型文件的预览');
    }
};


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