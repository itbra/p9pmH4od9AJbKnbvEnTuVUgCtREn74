+(function () {
  "use strict";

  if (!window.jQuery) {
    console.warn('jQuery is not available');
    return;
  }

  jQuery(function ($) {
    var setWidthHeight = function (el, ref, callback) {
      el = $(el);
      ref = $(ref);

      el
        .attr({
          width: ref.parents('.thumbnail').width() - (ref.parents('.thumbnail').width() - ref.width()),
          height: ref.parents('.thumbnail').height() - (ref.parents('.thumbnail').height() - ref.height()) - 1,
        });

      el
        .parent()
        .css({
          'width': parseInt(el.attr('width')),
          'height': parseInt(el.attr('height')) + 1,
          'margin-left': Math.floor(ref.parents('.thumbnail').width() - ref.width()) / 2
        });

      if (typeof callback === 'function') {
        callback.call(el);
      }
    };

    var device = $(document).data('device'),
      $media = $('[data-media-type]'),
      $images = $('[data-media-type="image"]'),
      $videos = $('[data-media-type="video"]'),
      $refImg = $media.first('[data-media-type="image"]').find('> img'),
      isMobile = $media.first().is('.mobile');

    $(document)
    // Prevent users from saving images
      .on('contextmenu', '.thumbnail', function () {
        alert('Es ist nicht erlaubt, Bilder zu speichern!');
        return false;
      });

    // FIXME - use resizestop to prevent the browser from crashing once there's too much content.
    $(window)
      .on('resize', function (evt) {
        $videos.each(function () {
          setWidthHeight($('video', this), $refImg, function () {
            if ($('> source', this).attr('src') === '') {
              $('> source', this).attr({src: $(this).data('src')}).parent().get(0).load();
            }
          });

          var $vid = $(this);

          // Fix centering of play/pause toggles
          $('.player-toggle', this)
            .queue(function (next) {
              $(this)
                .css({
                  'margin-top': ($vid.height() / 2) - (parseInt(window.getComputedStyle($('> i', this).get(0), null).fontSize) / 2)
                });

              next();
            });
        });
      })
      .trigger('resize');

    $('#nummedia').text($media.length);

    $media.each(function (idx) {
      var $this = $(this), $img = $('> :first-child', this);

      // $('#counter').text(idx);

      if ($this.is("a[rel^='lightbox']")) {
        // Update images counter
        // $('#numimg').text(parseInt($('#numimg').text()) + 1);
        // $('#counter').text(parseInt($('#counter').text()) + 1);

        $this.simpleLightbox();
      } else {
        if ($this.is('[data-media-type="video"]')) {
          // Update video counter
          // $('#numvid').text(parseInt($('#numvid').text()) + 1);
          // $('#counter').text(parseInt($('#counter').text()) + 1);

          var $overlay = $('.video-overlay', $this),
            $status = $('.player-status', $this),
            $toggles = $('.player-toggles', $this),
            $video = $($this.data('target')),
            video = $video.get(0);

          // Bind to most required events
          $video
            .on('loadstart', function () {
            })
            .on('progress', function () {
            })
            .on('abort', function () {
              $('#status').append('Error loading video #' + this.id + '<br>');
            })
            .on('loadeddata', function () {
              $status.hide().empty();
              $toggles.show();

              $this.removeClass('loading');

              $('.player-toggle.play', $this).fadeIn();

              $(this).removeAttr('style');

              $('#status').append($('.thumbnail.video').attr('class').replace(/\s?(thumbnail|loading)\s?/ig, '') + ' #' + this.id + ' loaded<br>');
            })
            .on('playing', function () {
            })
            .on('pause', function () {
            })
            .on('ended', function () {
              $('.player-toggle.play', $this).find('> i').toggleClass('fa-pause fa-play').end().fadeIn('fast');
            });

          $this
            .on('mouseenter', function () {
              if ($video.is('.playing')) {
                $('.player-toggle.play', $this).fadeIn('fast');
              }
            })
            .on('mouseleave', function () {
              if ($video.is('.playing')) {
                $('.player-toggle.play', $this).fadeOut('fast');
              }
            })
            .on('click', function () {
              $('.player-toggle', $this).find('> i').toggleClass('fa-play fa-pause');

              if ($video.is('.playing')) {
                video.pause();
              } else {
                video.play();

                /* On mobile devices remove the player toggles
                 if ($this.is('.mobile') && $toggles.length) {
                 $toggles.remove();

                 $toggles = $('.player-toggles', $this);
                 } */
              }

              $video.toggleClass('playing');
            });
        }
      }
    });
  });
}());
