import React, { useState } from "react";
import SlidingPanel from "../components/SlidingPanel";

export default function Home() {
  const [selectedSection, setSelectedSection] = useState("top");
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Dummy building data
  const buildings = {
    "Building 1": {
      name: "Building 1",
      image: "/building1.jpg",
      year: "1990",
      architect: "John Doe",
      description: "A modern skyscraper in the heart of the city."
    },
    "Building 2": {
      name: "Building 2",
      image: "/building2.jpg",
      year: "1985",
      architect: "Jane Smith",
      description: "An iconic landmark known for its unique design."
    },
    "Building 3": {
      name: "Building 3",
      image: "/building3.jpg",
      year: "2005",
      architect: "Richard Roe",
      description: "A futuristic glass tower with eco-friendly design."
    },
    "Building 4": {
      name: "Building 4",
      image: "/building4.jpg",
      year: "2012",
      architect: "Emily White",
      description: "A historical building with rich cultural heritage."
    }
  };

  const openPanel = (buildingKey) => {
    setSelectedBuilding(buildings[buildingKey]);
    setIsPanelOpen(true);
  };

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

      {/* 🔥 HEADER SECTION - Title & Subtitle */}
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

      {/* Under Construction Message */}
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

      {/* Mini Map Container */}
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

      {/* Building Selection Buttons */}
      {selectedSection === "top" && (
        <>
          <button onClick={() => openPanel("Building 1")} style={{ position: "absolute", top: "80%", left: "40%" }}>🏢 Building 1</button>
          <button onClick={() => openPanel("Building 2")} style={{ position: "absolute", top: "50%", left: "60%" }}>🏢 Building 2</button>
        </>
      )}

      {selectedSection === "bottom" && (
        <>
          <button onClick={() => openPanel("Building 3")} style={{ position: "absolute", top: "70%", left: "30%" }}>🏢 Building 3</button>
          <button onClick={() => openPanel("Building 4")} style={{ position: "absolute", top: "70%", left: "50%" }}>🏢 Building 4</button>
        </>
      )}

      {/* Sliding Panel */}
      <SlidingPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} building={selectedBuilding} />
    </div>
  );
}