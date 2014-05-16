var loc={
    lat: 0,
    lng: 0,
};

var foodRoulette = {
    getLocation: function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
            loc = {
                lat:position.coords.latitude,
                lng:position.coords.longitude
            };
            foodRoulette.initializeData(loc);
        })
        
    },

    initializeData: function(loc) {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: loc,
            zoom: 15
        });

        var request = {
            location: loc,
            radius: '500',
            types: ['restaurant']
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, this.callback);
    },

    callback: function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            console.log(results[i]);
            var place = results[i];
        }
      }
    },

    init:jQuery(function($) {
    	foodRoulette.getLocation();
    })
}

