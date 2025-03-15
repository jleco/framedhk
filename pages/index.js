import React from "react";

export default function Home() {
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
    </div>
  );
}