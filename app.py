# OMICRON TEAM - NFL APP

# IMPORT OF LIBRARIES ---------

from bson import json_util
import json
from flask import Flask, jsonify, render_template
import pymongo
from scrape_nfl import nfl_dict

# DEFINE SESSION AND ENGINE ---------

conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)
db = client.nfl_db
db.teams.drop()
db.teams.insert_one(nfl_dict)

# ------------- FLASK APPLICATION -----------

app = Flask(__name__)

# HOME FUNCTION ----------

@app.route("/")
def home():
    # return f"""
    # <h1>Welcome to Omicron Team NFL Project</h1>
    # <p>---------------------------------</p>
    # <h3>Routes available:</h3>
    # <p>/api/v1.0/teams (for total data registered)</p>

    # <p>-----------------------------</p>"""
    return render_template('index.html')

# CUSTOM TEAMS JSON HOSTING FUNCTION -------------

@app.route("/api/v1.0/teams")
def api_teams():
    conn = "mongodb://localhost:27017"
    client = pymongo.MongoClient(conn)
    db = client.nfl_db
    for i in db.teams.find():
        return json.dumps(i, indent=4, default=json_util.default)
    

    return jsonify(nfl_dict)

# DEBUG FUNCTION ------------

if __name__ == "__main__":
    app.run(debug=True)