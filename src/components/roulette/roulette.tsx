import React from "react";
import { Slice } from "../slice/slice";

import "../../styles/roulette.scss";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {/* {`${(percent * 100).toFixed(0)}%`} */}
      {/* {`${data[index].name}`} */}
    </text>
  );
};


export const Roulette = ({ data, colors, stroke, strokeWidth }: any) => {
  const total = data.reduce((sum: any, item: any) => sum + item.value, 0);
  let startAngle = 0;
  return (
    <svg viewBox="0 0 100 100">
      {data.map((item: any, index: any) => {
        const angle = (item.value / total) * 360;
        const slice = (
          <Slice
            key={item.label}
            value={item.value}
            fill={colors[index % colors.length]}
            stroke={stroke}
            strokeWidth={strokeWidth}
            startAngle={startAngle}
          />
        );
        startAngle += angle;
        return slice;
      })}
    </svg>
  );
};
