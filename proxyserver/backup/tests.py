from pymongo import MongoClient

uri = "mongodb+srv://mutaihillary:mutai%2Fatlas25@cluster0.ch21p.mongodb.net/Youflix?retryWrites=true&w=majority&appName=Cluster0"

try:
    client = MongoClient(uri)
    print("Connected to MongoDB!")
    db_info = client.server_info()
    print(f"MongoDB Version: {db_info['version']}")
except Exception as e:
    print(f"Connection failed: {e}")