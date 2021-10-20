import React from 'react';

export function CheckIcon(props: React.SVGAttributes<SVGSVGElement>) {
  const {
    width = '16',
    height = '11',
    viewBox = '0 0 16 11',
    fill = 'none',
    stroke = 'white',
    strokeWidth = 2,
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
  } = props;

  return (
    <svg width={width} height={height} viewBox={viewBox} fill={fill}>
      <path
        d="M15 1L5.45455 9.99008L1 5.49504"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </svg>
  );
}
