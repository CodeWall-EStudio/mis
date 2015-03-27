
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
};

module.exports = Query;