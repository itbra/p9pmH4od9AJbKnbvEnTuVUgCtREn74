"use strict";

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

exports.getListings = function() {
  return listings;
};
exports.getListing  = function(id) {
  var ret = null,
      found = false;

  listings.forEach(function(listing) {
    if (found === false) {
      if (listing.id == id) {
        ret = listing;

        found = true;
      }
    }
  });

  return ret;
};

