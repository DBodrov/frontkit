import styled from '@emotion/styled';

export const Input = styled.input`
  width: 100%;
  height: 3rem;
  border-radius: 7px;
  font-size: 1rem;
  outline: 0;
  border: 1px var(--color-border) solid;
  padding: 0.5rem 0.5rem 0.5rem 0.75rem;

  &:hover,
  &:focus {
    border-color: var(--color-primary);
  }
`;
