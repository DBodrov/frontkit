import styled from '@emotion/styled';
import {css} from '@emotion/react';

const baseHeading = css`
  font-style: normal;
  font-weight: bold;
  color: var(--color-text-lead);
  margin: 0;
  padding: 0;
`;

export const H1 = styled.h1`
  ${baseHeading};
  font-size: 36px;
  line-height: 49px;
  /* @media (max-width: 768px) {
    font-size: 28px;
    line-height: 32px;
  } */
`;

export const H2 = styled.h2`
  ${baseHeading};
  font-size: 28px;
  line-height: 38px;
  font-weight: 700;
`;

export const H3 = styled.h3`
  ${baseHeading};
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
`;

export const Span = styled.span`
  ${baseHeading};
  font-size: 1rem;
  font-weight: normal;
  color: var(--color-text);
`;

export const P = styled.p`
  ${baseHeading};
  font-size: 1rem;
  font-weight: normal;
`;
