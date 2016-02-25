"use strict";

+ (function(){
  suite('Global Page Tests', function() {

      /* Don't apply this test if this lib is loaded from a CDN
      test('jQuery library is available', function() {
          assert(typeof jQuery === 'object');
      }); */

      /* Don't apply this test if this lib is loaded from a CDN
      test('Twitter Bootstrap library 3 is available', function() {
          assert(typeof jQuery().emulateTransitionEnd == 'function');
      }); */

      test('has valid title', function() {
          assert(document.title &&
              document.title.match(/\S/) &&
              document.title.toUpperCase() !== 'TODO'
          );
      });

  });
}());
