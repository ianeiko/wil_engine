var fs = require('fs');
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
var _ = require('lodash');

var DATABASE_NAME = 'wil_engine'
var url = 'mongodb://localhost:27017/' + DATABASE_NAME;

var findGeoNear = function (db, cb) {
  var cursor = db.collection('records').find({
    loc:
      { $near:
        {
          $geometry: { type: "Point", coordinates: [-122.416, 37.783] },
          $maxDistance: (50 * 1000)
        }
      }
  })
  cursor.each(function(err, doc){
    assert.equal(err, null)
    if (doc != null) {
      console.dir(doc);
    } else {
      cb();
    }
  })
}

MongoClient.connect(url, function(err, db){
  assert.equal(null, err);
  findGeoNear(db, function(){
    db.close();
  })
});