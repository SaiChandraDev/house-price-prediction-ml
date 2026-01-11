import { useState } from "react";
import "./App.css";

function App() {
  // -----------------------------
  // State variables (UI data)
  // -----------------------------
  const [area, setArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [location, setLocation] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -----------------------------
  // Call Flask ML API
  // -----------------------------
  const predictPrice = async () => {
    setError("");
    setPredictedPrice(null);

    // Basic validation
    if (!area || !bedrooms || !location) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://house-price-prediction-ml-zhgk.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            area: Number(area),
            bedrooms: Number(bedrooms),
            location: Number(location),
          }),
        }
      );

      const data = await response.json();
      setPredictedPrice(data.predicted_price);
    } catch (err) {
      setError("Failed to get prediction");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="container">
      <div className="card">
        <h1>🏠 House Price Prediction</h1>
        <p className="subtitle">ML Model · Flask API · React UI</p>

        <input
          type="number"
          placeholder="Area (sq ft)"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />

        <input
          type="number"
          placeholder="Bedrooms"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />

        <input
          type="number"
          placeholder="Location Code"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button onClick={predictPrice} disabled={loading}>
          {loading ? "Predicting..." : "Predict Price"}
        </button>

        {error && <div className="error">{error}</div>}

        {predictedPrice !== null && (
          <div className="result">
            Predicted Price: ₹ {predictedPrice.toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
