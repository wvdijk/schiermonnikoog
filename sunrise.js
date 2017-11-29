// Haalt informatie over zonsopkomst en zonsondergang op Schiermonnikoog op van sunrise-sunset.org
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
		if (myObj) {
      var state; // initiate var for state of sun
      var currenttime = getTimestring();
      // get sunrise etc from api
      var astra = myObj.results.astronomical_twilight_begin.substring(11,19);
      var nauta = myObj.results.nautical_twilight_begin.substring(11,19);
      var civa = myObj.results.civil_twilight_begin.substring(11,19);
      var sunrise = myObj.results.sunrise.substring(11,19);
      var sunset = myObj.results.sunset.substring(11,19);
      var civz = myObj.results.civil_twilight_begin.substring(11,19);
      var nautz = myObj.results.nautical_twilight_end.substring(11,19);
      var astrz = myObj.results.astronomical_twilight_end.substring(11,19);
      var arr = [currenttime, astra, nauta, civa, sunrise, sunset, civz, nautz, astrz];
      function findElem(elem) {
        return elem === currenttime;
      }
      var index = arr.findIndex(findElem);
      console.log(index);
      arr.sort(function(a,b){
        if (a < b) {
          return -1;
        } else if (a < b) {
          return 1;
        } else {
          return 0;
        }
      });
      console.log(index);
      /* compare current time to data
      if (astra > currenttime) {
          state = 'dark';
        } else if (astra < currenttime && nauta > currenttime) {
          state = 'astr';
        } else if (nauta < currenttime && civa > currenttime) {
          state = 'naut';
        } else if (civa < currenttime && sunrise > currenttime) {
          state = 'civ';
        } else if (sunrise < currenttime && sunset > currenttime) {
          state = 'sun';
        } else if (sunset < currenttime && civz > currenttime) {
          state = 'civ';
        } else if (civz < currenttime && nautz > currenttime) {
          state = 'naut';
        } else if (nautz < currenttime && astrz > currenttime) {
          state = 'astr';
        } else if (astrz < currenttime) {
          state = 'dark';
        } else {
          state = '';
        }
        // set value of opacity based on state
        var op = '';
        switch (state) {
  	       case 'dark':
  		       op = '0.95';
  		       break;
  	       case 'astr':
  		       op = '0.5';
  		       break;
  	       case 'naut':
  		       op = '0.3';
  		       break;
  	       case 'civ':
  		       op = '0.15';
  		       break;
  	       default:
  		       op = '0';
           } */
      // is the sun up yet?
      var flip = sunrise < currenttime && currenttime < sunset ? ' op.' : ' onder.';
			document.getElementById("sunrise").innerHTML = 'Zonsopkomst is om ' + sunrise + ' (UTC), en zonsondergang om ' + sunset +' (UTC.). En het is nu ' + currenttime + ' (UTC). De zon is dus '+ flip;
      // actually set opacity
      var j = document.getElementById('dusktilldawn');
      j.style.opacity = op;
    } else {
			console.log("Parsen is mislukt");
		}
    }
};
// make the actual api request
xmlhttp.open("GET", "https://api.sunrise-sunset.org/json?lat=53.472754&lng=6.196039&formatted=0", true); // latlng Veerhaven Schiermonnikoog
xmlhttp.send();

function getTimestring() { // get current UTC time in 24h format, add leading zero to ensure double digits. Used in comparisons above
  var now = new Date();
  var hh = now.getUTCHours().toString().length === 1 ? '0' + now.getUTCHours().toString(): now.getUTCHours().toString();
  var mm = now.getUTCMinutes().toString().length === 1 ? '0' + now.getUTCMinutes().toString() : now.getUTCMinutes().toString();
  var secs = now.getUTCSeconds().toString().length === 1 ? '0' + now.getUTCSeconds().toString() : now.getUTCSeconds().toString();
  var timeString = hh + ':' + mm + ':' + secs;
  return timeString;
}
