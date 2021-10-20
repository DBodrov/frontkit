import React from 'react';
import styled from '@emotion/styled';
import {P} from '../Typography';

const StyledLoader = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--color-background);
  opacity: 1;
  z-index: 9;
`;

type TLoaderProps = {
  message?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function Loader(props: TLoaderProps) {
  const {message} = props;

  return (
    <StyledLoader>
      <div css={{display: 'flex', justifyContent: 'center', width: 100, height: 100, margin: '1rem'}}>
        <svg
          version="1.1"
          id="loader"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enable-background="new 0 0 0 0"
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
      <P css={{display: 'flex', justifyContent: 'center', width: '100%', alignSelf: 'center'}}>{message}</P>
    </StyledLoader>
  );
}
