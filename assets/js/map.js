$(window).load(function() {
  var locations = [
      ['Historic Eureka Inn<br>127 W Main St<br>Jonesborough, TN 37659<br>Phone: <a href="tel:+14239136100">(423) 913-6100</a><br><strong><a href="https://www.google.com/maps/dir//Historic+Eureka+Inn,+127+W+Main+St,+Jonesborough,+TN+37659/@36.2934513,-82.4771637,17.24z/data=!4m12!1m3!3m2!1s0x0:0xa4d32db68927daed!2sHistoric+Eureka+Inn!4m7!1m0!1m5!1m1!1s0x885a63fd91ed1ca5:0xa4d32db68927daed!2m2!1d-82.4746777!2d36.2935356">Get Directions</a></strong>', 36.2935356, -82.4746777, 1]
  ];

  var map = new google.maps.Map(document.getElementById('map-contact'), {
      zoom: 15,
      center: new google.maps.LatLng(36.2935, -82.4746777),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      scrollwheel: false,
      styles: [{
          "featureType": "all",
          "elementType": "all",
          "stylers": [{
              "visibility": "simplified"
          }, {
              "saturation": "-100"
          }, {
              "gamma": "10.00"
          }]
      }, {
          "featureType": "all",
          "elementType": "geometry",
          "stylers": [{
              "color": "#324C3A"
          }]
      }, {
          "featureType": "all",
          "elementType": "geometry.fill",
          "stylers": [{
              "lightness": "-200"
          }, {
              "gamma": "2.14"
          }, {
              "saturation": "-100"
          }]
      }, {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [{
              "gamma": 0.01
          }, {
              "lightness": 50
          }]
      }, {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [{
              "saturation": -100
          }, {
              "lightness": -33
          }, {
              "weight": 2
          }, {
              "gamma": 0.8
          }]
      }, {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [{
              "visibility": "off"
          }]
      }, {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [{
              "lightness": 30
          }, {
              "saturation": 0
          }]
      }, {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{
              "saturation": 0
          }]
      }, {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [{
              "lightness": 20
          }, {
              "saturation": 0
          }]
      }, {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{
              "lightness": 10
          }, {
              "saturation": 0
          }]
      }, {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [{
              "saturation": 0
          }, {
              "lightness": 25
          }]
      }, {
          "featureType": "water",
          "elementType": "all",
          "stylers": [{
              "lightness": -20
          }]
      }]
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
});
