import React, { useState, useEffect } from "react";
import Papa from "papaparse";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [coordinates, setCoordinates] = useState({ x: "", y: "" });

  const correctPassword = "framedhkadmin";

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await fetch("/api/getBuildings");
        if (!response.ok) throw new Error("Failed to load buildings.json");
        const data = await response.json();
        setBuildings(data);
      } catch (error) {
        console.error("Error loading buildings:", error);
      }
    };
    fetchBuildings();
  }, []);

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  const openLocationModal = (image, buildingId) => {
    setBackgroundImage(`/backgrounds/${image}`);  // Ensure correct path to public folder
    setSelectedBuilding(buildingId);
    setShowModal(true);
  };

  const handleImageClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width; // Normalize X
    const y = (event.clientY - rect.top) / rect.height; // Normalize Y
    setCoordinates({ x: Number(x.toFixed(3)), y: Number(y.toFixed(3)) }); // Ensure it's a number
  };

  const saveLocationData = async () => {
    const updatedBuildings = buildings.map(building => {
      if (building.id === selectedBuilding) {
        return {
          ...building,
          location_in_background_img: [{
            image: backgroundImage,
            x: parseFloat(coordinates.x),  // Ensure it's saved as a number
            y: parseFloat(coordinates.y),
          }],
        };
      }
      return building;
    });
  
    setBuildings(updatedBuildings);
    setShowModal(false);
  
    try {
      const response = await fetch("/api/saveData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBuildings),
      });
      if (!response.ok) throw new Error("Failed to save data");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {!isAuthenticated ? (
        <div>
          <h2>Admin Login</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Building Database</h2>
          <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
            <thead>
              <tr>
                {buildings.length > 0 && Object.keys(buildings[0]).map((key) => (
                  <th key={key}>{key.replace(/_/g, " ")}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {buildings.map((building, index) => (
                <tr key={index}>
                  {Object.keys(buildings[0] || {}).map((key) => (
                    <td key={key}>
                    {key === "location_in_background_img" && Array.isArray(building[key])
                        ? building[key].map((entry, idx) => (
                            <div key={idx}>
                            {entry.image}: X={
                                typeof entry.x === "number" ? entry.x.toFixed(3) : "Not Set"
                            }, Y={
                                typeof entry.y === "number" ? entry.y.toFixed(3) : "Not Set"
                            }
                            </div>
                        ))
                        : Array.isArray(building[key])
                        ? building[key].join(", ")
                        : building[key]}
                    </td>
                  ))}
                  <td>
                    {building.appears_in_background_img?.map((img, i) => (
                      <div key={i}>
                        <button onClick={() => openLocationModal(img, building.id)}>
                          Select Location in {img}
                        </button>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && (
            <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ background: "white", padding: "20px", position: "relative" }}>
                <h3>Select Location</h3>
                <img
                    src={backgroundImage}  // Ensure it’s coming from state
                    alt="Background"
                    style={{ maxWidth: "90%", maxHeight: "500px", cursor: "crosshair" }}
                    onClick={handleImageClick}
                />
                <p>
                    X: {typeof coordinates.x === "number" ? coordinates.x.toFixed(3) : "Not Set"}, 
                    Y: {typeof coordinates.y === "number" ? coordinates.y.toFixed(3) : "Not Set"}
                </p>
                <button onClick={saveLocationData}>Save</button>
                <button onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
