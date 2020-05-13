// var photoTicket = (function () {
//
//     var front = {
//         event: {},
//         slider: {}
//     }
//
//     var btnHeartClick = function () {
//         jQuery('._btnHeart').on('click', function () {
//             jQuery(this).hasClass('active') ? jQuery(this).removeClass('active') : jQuery(this).addClass('active');
//         });
//     };
//
//     var photoSlider = function () {
//         var photoTicketSlider = new Swiper('.slider_wrap .swiper-container', {
//             speed: 400,
//             width : '260',
//             autoPlay: true,
//             autoHeight: false,
//             direction: 'horizontal',
//             loop: false,
//             slidesPerView: 1,
//             centeredSlides: true,
//             breakpointsInverse: false,
//             roundLengths: false,
//             breakpoints: {
//                 320: {
//                     spaceBetween: 20,
//                 },
//                 360: {
//                     spaceBetween: 40
//                 }
//             },
//             on: {
//                 init: function () {
//                 },
//             }
//         });
//        photoTicketSlider.translateTo(0, 1, true);
//     }
//
//     var init = function () {
//         front.event = btnHeartClick();
//         front.slider = photoSlider();
//     };
//
//     return {
//         init : init,
//     };
//
// })();

// (function (jQuery) {
//     photoTicket.init();
// })
// var front = {
//     event : {},
//     slider : {},
// };
// (function (jQuery) {
//     // console.log(jQuery)
//
//     var btnHeartClick = function () {
//         jQuery('._btnHeart').on('click', function () {
//             jQuery(this).hasClass('active') ? jQuery(this).removeClass('active') : jQuery(this).addClass('active');
//         });
//     };
//     var photoSlider = function () {
//         var photoTicketSlider = new Swiper('.slider_wrap .swiper-container', {
//             speed: 400,
//             width: '260',
//             autoPlay: true,
//             autoHeight: false,
//             direction: 'horizontal',
//             loop: false,
//             slidesPerView: 1,
//             centeredSlides: true,
//             breakpointsInverse: false,
//             roundLengths: false,
//             breakpoints: {
//                 320: {
//                     spaceBetween: 20,
//                 },
//                 360: {
//                     spaceBetween: 40
//                 }
//             },
//             on: {
//                 init: function () {
//                 },
//             }
//         });
//         // photoTicketSlider.translateTo(0, 1, true);
//     }
//
//     // var init = function () {
//     //     front.event = btnHeartClick();
//     //     front.slider = photoSlider();
//     // };
//
//     front.event = btnHeartClick();
//     front.slider = photoSlider();
//
//     // return {
//     //     init: init,
//     // };
// })(jQuery);

var front = {
    event : {},
    slider : {},
};
(function (jQuery) {
    // console.log(jQuery)
    var photoTicket = {
        btnHeartClick: function () {
            jQuery('._btnHeart').on('click', function () {
                jQuery(this).hasClass('active') ? jQuery(this).removeClass('active') : jQuery(this).addClass('active');
            });
            console.log('test')
        }
    }
    photoTicket.btnHeartClick();
}(jQuery))