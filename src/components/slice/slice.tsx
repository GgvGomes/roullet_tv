import React from 'react';

export const Slice = ({ value, fill, stroke, strokeWidth, index, total, startAngle }: any) => {
    const angle = (value / total) * 360;
    const x1 = 50 + (50 * Math.cos((startAngle - angle / 2) * Math.PI / 180));
    const y1 = 50 + (50 * Math.sin((startAngle - angle / 2) * Math.PI / 180));
    const x2 = 50 + (50 * Math.cos((startAngle + angle / 2) * Math.PI / 180));
    const y2 = 50 + (50 * Math.sin((startAngle + angle / 2) * Math.PI / 180));
    const largeArc = (angle > 180) ? 1 : 0;
  
    return (
      <path
        d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    );
};