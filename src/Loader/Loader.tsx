import React from 'react';
import {StyledLoader} from './styles';

type TLoaderProps = {
  message?: string;
  hasOverlay?: boolean;
  fullscreen?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function Loader(props: TLoaderProps) {
  const {message, children, hasOverlay, fullscreen, ...restProps} = props;

  return (
    <StyledLoader hasOverlay={hasOverlay} fullscreen={fullscreen} >
      <div
        css={{display: 'flex', justifyContent: 'center', width: 100, height: 100, margin: '1rem'}}
        {...restProps}
      >
        <svg
          version="1.1"
          id="loader"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enableBackground="new 0 0 0 0"
          xmlSpace="preserve"
        >
          <circle
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="4"
            cx="50"
            cy="50"
            r="44"
            style={{opacity: 0.5}}
          />
          <circle fill="#fff" stroke="var(--color-primary)" strokeWidth="3" cx="8" cy="54" r="6">
            <animateTransform
              attributeName="transform"
              dur="2s"
              type="rotate"
              from="0 50 48"
              to="360 50 52"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
      {children}
    </StyledLoader>
  );
}
