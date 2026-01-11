from flask import Flask, request, jsonify
import pickle
import os

#Create App
app = Flask(__name__)

#Loads the trained model
with open("model/model.pkl", "rb") as f:
  model = pickle.load(f)

#Creating an API endpoint
@app.route("/predict", methods = ["POST"])
def predict():

#Reading the Input
 data = request.json
 area = data["area"]
 bedrooms = data["bedrooms"]
 location = data["location"]

 #Runs the prediction
 prediction = model.predict([[area, bedrooms, location]])

 return jsonify({
    "predicted_price": int(prediction[0])
 })

#Deployment port details
if __name__ == "__main__":
  port = int(os.environ.get("PORT", 5000))
  app.run(host="0.0.0.0", port=port)





