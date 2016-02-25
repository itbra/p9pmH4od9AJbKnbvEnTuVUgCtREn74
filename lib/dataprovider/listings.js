"use strict";

var listings = [
  {
    id: 1,
    title: 'Listing 1',
    tagline: 'Listing 1 is Listing 1',
    description: 'This is just a dummy'
  },
  {
    id: 2,
    title: 'Listing 2',
    tagline: 'Listing 2 is Listing 2',
    description: 'This is just a dummy'
  },
  {
    id: 3,
    title: 'Listing 3',
    tagline: 'Listing 3 is Listing 3',
    description: 'This is just a dummy'
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

