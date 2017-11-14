// global variables
var lat;
var lng;

/* 
function currLocation() {
    // get geolocation if get location button is clicked
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      currLat = position.coords.latitude;
      currLng = position.coords.longitude;

      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
      
    map.setZoom(12);
  } 
  // error
  else {
    alert("something went wrong");
  }
}

*/

// convert address into lat and lng
function geocodeAddress() {
  var address = document.getElementById('address').value;
  var city = document.getElementById('city').value;
  var state = document.getElementById('state').value;

  console.log(address);

  var fullAddress = "";
  if (address != "") {
    fullAddress += address;
  }
  if (city != "") {
    fullAddress += (" " + city);
  }
  if (state != "") {
    fullAddress += (" " + state);
  }

  /* converts address into lat and lng */
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params:{
      address: fullAddress,
      key: 'AIzaSyDGqDvAOWXUKfNBwOPAFRvYIh8M1d3kDHI'
    }
  })
  .then(function(response) {
    lat = document.getElementById("lat").value = response.data.results[0].geometry.location.lat;
    lng = document.getElementById("lng").value = response.data.results[0].geometry.location.lng;
    
    console.log(lat);
    console.log(lng);

    // need this so that the function is completed before submitting the form
    $('#myform').submit();
  })
  .catch(function(error) {
    console.log(error);
    location.value = null;
  });
}

 
/*
function updateRange() {
  range = document.getElementById('range').value; 
}
*/


/*
function getMarkersInRadius() {

    //SOMETHING WRONG WITH THE URL. MAYBE ADD IN A NEW LINE OR SOMETHING
  downloadUrl("markers_within_radius_output_xml.php?radius=" + range + "&currLat=" + currLat + "&currLng=" + currLng, function(data) {
      
    var xml = data.responseXML;
    var markers = xml.documentElement.getElementsByTagName("marker");
    for (var i = 0; i < markers.length; i++) {
      var name = markers[i].getAttribute("name");
      var address = markers[i].getAttribute("address");
      var city = markers[i].getAttribute("city");
      var state = markers[i].getAttribute("state");
      var zip = markers[i].getAttribute("zip");
      var people = markers[i].getAttribute("people");
      var type = markers[i].getAttribute("type");
      var info = markers[i].getAttribute("info");
      var lat = markers[i].getAttribute("lat");
      var lng = markers[i].getAttribute("lng");

      var point = new google.maps.LatLng(
          parseFloat(markers[i].getAttribute("lat")),
          parseFloat(markers[i].getAttribute("lng")));

      var content = "<b>" + name + "</b> <br/>" + address + ", " + city +
                 ", " + state + " " + zip + " <br>" + "<br>Current number of ballers: " + 
                 people  + "<p>" + info + "</p>";
      
      addMarkerPoint( point, content );
  
    }
  });
}

*/
