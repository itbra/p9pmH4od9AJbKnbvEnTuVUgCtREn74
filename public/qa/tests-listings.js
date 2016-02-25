"use strict";

+ (function(){
  suite('This Page Tests', function() {

      test('has link to "Home" page', function() {
          assert( $('a[href^="/"], a[href^="/?"]').length );
      });

      test('has link to "Listing" page', function() {
          assert( $('a[href="/listing"], a[href^="/listing?"], a[href="/listing/"], a[href^="/listing/?"]').length );
      });

  });
}());
