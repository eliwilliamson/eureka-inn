// UTILS
// -------------------------------------------------
var htmlMap = {"&": "&amp;","<": "&lt;",">": "&gt;",'"': '&quot;',"'": '&#39;',"/": '&#x2F;'};

function toJsonFormat(str) {
  str = str.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
  str= str.replace(/:(?!true|false)([a-zA-Z]+)/g, ':"$1"');
  str = str.replace(/'/g, '"');
  return str;
}
function jsonify(str) {
  str = toJsonFormat(str);
  return jQuery.parseJSON(str);
}
function escapeHtml(string) {
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return htmlMap[s];
  });
}
function cycleForward(index, total) {
  var i = index + 1;
  i = (i >= total)? 0 : i;
  return i;
}
function cycleBack(index, total) {
  var i = index - 1;
  i = (i < 0)? total - 1 : i;
  return i;
}
function invert(v, a, b) {
  return (v == a)? b : a;
}
function getDocType() {
 var node = document.doctype;
 return node ? "<!DOCTYPE "
           + node.name
           + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '')
           + (!node.publicId && node.systemId ? ' SYSTEM' : '')
           + (node.systemId ? ' "' + node.systemId + '"' : '')
           + '>\n' : '';
}

function getNodeIndex(parent, child) {
  return Array.prototype.indexOf.call(parent.childNodes, child);
}

function isSmallScreen() {
  return $(window).width() < 768
}

$.fn.insertIndex = function (i) {
    // The element we want to swap with
    var $target = this.parent().children().eq(i);

    // Determine the direction of the appended index so we know what side to place it on
    if (this.index() > i) {
        $target.before(this);
    } else {
        $target.after(this);
    }

    return this;
};

function showPageLoader() {
  $('.page-loader').show();
  $('.page-loader .anim').show();
}
function hidePageLoader() {
  $('.page-loader .anim').fadeOut();
  $('.page-loader').delay(350).fadeOut();
}

// HERO
// ---------------------------------
$('#arc-top').arctext({radius: 100});
$('#arc-bottom').arctext({radius: 100, dir: -1});

// NAV
// ---------------------------------
var nav = {};

nav.normal = {};
nav.normal.init = function(navbar) {
  // Nothing much to do here..hehe
  navbar.data("initialized", true);
  nav.active = nav.normal;
};

nav.sticky = {};
nav.sticky.init = function(navbar) {

  nav.sticky.triggerEl = navbar.data("trigger")? $(navbar.data("trigger")) : navbar;
  nav.sticky.triggerH = nav.sticky.triggerEl.height();
  nav.sticky.navbar = navbar;
  nav.sticky.scrollOffset = - navbar.outerHeight();
  nav.sticky.spyOffset = navbar.outerHeight() + 1;

  $('body').scrollspy({
     offset: nav.sticky.spyOffset
  });

  nav.sticky.autoToggle = function(){
    if ($(window).scrollTop() > nav.sticky.triggerH) {
      navbar.removeClass(navbar.attr("data-del")).addClass(navbar.attr("data-add"));
    } else {
      navbar.removeClass(navbar.attr("data-add")).addClass(navbar.attr("data-del"));
    }
  }

  nav.sticky.autoToggle();

  $(window).scroll(function() {
    nav.sticky.autoToggle();
  });

  navbar.data("initialized", true);
  nav.active = nav.sticky;
  nav.offset = nav.sticky.scrollOffset;
}


function setupNav(target) {
  if(target.length > 0) nav[target.data().navbar].init(target);
}

// WIN LOAD
// ------------------------------------------
$(window).load(function() {
  hidePageLoader();


  /**
  * Self calling functionality
  * --------------------------------------------------------------------------------------- */
  var bxSliders = [];

  function callBxSlider() {
   $('[data-call="bxslider"][data-bxinit="false"]').each(function(index) {
      var slider = $(this).bxSlider();
      var i = bxSliders.push(slider) - 1;
      slider.attr("bxindex", i);
   });
  }

  callBxSlider();
})

// DOC READY
// ------------------------------------------
$().ready(function() {

  // IMAGE BOX
  // ----------------------------------------
  $("[data-swipebox='true']").swipebox();

  // NAV
  // ----------------------------------------
  setupNav($("[data-navbar]"));

  // TOOLTIPPS
  // ----------------------------------------
  $("[data-show='tooltip']").tooltip();

  // NAV TOGGLE LINKS
  // ----------------------------------------
  $("body").on("click", "[data-toggle-nav]", function(e) {
    e.preventDefault();
    var target  = $(this).attr("data-toggle-nav"),
        menuBtn = $(".navbar-toggle-link");
    if(target) {
      $(target).toggleClass("hide-nav");
      $(menuBtn).toggleClass("show-close");
    }
  });

  $("body").on('click', '[data-toggle="collapse"]', function (e) {
    $(this).toggleClass("show-close");
  });

  // SCROLLER
  // ----------------------------------------
  $("body").on("click", "[data-scroll='true']", function(e) {
    e.preventDefault();
    e.stopPropagation();

    var target = $(this).attr("href");
    if($(target).length > 0 ) {
      $.scrollTo(target, 500, {offset:nav.active.scrollOffset});
    } else {
      //alert("The link [" + target + "] cannot be found!\n\nMake sure your links are pointing to the correct blocks")
    }
  });


  // CONTACT FORM
  // ----------------------------------------
  function sendMessage(formData) {
    $.ajax({
        type: "POST",
        url: "email.php",
        data: formData,
        success : function(text){
          $("#contact-form .alert").fadeOut();
          $("#contact-form .alert-sent").removeClass("hidden").fadeIn();
          $("#contact-form")[0].reset();
        },
        error : function(error) {
          console.log(error);
          $("#contact-form .alert").fadeOut();
          $("#contact-form .alert-failed").removeClass("hidden").fadeIn();
        }
    });
  }

  $("#contact-form").validator().on("submit", function(e) {

    if(e.isDefaultPrevented()) {
      // do something
    } else {
      e.preventDefault();
      var data = $("#contact-form").serialize();
      console.log(data);
      sendMessage(data);
    }

  });

});

function scrollPage(target) {
  if(target) $.scrollTo(target, 500, {offset: nav.offset || 0});
}

// CONTACT MAP
// ----------------------------------------

$(window).load(function () {
  if ($('#contact-info')) {
    var locations = [
      ['Historic Eureka Inn<br>127 W Main St<br>Jonesborough, TN 37659<br>Phone: <a href="tel:+14239136100">(423) 913-6100</a><br><strong><a href="https://www.google.com/maps/dir//Historic+Eureka+Inn,+127+W+Main+St,+Jonesborough,+TN+37659/@36.2934513,-82.4771637,17.24z/data=!4m12!1m3!3m2!1s0x0:0xa4d32db68927daed!2sHistoric+Eureka+Inn!4m7!1m0!1m5!1m1!1s0x885a63fd91ed1ca5:0xa4d32db68927daed!2m2!1d-82.4746777!2d36.2935356">Get Directions</a></strong>', 36.2935356, -82.4746777, 1]
    ];

    var map = new google.maps.Map(document.getElementById('map-contact'), {
      zoom: 15,
      center: new google.maps.LatLng(36.2935, -82.4746777),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      scrollwheel: false,
      styles: [
      {
          "featureType": "all",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "saturation": "-100"
              },
              {
                  "gamma": "10.00"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#324C3A"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "lightness": "-200"
              },
              {
                  "gamma": "2.14"
              },
              {
                  "saturation": "-100"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "gamma": 0.01
              },
              {
                  "lightness": 50
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": -33
              },
              {
                  "weight": 2
              },
              {
                  "gamma": 0.8
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
              {
                  "lightness": 30
              },
              {
                  "saturation": 0
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
              {
                  "saturation": 0
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
              {
                  "lightness": 20
              },
              {
                  "saturation": 0
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
              {
                  "lightness": 10
              },
              {
                  "saturation": 0
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "saturation": 0
              },
              {
                  "lightness": 25
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "lightness": -20
              }
          ]
      }
  ]
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        icon: '/images/pin.png'
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  }
});
