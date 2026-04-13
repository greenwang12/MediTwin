import { useState } from "react";

type SelectedDisease = {
  name: string;
  organ: string;
};

type Props = {
  selectedDisease: SelectedDisease | null;
};

export default function Body({ selectedDisease }: Props) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  const getColor = (organ: string) => {
    if (!selectedDisease) return "transparent";

    return selectedDisease.organ === organ
      ? "rgba(255, 255, 0, 0.4)"
      : "transparent";
  };

  // 🔍 ZOOM
  const handleZoom = (e: React.WheelEvent) => {
    e.preventDefault();

    let newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);

    if (newScale < 0.8) newScale = 0.8;
    if (newScale > 2) newScale = 2;

    setScale(newScale);
  };

  // 🖱 DRAG
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setStart({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;

    setPos({
      x: e.clientX - start.x,
      y: e.clientY - start.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      onWheel={handleZoom}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        position: "relative",
        width: "520px",
        margin: "auto",
transform: `translate(${pos.x}px, ${pos.y - 470}px) scale(${scale})`,
        transformOrigin: "top center",
        transition: dragging ? "none" : "transform 0.2s ease",
        cursor: dragging ? "grabbing" : "grab",
      }}
    >
      {/* HUMAN IMAGE */}
      <img src="/human.png" alt="Human Body" width="100%" />

      {/* LUNGS */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "39%",
          width: "22%",
          height: "11%",
          backgroundColor: getColor("lungs"),
          borderRadius: "10px",
          transition: "0.3s",
        }}
      />

      {/* HEART */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: "46%",
          width: "10%",
          height: "7%",
          backgroundColor: getColor("heart"),
          borderRadius: "10px",
          transition: "0.3s",
        }}
      />

      {/* KIDNEYS */}
      <div
        style={{
          position: "absolute",
          top: "34%",
          left: "42%",
          width: "16%",
          height: "6%",
          backgroundColor: getColor("kidneys"),
          borderRadius: "10px",
          transition: "0.3s",
        }}
      />
    </div>
  );
}