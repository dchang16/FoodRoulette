var foodRoulette = {
	initialize: function() {
		var loc={};
		var geocoder = new google.maps.Geocoder();
		if(google.loader.ClientLocation) {
	        loc.lat = google.loader.ClientLocation.latitude;
	        loc.lng = google.loader.ClientLocation.longitude;
	        var latlng = new google.maps.LatLng(loc.lat, loc.lng);
	        geocoder.geocode({'latLng': latlng}, function(results, status) {
	            if(status == google.maps.GeocoderStatus.OK) {
	            	foodRoulette.initializeData(loc.lat, loc.lng);
	            };
	        });
		}
    },

    initializeData: function(l1, l2) {
    	$.ajax({
    		url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+l1+','+l2+'&radius=100&types=food',
    		dataType: 'jsonp',
    		success: function(data) {
    			console.log(data);
    		}
    	})
    },

    init:jQuery(function($) {
    	foodRoulette.initialize();
    	// foodRoulette.initializeData();
    })
}

// google.load("maps", "3.x", {other_params: "sensor=false", callback:initialize});