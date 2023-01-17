/*
1. back to top script
2. magnific-popup
3. product-slider
4. testimonial-slider
5. featured-slider
6. For Expired Timer
7. video-popup
8. service hover js
9. client-logos-slider
10. testimonial-boxes
11. animation wow
12. newsletter form email validation
13. website loader js
14. fat-nav js
*/

jQuery(function() {

    /*===================================================================================*/
    /*  back to top script
    /*===================================================================================*/
    var offset = 500;
    var back_top = jQuery('.skip_swing');
    jQuery(window).on('scroll', function() {
        (jQuery(this).scrollTop() > offset) ? back_top.addClass('show_icon') :  back_top.removeClass('show_icon');
    });

    jQuery('a.skip_swing').on('click', function() {
        var Lochref = jQuery(this).attr('href');
        jQuery("html, body").stop().animate({
            scrollTop: jQuery(Lochref).offset().top
        }, 1500);
        return false;
    });

    /*===================================================================================*/
    /*  magnific-popup
    /*===================================================================================*/
    if (jQuery('.popup-link').length > 0) {
        jQuery('.popup-link').magnificPopup({
            type: 'image',
            preloader: true,
            mainClass: 'mfp-fade',
            preload: [1,3],
            gallery:{
                enabled:true
            },
            // false loop when lightbox goes to last item
            callbacks: {
                open: function() {
                    var mfp = $.magnificPopup.instance;
                    var proto = $.magnificPopup.proto;

                    // extend function that moves to next item
                    mfp.next = function() {
                        // if index is not last, call parent method
                        if(mfp.index < mfp.items.length - 1) {
                            proto.next.call(mfp);
                        } else {
                           // otherwise do whatever you want, e.g. hide "next" arrow
                        }
                    };

                    // same with prev method
                    mfp.prev = function() {
                        if(mfp.index > 0) {
                            proto.prev.call(mfp);
                        }
                    };
                }
            }
        });
    }

    /*===================================================================================*/
    /*  product-slider
    /*===================================================================================*/
    if (jQuery('.product-slider').length > 0) {
        jQuery(".product-slider").owlCarousel({
            items: 1, // The number of items you want to see on the screen.
            margin: 24, //margin-right(px) on item.
            loop: true, //Infinity loop. Duplicate last and first items to get loop illusion.
            autoplay: false, //Autoplay true or false
            mouseDrag: true, // Mouse drag enabled.
            touchDrag: true, // Touch drag enabled.
            navText: ['<i class="fas fa-angle-left"></i>','<i class="fas fa-angle-right"></i>'], // HTML allowed.
            nav: false, // Show next/prev buttons.
            dotsEach: false, //Show dots each x item.
            smartSpeed: 350, // slide speed
            dots: true, //Show dots navigation.
            lazyLoad:true,
            responsive: {
                0:{
                    items: 1
                },
                480:{
                    items: 2
                },
                767:{
                    items: 3
                },
                992:{
                    items: 4
                }
            }
        });
    }

    /*===================================================================================*/
    /*  testimonial-slider
    /*===================================================================================*/
    if (jQuery('.testimonial-slider').length > 0) {
        jQuery(".testimonial-slider").owlCarousel({
            items:1, // The number of items you want to see on the screen.
            margin: 0, //margin-right(px) on item.
            loop: false, //Infinity loop. Duplicate last and first items to get loop illusion.
            autoplay: false, //Autoplay true or false
            mouseDrag: true, // Mouse drag enabled.
            touchDrag: true, // Touch drag enabled.
            navText: [''], // HTML allowed.
            nav: false, // Show next/prev buttons.
            dotsEach: false, //Show dots each x item.
            dots: true, //Show dots navigation.
            smartSpeed: 750 // slide speed
        });
    }

    /*===================================================================================*/
    /*  featured-slider
    /*===================================================================================*/
    if (jQuery('.featured-slider').length > 0) {
        jQuery(".featured-slider").owlCarousel({
            items:1, // The number of items you want to see on the screen.
            margin: 0, //margin-right(px) on item.
            loop: false, //Infinity loop. Duplicate last and first items to get loop illusion.
            autoplay: false, //Autoplay true or false
            mouseDrag: true, // Mouse drag enabled.
            touchDrag: true, // Touch drag enabled.
            navText: [''], // HTML allowed.
            nav: false, // Show next/prev buttons.
            dotsEach: false, //Show dots each x item.
            dots: true, //Show dots navigation.
            smartSpeed: 750 // slide speed
        });
    }

    /*===================================================================================*/
    /*  For Expired Timer
    /*===================================================================================*/
    // clock - index1.html
    if (jQuery('#clock').length > 0) {
        var expireDate = jQuery('#clock').attr('data-date');
        if(expireDate) {
            var expireDateVal = expireDate;
        } else {
            const currentDate = new Date();
            var currentMonth = currentDate.getMonth() + 1;
            var currentDay = currentDate.getDate();
            var currentYear = currentDate.getFullYear();
            var expireDateVal = currentMonth + ' ' + currentDay + ', ' + currentYear + ' ' + '23:59:59';
        }
        var exp_date = expireDateVal;
        timer("clock", exp_date);
    }

    function timer(clockID, exp_date) {
        // Set the date we're counting down to
        var countDownDate = new Date(exp_date).getTime();

        // Update the count down every 1 second
        var x = setInterval(function() {
            // Get today's date and time
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            //add a zero (0) if value less then 9
            var days    = ( days < 10 ) ? '0' + days : days;
            var hours   = ( hours < 10 ) ? '0' + hours : hours;
            var minutes = ( minutes < 10 ) ? '0' + minutes : minutes;
            var seconds = ( seconds < 10 ) ? '0' + seconds : seconds;

            // Output the result in an element with id="demo"
            document.getElementById("days").innerHTML = days;
            document.getElementById("hours").innerHTML = hours;
            document.getElementById("mins").innerHTML = minutes;
            document.getElementById("secs").innerHTML = seconds;

            // If the count down is over, write some text
            if (distance < 0) {
                clearInterval(x);
                document.getElementById(clockID).innerHTML = "EXPIRED";
            }
        }, 1000);
    }

    /*===================================================================================*/
    /*  video-popup
    /*===================================================================================*/
    if (jQuery('.video-button').length > 0) {
        jQuery(".video-button").modalVideo({
            youtube:{
                autoplay: 1,
                controls: 1
            },
            ratio:'16:9'
        });
    }

    /*===================================================================================*/
    /*  service hover js
    /*===================================================================================*/
    jQuery(document).ready(function(){
        jQuery(".service-hover").on({
            mouseenter: function(){
                jQuery(this).find(".service-cont-wrap p").slideDown(500);
            },
            mouseleave: function(){
                jQuery(this).find(".service-cont-wrap p").slideUp(500);
            }
        });
    });

    /*===================================================================================*/
    /*  client-logos-slider
    /*===================================================================================*/
    if (jQuery('.client-logos-slider').length > 0) {
        jQuery(".client-logos-slider").owlCarousel({
            items: 5, // The number of items you want to see on the screen.
            margin: 15, //margin-right(px) on item.
            loop: true, //Infinity loop. Duplicate last and first items to get loop illusion.
            autoplay: false, //Autoplay true or false
            mouseDrag: true, // Mouse drag enabled.
            touchDrag: true, // Touch drag enabled.
            navText: [''], // HTML allowed.
            nav: false, // Show next/prev buttons.
            dotsEach: false, //Show dots each x item.
            smartSpeed: 750, // slide speed
            dots: false, //Show dots navigation.
            lazyLoad:true,
            responsive: {
                0:{
                    items: 2
                },480:{
                    items: 3
                },767:{
                    items: 4
                },991:{
                    items: 5
                }
            }
        });
    }

    /*===================================================================================*/
    /*  testimonial-boxes
    /*===================================================================================*/
    if (jQuery('.testimonial-boxes').length > 0) {
        jQuery(".testimonial-boxes").owlCarousel({
            items: 3, // The number of items you want to see on the screen.
            margin: 30, //margin-right(px) on item.
            loop: false, //Infinity loop. Duplicate last and first items to get loop illusion.
            autoplay: false, //Autoplay true or false
            mouseDrag: true, // Mouse drag enabled.
            touchDrag: true, // Touch drag enabled.
            navText: ['<i class="fas fa-angle-left"></i>','<i class="fas fa-angle-right"></i>'], // HTML allowed.
            nav: true, // Show next/prev buttons.
            dotsEach: false, //Show dots each x item.
            smartSpeed: 750, // slide speed
            dots: false, //Show dots navigation.
            lazyLoad:true,
            responsive: {
                0:{
                    items: 1
                },580:{
                    items: 2
                },991:{
                    items: 3
                }
            }
        });
    }

    /*===================================================================================*/
    /*  animation wow
    /*===================================================================================*/
    if (jQuery('.wow').length > 0) {
        jQuery(function(){
            var wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: true,
                live: true,
                scrollContainer: null,
            });
            wow.init();
        });
    }

    /*===================================================================================*/
    /*  newsletter form email validation
    /*===================================================================================*/
    jQuery('.newsletter-field form').on('submit', function() {
        var nlField = jQuery('.newsletter-field input[type="email"]');
        var expEmail = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[_a-z0-9-]+(\.[_a-z0-9-]+)*(\.[a-z]{2,4})$/;
        if ( nlField.val() == '' || expEmail.test( nlField.val() ) != true ) {
            jQuery(this).next().html('<div class="alert alert-success alert-dismissible mt-10"><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> Please enter correct email address!</div>');
            return false;
        } else {
            return;
        }
    });

});

jQuery(window).on('load', function() {

    /*===================================================================================*/
    /*  website loader js
    /*===================================================================================*/
    setTimeout(function(){
        jQuery('.loading-pre-con').fadeOut('slow');
    }, 500);

});

jQuery(document).ready(function() {

    /*===================================================================================*/
    /*  fat-nav js
    /*===================================================================================*/
    if (jQuery('.fat-nav').length > 0) {
        (function() { jQuery.fatNav(); }());
        var fatContent = jQuery( '.main-menu ul').html();
        var fatNav = '<div class="fat-nav__wrapper" id="fatmenu"><ul>' + fatContent + '</ul></div>';
        jQuery( '.fat-nav' ).html( fatNav );
        jQuery('#fatmenu ul li.menu-item-has-children').append("<span class='toggle_button'><small></small></span>");
        jQuery('#fatmenu ul ul').hide();
        jQuery('ul li.menu-item-has-children > .toggle_button').on("click", function(){
            if(jQuery(this).parent().children('ul').hasClass('submenu') ) {
                jQuery(this).parent().children('ul').removeClass("submenu").slideUp(400);
                jQuery(this).removeClass( 'active_item' );
            }
            else{
                jQuery(this).parent().children('ul').addClass("submenu").slideDown(400);
                jQuery(this).addClass( 'active_item' );
            }
        });
    }

    jQuery('.main-menu ul li ul').parent('li').addClass('menuarrow');

});

jQuery(window).on('resize', function(){
    var win_width = jQuery(window).width();
    if (win_width > 845) {
        jQuery('.fat-nav').removeClass('active').css("display", "none");
        jQuery('.hamburger').removeClass('active');
    }
});