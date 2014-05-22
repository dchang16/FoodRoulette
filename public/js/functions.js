var loc={
    lat: 0,
    lng: 0,
};

var deviceDimensions = {
    width : $(window).width(),
    height : $(window).height()
};

var foodRoulette = {
    getLocation: function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
            loc = {
                lat:position.coords.latitude,
                lng:position.coords.longitude
            };
            foodRoulette.findRestaurant(loc);
        })
        
    },

    initialize: function() {
        var mainHeight = deviceDimensions.height - 55;
        document.getElementsByClassName('greenbg')[0].style.height = mainHeight + 'px';
    },

    findRestaurant: function(loc) {
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
            var rand = Math.floor(Math.random() * results.length);
            console.log(results[rand]);
        }
    },

    showResult: function(place) {

    },

    init:jQuery(function($) {
        foodRoulette.initialize();
    	foodRoulette.getLocation();
    })
}

