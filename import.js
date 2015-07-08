var fs = require('fs');
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
var _ = require('lodash');

var DATABASE_NAME = 'wil_engine'
var url = 'mongodb://localhost:27017/' + DATABASE_NAME;
var dataDir = 'data_output'
var collection = 'records'


var insertRecords = function(db, collection, data, callback) {
  db.collection(collection).insert(JSON.parse(data), function(err, result) {
    assert.equal(err, null);
    console.log('insert successful!')
    callback(result);
  });
};

var importFile = function(file, dataDir){
  fs.readFile(dataDir + '/'+ file, 'utf8', function(err, data){
    if(err) {
      return console.log(err);
    }

    MongoClient.connect(url, function(err, db){
      assert.equal(null, err);
      insertRecords(db, collection, data, function(){
        db.close();
      })
    });

  })
}

var dropCollection = function(){
  MongoClient.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('records').drop( function(err, response) {
      db.close();
     });
  });
}

var createLocationIndex = function(){
  MongoClient.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('records').createIndex({
      loc : "2dsphere"
    }, function(err, result){
      assert.equal(err, null)
      console.log(result)
      db.close()
    })
  });
}

fs.readdir(dataDir, function (err, files) {
  if (!err){
    dropCollection()
    _.forEach(files, function(file, index){
      importFile(file, dataDir)
    })
    createLocationIndex()
  }else{
    throw err;
  }
});
