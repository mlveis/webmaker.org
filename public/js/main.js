define(['jquery', 'jquery-carousel', 'base/carousel', 'base/webmaker', 'base/mediaGallery', 'base/privacy', 'base/ui'],
  function ($, $carousel, carousel, webmaker, MediaGallery, privacy, UI) {
  'use strict';
  $(document).ready(function() {
    var $body = $('body'),
    $search = $('#search'),
    search,
    media = new MediaGallery();

    $('.search-trigger').click( function( e ) {
      $search.toggleClass('on');
    });

    $('#bottom-search-btn').click( function( e ) {
      $('html, body').animate({
        scrollTop: 0
      }, 300, function() {
        $search.addClass('on');
        $('#search-keyword').focus();
      });
    });

    media.init();

    UI.select( '#search-filter', function( val ) {
      var tags = [];
      search = $search.find( '[name=keyword]' ).val();
      tags.push(search);

      switch ( val ) {
        case 'recent':
          case 'title':
          media.search( { tags: tags });
        break;

        default:
          tags.push(val);
        media.search( { tags: tags, contentType: 'application/x-thimble' } );
        break;
      }
    });

    $search.on( 'submit', 'form', function( e ) {
      e.preventDefault();
      search = $( e.target ).find( '[name=keyword]' ).val();
      media.search( { tags: [ search ] } );
    });

    carousel.init({
      page: $body[0].id
    });

    carousel.attachToCTA();
    carousel.attachToPartners();

    privacy.attach();
  });
  });