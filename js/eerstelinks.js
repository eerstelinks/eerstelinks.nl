// let the beautiful developers know about this
function updateOurTeam() {

    var data = { progress: 'update-team', error: 'there is no hash' };

    if ($('input[name="hash"]').length > 0) {
        data = { progress: 'update-team', hash: $('input[name="hash"]').val() };
    }

    $.ajax({
        type: 'POST',
        url: apiURL + "post/signup",
        data: data,
        dataType: 'json'
    });
}

$('[class*="hide-btn"]').live('click', function() {
    $('[class*="-show-btn"]').removeClass('active');
    $('.extra-info').slideUp();
});

$('[class*="-show-btn"]').live('click', function() {

    $('[class*="-show-btn"]').removeClass('active');
    var classNames = $(this).attr('class');

    var aClasses = new Array();
    aClasses = classNames.split(" ");

    for (var i = 0; i < aClasses.length; i++) {
        var extraElement = aClasses[i].substr(0, aClasses[i].indexOf('-show-btn'));
        if (extraElement != '') {
            var doShow = extraElement;
        }
    }

    if (typeof(doShow) != 'undefined') {


        if ($('.extra-info').is(':visible')) {
            if ($('.' + doShow).is(':visible')) {
                $('.' + doShow).animate({ opacity: 0.5 }, 200);
                $('.' + doShow).animate({ opacity: 1 }, 300);
            }
            else {
                $('.extra-info:visible').slideUp(200, function () {
                    $('.' + doShow + '-show-btn').addClass('active');
                    $('.' + doShow).slideDown();
                });
            }
        }
        else {
            $('.' + doShow + '-show-btn').addClass('active');
            $('.' + doShow).slideDown();
        }
    }
});

$('[class*="info-show"]').live('click', function() {
    var namePlatform = $(this).attr('id');

    $('[class*="info-show"]').removeClass('active');
    $('.info-iconset').hide();
    $('.' + namePlatform + '-info').slideDown();
});

// if a user decides to skip the extra-info-step he needs to go to the thank-you message
$('body').on('click', '.skipstep', function() {
    updateOurTeam();
    $('.extrainfo').hide();
    $('.thank-you').show();

    // update the sexie height
    placeSexies();
});

$('form.signup').submit(function() {
    var form = $(this);
    var button = $(this).find('input[type="submit"]');

    button.attr('disabled', 'disabled');

    $.ajax({
        type: 'POST',
        url: apiURL + "post/signup",
        data: form.serialize(),
        dataType: 'json'
    })
    .fail(function(json) {
        button.removeAttr('disabled');
        form.find('div.alert').showMessage(lang.error_messages.signup_failure);
    })
    .done(function(json) {
        button.removeAttr('disabled');

        if (json.status == 'success') {

            // hide alert when success form submit
            form.find('div.alert').showMessage();

            if (form.find('input[name="progress"]').length > 0) {

                // show elements in div.extrainfo, hide div.userinfo
                var progress = form.find('input[name="progress"]').val();
                if (progress == 'userinfo') {

                    // update progress value to extrainfo
                    form.find('input[name="progress"]').val('extrainfo');

                    // show hide elements
                    $('.intro').hide();
                    $('.userinfo').hide();
                    $('.extrainfo').show();
                }
                else if (progress == 'savetempsite') {

                    form.find('input[name="progress"]').val('extrainfo');
                    $('.intro').hide();
                    $('.savetempsite').hide();
                    $('.extrainfo').show();
                }
                else if (progress == 'extrainfo') {

                    // form is filled in correctly, send user to next step
                    updateOurTeam();
                    $('.extrainfo').hide();
                    $('.thank-you').show();
                }

            }
            else {
                form.find('div.alert').showMessage(lang.signup.signup_success);
            }

            // update the sexy height
            placeSexies();

        }
        else {
            form.find('div.alert').showMessage(json.message);
        }
    })
    return false;
});


if ($('.fancybox-media').length > 0) {
    $('.fancybox-media')
        .attr('rel', 'media-gallery')
        .fancybox({
            openEffect : 'none',
            closeEffect : 'none',
            prevEffect : 'none',
            nextEffect : 'none',

            arrows : false,
            helpers : {
                media : {},
                buttons : {}
            }
    });
}

// welkom page
$('.show-next-select').click(function() {
    var editLink = $(this);
    editLink.closest('.controls').find('p').hide();
    editLink.closest('.controls').find('select').show();
});

//Switch between maand- en jaarpakketten
$('.select-jaarpakketten').live('click', function() {
    $('.prijsmaand').hide();
    $('.select-maandpakketten').removeClass('active');
    $('.prijsjaar').show();
    $('.select-jaarpakketten').addClass('active');
    $('input[name="payment"]').val('year');
});

$('.select-maandpakketten').live('click', function() {
    $('.prijsjaar').hide();
    $('.select-jaarpakketten').removeClass('active');
    $('.prijsmaand').show();
    $('.select-maandpakketten').addClass('active');
    $('input[name="payment"]').val('month');
});

//Show password on welkom-page
$('input[name="show-password"]').live('change',function() {
    if(this.checked) {
        $('input[name="password"]').prop('type','text');
    }
    else {
        $('input[name="password"]').prop('type','password');
    }
});

//Show payment info only when package is chosen
function showHidePayment() {
    if ($('select[name="package"] option:selected').val() == 'choose-later') {
        $('.payment-row').hide();
    }
    else {
        $('.payment-row').show();
    }
}

showHidePayment();

$('select[name="package"]').change(function() {
    showHidePayment();
});


// loader for the starting page
$.fn.spin = function(opts) {
    this.each(function() {
        var $this = $(this),
            data = $this.data();

        if (data.spinner) {
            data.spinner.stop();
            delete data.spinner;
        }
        if (opts !== false) {
            data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
        }
    });
    return this;
};

var opts = {
    lines: 17, // The number of lines to draw
    length: 30, // The length of each line
    width: 10, // The line thickness
    radius: 40, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    color: '#F63', // #rgb or #rrggbb
    speed: 0.8, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 20, // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
};

$('.spin-large').spin(opts);
