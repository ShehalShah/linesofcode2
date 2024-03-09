import React from "react";

const generateTiles = (startColor, endColor, maxStart, maxEnd) => {
  let tiles = [];
  let lastColor = null;
  let count = 0;

  for (let i = 0; i < 12; i++) {
    let color;
    if (lastColor === startColor && count === maxStart) {
      color = endColor;
    } else if (lastColor === endColor && count === maxEnd) {
      color = startColor;
    } else {
      color = Math.random() < 0.5 ? startColor : endColor;
    }

    if (color === lastColor) {
      count++;
    } else {
      count = 1;
    }

    lastColor = color;

    tiles.push(
      <div
        key={i}
        style={{
          backgroundColor: color,
          height: "80px",
          width: "100%",
        }}
      />
    );
  }

  return tiles;
};

const SplitSection = ({ startColor, endColor }) => {
  const row1 = generateTiles(startColor, endColor, 2, 2);
  const row2 = generateTiles(startColor, endColor, 1, 3);

  return (
    <div
      className="w-full px-2"
      style={{
        backgroundColor: endColor,
      }}
    >
      <div className="flex">{row1}</div>
      <div className="flex">{row2}</div>
    </div>
  );
};

export default SplitSection;
