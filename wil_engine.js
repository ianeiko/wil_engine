var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
var _ = require('lodash');
var DATABASE_NAME = 'wil_engine'
var url = 'mongodb://localhost:27017/' + DATABASE_NAME;
var geocoder = require('./geocoder')

var findGeoNear = function (db, coordinates, cb) {
  var result = [];
  var cursor = db.collection('records').find({
    loc:
      { $near:
        {
          $geometry: { type: "Point", coordinates: coordinates },
          $maxDistance: (50 * 1000)
        }
      }
  })
  cursor.each(function(err, doc){
    assert.equal(err, null)
    if (doc != null) {
      result.push(doc)
    } else {
      cb(result);
    }
  })
}

module.exports = function(location, callback){

  MongoClient.connect(url, function(err, db){
    assert.equal(null, err);

    geocoder(location, function(coordinates){

      findGeoNear(db, coordinates, function(data){
        db.close();
        callback(data);
      })

    })

  });

}