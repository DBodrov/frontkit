import {css} from '@emotion/react';
import styled from '@emotion/styled';


export const StyledLoader = styled.section<{hasOverlay: boolean, fullscreen: boolean}>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: ${props => props.fullscreen ? '100vw' : '100%'};
  height: ${props => props.fullscreen ? '100vh' : '100%'};
  opacity: 1;
  z-index: 9;
  ${props => props.fullscreen ? fullscreenCss : null}
  ${props => props.hasOverlay ? overlayCss : null}
`;

const fullscreenCss = css`
  position: fixed;
  transform: translateY(0%);
  top: 0;
  left: 0;
  z-index: 9999;
`;

export const overlayCss = css`
  background-color: rgba(171, 180, 189, 0.9);
`;

const noOverlayCss = css`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  position: fixed;
  /* width: 100vw;
  height: 100vh; */
  transform: translateY(0%);
`;
