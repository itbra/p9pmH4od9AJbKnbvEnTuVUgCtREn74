+ (function() {
  "use strict";

  if (!window.jQuery) {
    console.warn('jQuery is not available');
    return;
  }

  jQuery(function($) {
    // console.info("jQuery is there for you!");

	$("a[rel^='lightbox']").simpleLightbox();
  });
}());
