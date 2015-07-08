var fs = require('fs');
var _ = require('lodash')
var temperatureFile = 'sample_data/air_temp.2010'
var precipitationFile = 'sample_data/precip.2010'

fs.readFile(temperatureFile, 'utf8', function(err, data){
  if(err) {
    return console.log(err);
  }

  var dataInput = data.split('\n');
  var result = _.map(dataInput, function(item){
    var line = item.replace(/\s+/g, ',');
    var lineValues = line.split(',')
    var longitude = Number(lineValues.shift()).toFixed(2)
    var latitude = Number(lineValues.shift()).toFixed(2)

    var record = {
      loc: {
        type: 'Point',
        coordinates: [longitude, latitude]
      },
      temp: lineValues
    }
    return record
  })


  fs.readFile(precipitationFile, 'utf8', function(err, data){
    if(err) {
      return console.log(err);
    }

    var dataInput = data.split('\n');

    _.each(dataInput, function(item){
      var line = item.replace(/\s+/g, ',');
      var lineValues = line.split(',')
      var longitude = Number(lineValues.shift()).toFixed(2)
      var latitude = Number(lineValues.shift()).toFixed(2)

      var resultIndex = _.findIndex(result, function(record) {
        return record.loc.coordinates[0] == longitude && record.loc.coordinates[1] == latitude;
      });

      if(resultIndex > -1){
        result[resultIndex].precip = lineValues;
      }
    })

    var writeFile = function(index, chunk){
      fs.writeFile("data_output/"+ index +".json", chunk, function(err) {
        if(err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
    }

    if (result.length > 0) {
      result = _.chunk(result, 1000);
      _.forEach(result, function(chunk, index){
        _.forEach(chunk, function(val, i){
          var longitude = Number(val.loc.coordinates[0])
          var latitude = Number(val.loc.coordinates[1])
          val.loc.coordinates = [longitude, latitude]
        })
        writeFile(index, JSON.stringify(chunk))
      })
    }

  });

});