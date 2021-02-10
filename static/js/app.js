//Check if JS is properly connected
console.log('Ok connected 23 - app.js');
//Get jsonData
let jsonData = '/api/v1.0/teams'; //NEED TO FIX - TO GET FROM URL
let jsonStadiums='../Data/stadiums_nfl.json';
// let jsonData = '../Data/nflData.json'; //NEED TO FIX - TO GET FROM URL
// let jsonData = '../Data/TeamsData.json'; // (ref 1)
// let jsonData = '../Data/nfl_teams.json'; // (ref 2)
// let jsonStadiums='../Data/stadiums_nfl.json';

// Icon
let Icon = L.icon({
            iconUrl: '../images/logo1.png',
            shadowUrl: '../images/logo2.png',
            iconSize:     [30, 48], // size of the icon
            shadowSize:   [25, 20], // size of the shadow
            iconAnchor:   [16, 80], // point of the icon which will correspond to marker's location
            shadowAnchor: [12, 50],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

  // Create the tile layer that will be the background of our map
  let lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 20,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  let baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer
  /* let overlayMaps = {
    "NFL Stadiums": Stadiums
  }; */
    
  // Create the map object with options
  let map = L.map("map-id", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [lightmap]
  });

  let Markers= L.marker();

  let Stadiums =L.marker();

/**
 * Execute init functions
 */
function init(){
    fillDropdown();
    createMarkers();
}

/**
 * Get Team Names from JSON to fillout dropdown
 */
function fillDropdown(){
    d3.json(jsonData).then((data) => {
        console.log(data)
        let teams = data.data[0]; // para /api/v1.0/teams
        // let teams = data.data; // Para leer directo del Json (ref 1)
        // let teams = data; // Para leer directo del Json completo (ref 2)

        //Dropdowns
        //Dropdown Selected by Team
        d3.select("#selectedTeam").append("option").text('-Select Team-')
        for(x in teams){
            d3.select("#selectedTeam").append("option").text(teams[x].FullName);
        }

        //Dropdown Selected by Coach
        // d3.select("#selectedCoach").append("option").text('-Select Coach-')
        // for(x in teams){
        //     d3.select("#selectedCoach").append("option").text(teams[x].HeadCoach);
        // }
    });
}

/**
 * Get URL from JSON and dispplay in dashboard
 * @param {string} selectedTeam Team selected in dropdown
 */
function optionChanged(selectedTeam){
    console.log(`Selected Team: ${selectedTeam}`)
    d3.json(jsonData).then((data) => {
        console.log(data)
        let teams = data.data[0]; // para /api/v1.0/teams
        // let teams = data.data; // Para leer directo del Json
        // let teams = data; // Para leer directo del Json completo (ref 2)

        //Display image
        for(x in teams){
            //console.log(teams[x].Logo)
            if(selectedTeam==teams[x].FullName){
                //console.log(teams[x].Logo)
                d3.select('#teamLogo').attr('src',teams[x].WikipediaLogoUrl) // para /api/v1.0/teams
                d3.select('#teamLogoName').attr('src',teams[x].WikipediaWordMarkUrl) // para /api/v1.0/teams

                d3.select('#teamInfo').html(`
                    Official Name: ${teams[x].FullName} <br>
                    City: ${teams[x].City} <br> 
                    Conference: ${teams[x].Conference} <br>
                    Division: ${teams[x].Division} <br>  
                    Head Coach: ${teams[x].HeadCoach} <br> 
                `);

                d3.select('#stadiumInfo').html(`
                    Name: ${teams[x].StadiumDetails.Name} <br>
                    City: ${teams[x].StadiumDetails.City} <br>                    
                    Capacity: ${teams[x].StadiumDetails.Capacity} <br>
                    PlayingSurface: ${teams[x].StadiumDetails.PlayingSurface} <br>
                    Type: ${teams[x].StadiumDetails.Type} <br>
                `);

                Markers.remove()
                Stadiums.remove()
                Markers=L.marker([teams[x].StadiumDetails.GeoLat, teams[x].StadiumDetails.GeoLong],{icon:Icon}).addTo(map);
                
                //d3.select('#map-id').addLayer(stadiumMarkers);     
                           
                //.bindPopup("<h3>" + stadium.Name + "<h3><h3>Capacity: " + stadium.Capacity + "</h3><h3>Type: " + stadium.Type + "</h3>");
            }
        }
    });
}

//Map Base
function createMarkers() {
    d3.json(jsonStadiums).then((data) => {
        //console.log(data)
        // Pull the "stadiums" property off of response.data
        let stadiums = data;
        //console.log(stadiums);

        // Initialize an array to hold stadiums markers
        stadiumMarkers = [];
    

    
        // Loop through the stadiums array
        for (var index = 0; index < stadiums.length; index++) {
            var stadium = stadiums[index];
            console.log(stadium);
            // For each stadium, create a marker and bind a popup with the stadium's name
            let sMarker=L.marker([stadium.GeoLat, stadium.GeoLong], {icon:Icon})
            .bindPopup("<h3>" + stadium.Name + "<h3><h3>Capacity: " + stadium.Capacity + "</h3><h3>Type: " + stadium.Type + "</h3>");
            //console.log(sMarker);    
            stadiumMarkers.push(sMarker);
            //console.log(stadiumMarkers);
        
        }

        Stadiums=L.layerGroup(stadiumMarkers).addTo(map);
        console.log(Stadiums);
 });
} 



  
   
  
    //Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    // L.control.layers(baseMaps, overlayMaps, {
    //   collapsed: false
    // }).addTo(map);    

    //Stadiums =L.marker([39.09, -84.51]).addTo(map);


//Execute init fuctions
init();

