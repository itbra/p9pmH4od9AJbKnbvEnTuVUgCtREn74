+(function () {
  "use strict";

  if (!window.jQuery) {
    console.warn('jQuery is not available');
    return;
  }

  jQuery(function ($) {
    $(document)
    // Prevent users from saving images
      .on('contextmenu', '.thumbnail', function (evt) {
        //alert('Es ist nicht erlaubt, Bilder zu speichern!');
        //return false;
      })
      // Prevent users from saving images
      .on('click', '[data-media-type="video"]', function (evt) {
        //alert('Videofunktion noch nicht integriert');
        //return false;
      })
      .find('.thumbnail')
      .each(function () {
        var $this = $(this),
             $img = $('> :first-child', $this);

        $this
        .queue(function (next) {
          $img.after(
            $('<div/>', {
              class: 'overlay',
              css: {
                top: parseInt($this.css('padding-top')) + 1,
                left: Math.ceil($this.width()) - Math.ceil($img.width()) + parseInt($this.css('padding-left')),
                width: $img.width() - ($this.is('.video') ? 16 : 0),
                height: $img.height() - ($this.is('.video') ? 5 : 0)
              },
              html: '<div class="overlay-icons">' +
                       '<i class="fa fa-' + $this.data('mediaIcon') + '"></i>' +
                       '<div class="player-toggles">' +
                          '<div class="player-toggle pause" style="display:none">' +
                             '<i class="fa fa-pause"></i>' +
                          '</div>' +
                          '<div class="player-toggle play" style="display:none">' +
                             '<i class="fa fa-play"></i>' +
                          '</div>' +
                       '</div>' +
                    '</div>'
            })
          );

          next();
        });

        if ($this.is("a[rel^='lightbox']")) {
          $this.simpleLightbox();
        } else {
          if ($this.is('[data-media-type="video"]')) {

          var $status = $('.status', $this),
               $video = $( $this.data('target') ),
                video = $video.get(0) ;

            // Bind to most required events
            $video
            .on('loadstart',  function (evt) {})
            .on('progress',   function (evt) {})
            .on('abort',      function (evt) {
              $status.html('<code>Failed to load</code>');
            })
            .on('loadeddata', function (evt) {
              $status.empty();

              $('.player-toggle.play', $this).fadeIn();

              $('> :first-child', $this).removeClass('loading')
            })
            .on('playing',    function (evt) {})
            .on('pause',      function (evt) {})
            .on('ended',      function (evt) {
                 $('.player-toggle.play', $this).fadeIn('fast');
            });

            $this
            .on('mouseenter', function (evt) {
              if ( $video.is('.playing') ) {
                 $('.player-toggle.pause', $this).fadeIn('fast');
              }
            })
            .on('mouseleave', function (evt) {
              if ( $video.is('.playing') ) {
                 $('.player-toggle', $this).fadeOut('fast');
              }
            })
            .on('click',      function (evt) {
              $('.player-toggle', $this).toggle();

              if ( $video.is('.playing') ) {
                video.pause();
              } else {
                video.play();
              }

              $video.toggleClass('playing');
            });
          }
        }
      });
  });
}());
