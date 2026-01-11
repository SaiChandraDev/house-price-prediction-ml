from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os

# Create Flask app
app = Flask(__name__)
CORS(app)  # ✅ Allow React frontend to access this API

# Load trained ML model
with open("model/model.pkl", "rb") as f:
    model = pickle.load(f)

# Prediction API
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    area = data["area"]
    bedrooms = data["bedrooms"]
    location = data["location"]

    prediction = model.predict([[area, bedrooms, location]])

    return jsonify({
        "predicted_price": int(prediction[0])
    })

# App entry point (used by Render / Gunicorn)
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
