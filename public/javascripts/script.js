+ (function() {
  "use strict";

  if (!window.jQuery) {
    console.warn('jQuery is not available');
    return;
  }

  jQuery(function($) {
    $(document)
    // Prevent users from saving images
    .on('contextmenu', '.thumbnail', function(evt) {
      alert('Es ist nicht erlaubt, Bilder zu speichern!');
      return false;
    })
    // Prevent users from saving images
    .on('click', '[data-media-type="video"]', function(evt) {
      alert('Videofunktion noch nicht integriert');
      return false;
    })
    .find('.thumbnail')
      .each(function() {
        var $this = $(this), $img;

        if ($this.is("a[rel^='lightbox']")) {
          $this.simpleLightbox();
        } else {
          if ($this.is('[data-media-type="video"]')) {
            $img = $('>img', $this);

            $this
            .queue(function(next) {
              $img.after(
                $('<div/>', {
                class: 'overlay',
                  css: {
                    top: parseInt($this.css('padding-top')) + 1,
                    left: Math.ceil($this.width()) - Math.ceil($img.width()) + parseInt($this.css('padding-left')),
                    width: $img.width(),
                    height: $img.height()
                  },
                  html: '<div><i class="fa fa-' + $this.data('mediaIcon') + '"></i></div>'
                })
              );

              next();
            });
          }
        }
      });
  });
}());
