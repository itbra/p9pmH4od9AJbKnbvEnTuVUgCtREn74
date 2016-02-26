"use strict";

+ (function(){
  suite('Form Tests', function() {

      test('form exists', function() {
          assert($('form').length);
      });

      test('has fields', function() {
         assert($('form :input').not(':hidden').not(':button').length);
      });

      test('has abort button', function() {
          assert($('.btn.btn-cancel').length);
      });

      test('has submit button', function() {
         assert($('[type="submit"]').length);
      });

  });
}());
