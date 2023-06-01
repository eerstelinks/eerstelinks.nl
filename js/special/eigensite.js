///////////////////////
//
//  THIS STYLE DOES SOME
//  COOL SHIT WITH OUR
//  OWN HOMEPAGE
//
///////////////////////

// Appends a buttongroup to the pricing-sexy
$('div.sexy#sexy_128 ul.row.inner').prepend('<div class="btn-group pricing"><a href="javascript:void(0)" id="monthly" class="btn active">Maandelijkse prijzen</a><a href="javascript:void(0)" id="yearly" class="btn">Jaarlijkse prijzen</a></div>');

$('li#2392').hide();
$('li#2393').hide();
$('li#2394').hide();

$('a#monthly').click(function () {
    $('a#yearly').removeClass('active');
    $('li#2392').hide();
    $('li#2393').hide();
    $('li#2394').hide();
    $('a#monthly').addClass('active');
    $('li#1909').show();
    $('li#1908').show();
    $('li#1647').show();
});

$('a#yearly').click(function () {
    $('a#monthly').removeClass('active');
    $('li#1909').hide();
    $('li#1908').hide();
    $('li#1647').hide();
    $('a#yearly').addClass('active');
    $('li#2392').show();
    $('li#2393').show();
    $('li#2394').show();
});

// color brandname orange
$('a.brand').html('<span class="eerstelinks-orange">eerste</span>links');
$('span.eerstelinks-orange').css('color', '#ff6600');

$('.use-fancybox').fancybox({
    type:      'iframe',
    maxWidth    : 800,
    maxHeight   : 700,
    fitToView   : true,
    width       : '80%',
    height      : '80%',
    autoSize    : false,
    closeClick  : false,
    openEffect  : 'none',
    closeEffect : 'none'
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
    width: 8, // The line thickness
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

if (typeof startNewSite != 'undefined') {

    setCookie('nextstep', 0);

    var loader = $('.spin-large');
    var form   = $('.creator');
    var timer  = new Date().getTime();

    $.ajax({
        type: 'POST',
        url: apiURL + "post/create-website",
        dataType: 'json'
    })
    .fail(function(json) {
        loader.hide();
        form.find('div.alert').showMessage('Oepsie, er klopt iets niet met je adres, mail ons');
    })
    .done(function(json) {
        if (json.status == 'success') {

            var waited = new Date().getTime() - timer;
            var wait   = 3 * 1000 - waited;

            if (wait < 0) {
                wait = 0;
            }

            setTimeout(function() {
                window.location = json.redirect;
            }, wait);
        }
        else if (json.message) {
            form.find('div.alert').showMessage(json.message);
        }
        else {
            form.find('div.alert').showMessage('Een website aanmaken is niet zomaar iets. Helaas is er iets mis gegaan en we gaan gelijk kijken wat er mis is!');
        }
    });
}