import React from "react";

const Skeleton = ({ variant = "text", count = 1, className = "" }) => {
  const base = "animate-pulse bg-gray-200 rounded";

  const variants = {
    text: `${base} h-4 w-full`,
    "text-short": `${base} h-4 w-1/2`,
    "text-lg": `${base} h-6 w-3/4`,
    circle: `${base} rounded-full w-10 h-10`,
    card: `${base} rounded-xl h-24 w-full`,
    "image-card": `${base} rounded-2xl h-[470px] w-full`,
    "stat-card": `${base} rounded-2xl h-28 w-full`,
    "table-row": "flex gap-4 w-full",
    "product-card": `${base} rounded-2xl h-[160px] w-full`,
    "category-card": `${base} rounded-xl h-[76px] w-full`,
    "industry-card": `${base} rounded-xl h-[140px] w-full`,
  };

  const items = Array.from({ length: count });

  if (variant === "table-row") {
    return items.map((_, i) => (
      <tr key={i} className="border-b">
        <td className="p-4">
          <div className={`${base} h-4 w-32`}></div>
        </td>
        <td className="p-4">
          <div className={`${base} h-4 w-24`}></div>
        </td>
        <td className="p-4">
          <div className={`${base} h-4 w-28`}></div>
        </td>
        <td className="p-4">
          <div className={`${base} h-4 w-20`}></div>
        </td>
      </tr>
    ));
  }

  return items.map((_, i) => (
    <div
      key={i}
      className={`${variants[variant] || variants.text} ${className}`}
    ></div>
  ));
};

export default Skeleton;
