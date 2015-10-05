var geocoderProvider = 'opencage';
var httpAdapter = 'http';
var geocoderKey = require('./geocoderKey');
var extra = {
  apiKey: geocoderKey.opencage, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);

module.exports = function(location, callback) {

  geocoder.geocode(location, function(err, res) {
    if (res && res[0]) {
      // console.log('geocoder', res[0]);
      var coordinates = [res[0].longitude, res[0].latitude];
      callback(coordinates);
    }
  });

}
