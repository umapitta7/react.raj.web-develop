import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import React from 'react';

import IconLabel from './iconLabel';

describe('IconLabel test', () => {
  /* eslint-disable max-len */
  it("Labels SVG's properly", () => {
    const Icon = () => (
      <svg width="21.37" height="30" xmlns="http://www.w3.org/2000/svg">
        <title>Pin</title>
        <g>
          <path
            d="m10.69,0a10.69,10.69 0 0 0 -8.56,17.08l6.85,11.92a1.93,1.93 0 0 0 0.13,0.22l0,0l0,0a1.92,1.92 0 0 0 3,0.12l0,0l0.07,-0.12a1.93,1.93 0 0 0 0.25,-0.44l6.72,-11.63a10.69,10.69 0 0 0 -8.46,-17.15z"
            fill="#0060a9"
          />
          <text
            textAnchor="middle"
            fontWeight="400"
            fontFamily="Helvetica Neue, Helvetica, Arial, Roboto, sans-serif"
            fontSize="16"
            y="18"
            x="10.684998"
            strokeWidth="0"
            fill="white"
          >
            1
          </text>
        </g>
      </svg>
    );

    render(<><IconLabel svg={<Icon />} /></>);

    expect(screen.getByTitle('Pin')).toBeInTheDocument();
    expect(document.querySelector('.MuiSvgIcon-root')).toHaveAttribute(
      'pr',
      'sm'
    );
  });
  /* eslint-enable max-len */
});
