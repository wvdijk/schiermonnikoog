// Haalt de laatstgemeten waterstand op Schiermonnikoog van de website van Rijkswaterstaat
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
		if (myObj) {
      var stand = myObj.H10[myObj.H10.length - 1].waarde;
      var tijd = myObj.H10[myObj.H10.length - 1].datumtijd;
			document.getElementById("getij").innerHTML = 'Waterstand: ' + stand + ' cm tov NAP, gemeten door Rijkswaterstaat om ' + tijd + ' uur';
      // hieronder bepalen we de hoogte van de div
      //var sea = document.getElementById('sea');
      var perc = stand * 0.2 + 50;
      sea.style.height = perc + '%';
		} else {
			console.log("Parsen is mislukt");
		}
  }
};
xmlhttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.rijkswaterstaat.nl/apps/geoservices/rwsnl/awd.php?mode=data&projecttype=waterstanden&category=1&loc=SCHI&net=LMW", true);
xmlhttp.send();
