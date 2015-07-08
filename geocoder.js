var geocoderProvider = 'opencage';
var httpAdapter = 'http';
var extra = {
  apiKey: 'c1cecae3b03e9388b572b1e1828eaf45', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);

module.exports = function(location, callback) {

  geocoder.geocode(location, function(err, res) {
    if (res && res[0]) {
      var coordinates = [res[0].longitude, res[0].latitude];
      callback(coordinates);
    }
  });

}
