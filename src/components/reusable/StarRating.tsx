"use client";
import { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const starContainerStyle = { display: "flex" };

type StarRatingProps = {
  maxRating: number;
  defaultRating: number;
  color: string;
  size: number;
  showNumber?: boolean;
  messages?: string[];
  readOnly: boolean;
  className?: string;
  onSetRating?: (rating: number) => void;
};

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 14,
  onSetRating,
  showNumber = true,
  readOnly,
  messages = [],
  defaultRating = 0,
  className = "",
}: StarRatingProps) {
  const [rating, setRating] = useState(Number(defaultRating));
  const [tempRating, setTempRating] = useState(0);

  const textStyle = {
    lineHeight: "0",
    margin: "0",
    color,
    fontSize: `${size}px`,
  };

  function handleRating(newRating: number) {
    if (!readOnly) {
      setRating(newRating);
      if (onSetRating) {
        onSetRating(newRating);
      }
    }
  }

  return (
    <div
      style={containerStyle}
      className={className}
    >
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            color={color}
            size={size}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => !readOnly && setTempRating(i + 1)}
            onHoverOut={() => !readOnly && setTempRating(0)}
            onRate={() => handleRating(tempRating || rating)}
            readOnly={readOnly}
          />
        ))}
      </div>

      {showNumber && (
        <p style={textStyle}>
          {messages.length === maxRating
            ? messages[tempRating ? tempRating - 1 : rating - 1]
            : tempRating || rating.toFixed(1) || ""}
        </p>
      )}
    </div>
  );
}

type StarProps = {
  onRate: () => void;
  full: boolean;
  color: string;
  size: number;
  onHoverIn: () => void;
  onHoverOut: () => void;
  readOnly: boolean;
};

function Star({
  onRate,
  full,
  color,
  size,
  onHoverIn,
  onHoverOut,
  readOnly,
}: StarProps) {
  const starStyle = {
    display: "block",
    height: `${size}px`,
    width: `${size}px`,
    cursor: readOnly ? "default" : "pointer",
  };

  return (
    <span
      role="button"
      onClick={!readOnly ? onRate : undefined}
      onMouseEnter={!readOnly ? onHoverIn : undefined}
      onMouseLeave={!readOnly ? onHoverOut : undefined}
      style={starStyle}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
