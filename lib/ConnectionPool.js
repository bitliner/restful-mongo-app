var MongoClient = require('mongodb').MongoClient;

    var DATABASE = null,
    done = false


    /***
    @options - it contains or url for connection or host, port, database name for connection 
*/

function ConnectionPool(options) {
    var self = this
    if(typeof options.url !== 'undefined') {
        self.url = options.url
    } else {
        url = self._getConnectionUrl(options)
    }
    console.log('RESTFUL MONGO','CONNECTED 2',url)

}
ConnectionPool.prototype.getDb = function(cb) {
    var self = this
    if(DATABASE != null) {
        cb(null, DATABASE)
    } else {
        self._connect(function(err, db) {
            if(err) {
                console.log('CONNECTION POOL:ERR', err)
                cb(err, null)
            }
            DATABASE = db
            cb(null, DATABASE)
        })
    }
}
ConnectionPool.prototype._connect = function(cb) {
    var self = this,
        url = self.url
        console.log('DB-URL', url)
        MongoClient.connect(url, function(err, db) {
            cb(err, db)
        });
}
ConnectionPool.prototype._getConnectionUrl = function(options) {
    var url = (typeof options.USERNAME !== 'undefined' || options.USERNAME != ''  ) ? ['mongodb://', options.USERNAME + ':' + options.PASSWORD + '@', options.HOST + ':' + options.PORT, '/' + options.DATABASE_NAME] : ['mongodb://', options.HOST + ':' + options.PORT, '/' + options.DATABASE_NAME]
    url = url.join('')
    console.log('DB CONN URL', url)
    return url
}

module.exports=ConnectionPool