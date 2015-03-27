
'SELECT COUNT(s.id) AS count FROM subject s WHERE isArchive = 0';
new Query()
    .select([
        'COUNT(s.id) AS count'
           ])
    .from('subject s')
    .where({
        isArchive: 0
    })
    .toString()

'SELECT s.*, u.name AS creatorName, (SELECT COUNT(su.id) FROM subject_user su WHERE su.subject_id = s.id) AS memberCount, (SELECT COUNT(sr.id) FROM subject_resource sr WHERE sr.subject_id = s.id) AS resourceCount 
FROM subject s, user u 
WHERE s.creator = u.id AND isArchive = 0';
new Query()
    .select([
        's.*',
        'u.name AS creatorName',
        '(SELECT COUNT(su.id) FROM subject_user su WHERE su.subject_id = s.id) AS memberCount',
        '(SELECT COUNT(sr.id) FROM subject_resource sr WHERE sr.subject_id = s.id) AS resourceCount'
           ])
    .from(['subject s', 'user u'])
    .where({
        isArchive: 0,
        's.creator': 'u.id'
    })
    .toString()


function Query(){

}

Query.prototype.toString = function() {
    return this._select + this._from + this._where;
};

Query.prototype.select = function(arr) {
    this._select = 'SELECT' + arr.join(',');
};

Query.prototype.from = function(arr) {
    this._from = 'FROM' + arr.join(',');
};

Query.prototype.where = function (obj) {
    var arr = [];
    for(var i in obj){
        if(obj.hasOwnProperty(i)){
            arr.push(i + '=' + obj[i]);
        }
    }
    this._where = 'WHERE' + arr.join(' AND ');
}
