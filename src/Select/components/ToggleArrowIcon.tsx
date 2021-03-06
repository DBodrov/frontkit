import React from 'react';

export function ToggleArrowIcon(props: React.SVGProps<SVGSVGElement> & {isOpen: boolean}) {
  const {fill = 'currentColor', isOpen, ...restProps} = props;

  return (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 16 9"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      css={{
        marginLeft: 'auto',
        transform: `rotate(${isOpen ? '180deg' : '0'})`,
        transition: 'all 0.3s ease-in-out',
      }}
      {...restProps}
    >
      <g id="App-Sources" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Artboard" transform="translate(-537.000000, -164.000000)" fill={fill}>
          <g id="::-Search-Item-Copy" transform="translate(88.000000, 88.000000)">
            <g id="::-item-title">
              <path
                d="M461.5,80.499625 C461.5,80.0986689 461.342372,79.7217101 461.057046,79.439741 L454.224179,72.792468 C453.829112,72.4025107 453.190619,72.4025107 452.795552,72.792468 C452.401483,73.1834253 452.401483,73.816356 452.795552,74.2063134 L459.27226,80.499625 L452.795552,86.7929367 C452.401483,87.1828941 452.401483,87.8158248 452.795552,88.2067821 C453.190619,88.5977393 453.829112,88.5977393 454.224179,88.2067821 L461.057046,81.560509 C461.342372,81.2765401 461.5,80.9015811 461.5,80.499625 Z"
                id="::-icon-arrow-down"
                transform="translate(457.000000, 80.500000) rotate(-270.000000) translate(-457.000000, -80.500000) "
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
