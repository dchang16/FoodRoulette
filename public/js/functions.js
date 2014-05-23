var loc={
    lat: 0,
    lng: 0,
};

var deviceDimensions = {
    width : $(window).width(),
    height : $(window).height()
};

var map;

var foodRoulette = {
    getLocation: function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
            loc = {
                lat:position.coords.latitude,
                lng:position.coords.longitude
            };
            $("#dice").on("click", function() {
                foodRoulette.findRestaurant(loc);
            })
        })
        
    },

    initialize: function() {
        var mainHeight = deviceDimensions.height - 55;
        document.getElementsByClassName('greenbg')[0].style.height = mainHeight + 'px';
        document.getElementById('rmap').style.width=""+deviceDimensions.width-5+"px";
        map = new google.maps.Map(document.getElementById('rmap'), {
            center: loc,
            zoom: 15
        });
    },

    findRestaurant: function(loc) {
        var randomRadius = Math.floor(Math.random() * 500) + 1000;
        var request = {
            location: loc,
            radius: '' + randomRadius,
            openNow : 'true',
            types: ['restaurant']
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, this.callback);
    },

    callback: function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            var rand = Math.floor(Math.random() * results.length);
            foodRoulette.clearElements();
            foodRoulette.showResult(results[rand]);
        }
    },

    createMarker: function(place) {
        var placeLoc = place.geometry.location;
        map = new google.maps.Map(document.getElementById('rmap'), {
            center: placeLoc,
            zoom: 15
        });
        var marker = new google.maps.Marker( {
            map: map,
            position: place.geometry.location
        })
    },

    showResult: function(place) {
        console.log(place);
        var price = ''
        var rating = Math.round(place.rating);
        if (place.price_level == 1) {
            price = '$';
        }
        else if (place.price_level == 2) {
            price = '$$';
        }
        else if (place.price_level == 3) {
            price = '$$$';
        }
        else if (place.price_level == 4) {
            price = '$$$$';
        }
        $("#rname").html(place.name);
        for(var i = 0; i < rating; i++) {
            var star = document.createElement("img");
            star.src="img/star.png";
            star.style.width="15px";
            document.getElementById("rrating").appendChild(star);
        }
        $("#rprice").html(price);
        $("#rdetails").html(place.vicinity);
        $("#restaurant").fadeIn(1000);
        foodRoulette.createMarker(place);

    },

    clearElements: function() {
        var elem = document.getElementById("rrating");
        while(elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }
    },

    init:jQuery(function($) {
        foodRoulette.initialize();
    	foodRoulette.getLocation();
    })
}

