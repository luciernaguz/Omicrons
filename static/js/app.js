//Check if JS is properly connected
console.log('Ok connected 123 - app.js');
//Get jsonData
var jsonData = '/api/v1.0/teams'; //NEED TO FIX - TO GET FROM URL
//var jsonData = 'static/js/API_generated.json'; //NEED TO FIX - TO GET FROM URL

/**
 * Execute init functions
 */
function init(){
    fillDropdown();
}

/**
 * Get Team Names from JSON to fillout dropdown
 */
function fillDropdown(){
    d3.json(jsonData).then((data) => {
        let teams = data.data[0];
        //Add options to dropdown
        d3.select("#selDataset").append("option").text('-Select Team-')
        for(x in teams){
            d3.select("#selDataset").append("option").text(teams[x].FullName);
        }
    });
}

/**
 * Get URL from JSON and dispplay in dashboard
 * @param {string} selectedTeam Team selected in dropdown
 */
function optionChanged(selectedTeam){
    console.log(`Selected Team: ${selectedTeam}`)
    d3.json(jsonData).then((data) => {
        let teams = data.data[0];
        //Display image
        for(x in teams){
            //console.log(teams[x].Logo)
            if(selectedTeam==teams[x].FullName){
                //console.log(teams[x].Logo)
                d3.select('#logo').attr('src',teams[x].WikipediaLogoUrl)
            }
        }
    });
}

//Execute init fuctions
init();

