# // IMPORT OF MODULES //

import json

# // DEFINE LIST //

with open('nfl_teams.json') as json_file:
    allteams = json.load(json_file)
    list_teams=[]
    list_teams.append(allteams)
    # for team in allteams:
    #     list_teams.append({"TeamID":team["TeamID"], "FullName":team["FullName"], "City":team["City"], "Coach":team["HeadCoach"], "Logo":team["WikipediaLogoUrl"], "StadiumID":team["StadiumID"], "StadiumName":team["StadiumDetails"]["Name"], "Lat":team["StadiumDetails"]["GeoLat"], "Long":team["StadiumDetails"]["GeoLong"]})

nfl_dict = {"data": list_teams}
