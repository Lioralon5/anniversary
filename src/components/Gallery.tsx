import React from "react";

const Gallery = ({ photos }) => (
  <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))" }}>
    {photos.map((photo, index) => (
      <img key={index} src={photo} alt="Memory" style={{ width: "100%", borderRadius: "8px" }} />
    ))}
  </div>
);

export default Gallery;
