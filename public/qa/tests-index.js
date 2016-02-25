"use strict";

+ (function(){
  suite('This Page Tests', function() {

      test('has link to "Listings" page', function() {
          assert( $('a[href="/listings"], a[href^="/listings?"], a[href="/listings/"], a[href^="/listings/?"]').length );
      });

  });
}());
