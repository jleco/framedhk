import React, { useState, useEffect } from "react";
import SlidingPanel from "../components/SlidingPanel";


export default function Home() {
  const [selectedSection, setSelectedSection] = useState("top");
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [buildings, setBuildings] = useState([]);

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

  return (
    <div 
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('/hongkong-panorama.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div 
        style={{
          position: "absolute",
          top: "50px",
          left: "20%",
          transform: "translateX(-50%)",
          textAlign: "center",
          color: "white",
          fontFamily: "'Arial', sans-serif",
          textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)"
        }}
      >
        <h1 style={{ fontSize: "36px", margin: "0", fontWeight: "bold" }}>
          Framed Hong Kong
        </h1>
        <p style={{ fontSize: "18px", margin: "5px 0", fontStyle: "italic" }}>
          Neon and Concrete
        </p>
      </div>

      <div 
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "20px 30px",
          borderRadius: "10px",
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center"
        }}
      >
        🚧 This site is under construction 🚧
      </div>

      <div 
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          width: "150px",
          height: "100px",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          border: "2px solid white",
          borderRadius: "10px",
          overflow: "hidden"
        }}
      >
        <img 
          src="/map-top.jpg" 
          onClick={() => setSelectedSection("top")}
          style={{
            width: "100%",
            height: "50%",
            objectFit: "cover",
            opacity: selectedSection === "top" ? 1 : 0.5
          }}
        />
        
        <img 
          src="/map-bottom.jpg" 
          onClick={() => setSelectedSection("bottom")}
          style={{
            width: "100%",
            height: "50%",
            objectFit: "cover",
            opacity: selectedSection === "bottom" ? 1 : 0.5
          }}
        />
      </div>

      {buildings.map((building, index) => (
        building.location_in_background_img?.map((entry, idx) => (
          <button
            key={`${index}-${idx}`}
            style={{
              position: "absolute",
              top: `${entry.y * 100}%`,
              left: `${entry.x * 100}%`,
              background: "red",
              color: "white",
              border: "none",
              padding: "5px",
              cursor: "pointer",
            }}
            onClick={() => {
              setSelectedBuilding(building);
              setIsPanelOpen(true);
            }}
          >
            {building.name}
          </button>
        ))
      ))}

      {selectedBuilding && (
        <SlidingPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} building={selectedBuilding} />
      )}
    </div>
  );
}
