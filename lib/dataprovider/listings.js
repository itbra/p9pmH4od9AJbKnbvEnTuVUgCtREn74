"use strict";

//TODO - get connector to remote data source
//TODO - load remote data into *.json data file
//TODO - replace hardcoded example data object by remotely fetched JSON data

var listings = [
  {
    id: 1,
    title: 'Example Listing',
    alias: 'example-listing',
    tagline: 'No tagline set.',
    description: 'Lorem ipsum dolor sit met ...'
  },
  {
    id: 2,
    title: 'Just a listing',
    alias: 'just-a-listing',
    tagline: 'A listing is just a listing.',
    description: 'Lorem ipsum dolor sit met ...'
  },
  {
    id: 3,
    title: 'Yet another listing',
    alias: 'yet-another-listing',
    tagline: 'No tagline set.',
    description: 'Lorem ipsum dolor sit met ...'
  }
];

//TODO - create Unit test
var addUrls = function(data) {
  if (!data) {
    return data;
  }

  if (typeof(data.slice) === 'function') {
    data.forEach(function(listing) {
      listing.url = {};
      listing.url.base = fixUrl('/' + (listing.id || '') + '/' + (listing.alias || '') + '/');
      listing.url.edit = fixUrl('/edit/' + listing.url.base);
    });
  } else {
    data.url = {};
    data.url.base = fixUrl('/' + (data.id || '') + '/' + (data.alias || '') + '/');
    data.url.edit = fixUrl('/edit/' + data.url.base);
  }

  return data;
};

//TODO - create Unit test
var fixUrl = function(url) {
   return url.replace(/\/\//g, '/');
};


/* Register public methods */

exports.getListings = function() {
  return addUrls(listings);
};

exports.getListing  = function(id) {
  var ret = null,
      found = false;

  // Force datatype 'number'
  id = id * 1;

  listings.forEach(function(listing) {
    if (found === false) {
      if (listing.id === id) {
        ret = listing;

        found = true;
      }
    }
  });

  return addUrls(ret);
};

