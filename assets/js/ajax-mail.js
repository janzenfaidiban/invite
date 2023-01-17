/*---------------------------------
   Contact Form ajax email send
---------------------------------*/
(function($) {
    'use strict';

    //  Regular Expressions
    var expEmail = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[_a-z0-9-]+(\.[_a-z0-9-]+)*(\.[a-z]{2,4})$/;
    var expLettersOnly = /^[A-Za-z ]+$/;
    var phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    var numberPattern =  /^[0-9]+$/;

    //  Validates the fileds
    function validateField ( field ) {
        var errorText = "",
            error = false,
            value = field.val(),
            siblings = field.siblings(".alert-error");

        // Test the name field minium length geter then 2 and number check
        if ( field.attr("name") === "name" ) {
            if ( !validateLength( value, 2 ) ) {
                error = true;
                errorText += '<i class="fa fa-info-circle"></i> The name is too short!<br>';
                jQuery('input[name="name"]').addClass('input-error');
            } else {
                jQuery('input[name="name"]').removeClass('input-error');
            }
            if ( !expLettersOnly.test( value ) ) {
                error = true;
                errorText += '<i class="fa fa-info-circle"></i> The name can contain only letters and spaces!<br>';
                jQuery('input[name="name"]').addClass('input-error-2');
            } else {
                jQuery('input[name="name"]').removeClass('input-error-2');
            }
        }

        // Test the email field
        if ( field.attr("name") === "email" ) {
            if ( !expEmail.test( value ) ) {
                error = true;
                errorText += '<i class="fa fa-info-circle"></i> Enter correct email address!<br>';
                jQuery('input[name="email"]').addClass('input-error');
            } else {
                jQuery('input[name="email"]').removeClass('input-error');
            }
        }

        // Test the name field minium length geter then 2 and number check
        if ( field.attr("name") === "phone" ) {
            if ( !phonePattern.test(value)) {
                error = true;
                errorText += '<i class="fa fa-info-circle"></i> Enter correct Phone Number!<br>';
                jQuery('input[name="phone"]').addClass('input-error');
            } else {
                jQuery('input[name="phone"]').removeClass('input-error');
            }
        }

        // Test the name field minium length geter then 1 and number check
        if ( field.attr("name") === "number" ) {

            if ( !numberPattern.test(value)) {
                error = true;
                errorText += '<i class="fa fa-info-circle"></i> Enter much be Numeric Number!<br>';
                jQuery('input[name="number"]').addClass('input-error');
            } else {
                jQuery('input[name="number"]').removeClass('input-error');
            }

            if ( !validateLength( value, 0 ) ) {
                error = true;
                errorText += '<i class="fa fa-info-circle"></i> Enter minium one Numeric Number!<br>';
                jQuery('input[name="number"]').addClass('input-error');
            } else {
                jQuery('input[name="number"]').removeClass('input-error');
            }

        }

        if (field.attr("name")==="message") {
            if (!validateLength(value,10)) {
                error = true;
                errorText += '<i class="fa fa-info-circle"></i> Enter correct Message Most 9 charectcher!<br>';
                jQuery('textarea[name="message"]').addClass('input-error');
            }else {
                jQuery('textarea[name="message"]').removeClass('input-error');
            }
        }

        // Display the errors
        siblings.html(errorText);
    }

    //  Checks if a field has the correct length
    function validateLength ( fieldValue, minLength ) {
        return ( jQuery.trim( fieldValue ).length > minLength );
    }

    //  Validate form When type in input field
    jQuery( '.contact-form' ).on( 'keyup', 'input.required', function() {
        validateField( jQuery(this) );
    });

    //  Validate form When type in input field
    jQuery( '.contact-form' ).on( 'keyup', 'textarea.required', function() {
        validateField( jQuery(this) );
    });


    //  AJAX call
    jQuery('.contact-form').on('submit', function(e) {
        e.preventDefault();

        //call the check input valid or not
        jQuery('.contact-form input.required, .contact-form textarea.required').each(function( index, el ) {
            validateField( jQuery(this) );
        });

        // check if has class any error-class into the field
        if ( jQuery('.contact-form input, .contact-form textarea').hasClass('input-error') || jQuery('.contact-form input, .contact-form textarea').hasClass('input-error-2') ) {
            return false;
        }

        var $this = jQuery( this ), action = $this.attr( 'action' );
        jQuery('body').find('.contact-message').html('<div class="loading-bar"></div>');

        // The AJAX requrest
        jQuery.ajax({
            type: 'POST',
            url: action,
            data: $this.serialize(),
            success: function( data ) {
                if (data) {
                    jQuery('body').find('.contact-message').html('<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>'+ data +'</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div> ');
                }

                // reset all field value
                jQuery(".contact-form")[0].reset();
            },
            error: function( data ) {
                if (data.responseText !== '') {
                    jQuery('body').find('.contact-message').html('<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Error:</strong> '+ data.responseText +'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div> ');
                } else {
                   jQuery('body').find('.contact-message').html('<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Error:</strong> Oops! An error occured and your message could not be sent. <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div> ');
                }
            }
        });
    });

})(jQuery);