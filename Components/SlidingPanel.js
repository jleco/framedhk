import React from "react";

export default function SlidingPanel({ isOpen, onClose, building }) {
  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: isOpen ? "0" : "-300px", // Slide in/out effect
        width: "300px",
        height: "100vh",
        backgroundColor: "white",
        boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.2)",
        transition: "left 0.3s ease-in-out",
        padding: "20px",
        overflowY: "auto",
        zIndex: 1000
      }}
    >
      {/* Close Button */}
      <button 
        onClick={onClose} 
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          border: "none",
          background: "red",
          color: "white",
          padding: "5px 10px",
          cursor: "pointer",
          borderRadius: "5px"
        }}
      >
        ✖ Close
      </button>

      {/* Building Info */}
      {building ? (
        <>
          <h2>{building.name}</h2>
          <img 
            src={building.image} 
            alt={building.name} 
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "5px",
              marginBottom: "10px"
            }}
          />
          <p><strong>Year Built:</strong> {building.year}</p>
          <p><strong>Architect:</strong> {building.architect}</p>
          <p>{building.description}</p>
        </>
      ) : (
        <p>No building selected</p>
      )}
    </div>
  );
}
