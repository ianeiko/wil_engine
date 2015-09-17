## DESCRIPTION

This is an experiment that uses climate data from the University of Delaware and MongoDB along with [OpenCage Geocoder](http://geocoder.opencagedata.com/) to display climate for any given location. The geocoder converts a string into Lat/Long cordinates and then we query the database using the [$near](http://docs.mongodb.org/manual/reference/operator/query/near/) operator. A [2dsphere](http://docs.mongodb.org/manual/core/2dsphere/) index is created during data import to facilitate location queries.

## INSTALL

Requires [Node.js](https://nodejs.org) and [MongoDB](https://www.mongodb.org/downloads)

$ npm install

## IMPORT DATA

$ node records.js && node import.js

or

$ bash import_data

Note: this will take a few minutes

## START

$ npm start

by default app start on [localhost:3000](http://localhost:3000/)

### Data Sources

[http://climate.geog.udel.edu/~climate/html_pages/download.html#T2011](Temperature)
[http://climate.geog.udel.edu/~climate/html_pages/download.html#P2011rev](Precipitation)