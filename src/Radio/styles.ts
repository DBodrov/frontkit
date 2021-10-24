import styled from '@emotion/styled';

export const RadioInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border: 2px var(--color-border) solid;
  border-radius: 50%;
  background-color: var(--color-background);
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    border-color: var(--color-primary);
  }

  + label {
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  }

  &:checked {
    border-color: ${props => (props.disabled ? 'var(--color-inactive)' : 'var(--color-primary)')};
    position: relative;
    display: flex;

    &::after {
      content: '';
      margin: auto;
      width: 10px;
      height: 10px;
      border: 1px ${props => (props.disabled ? '#c7c7c7' : 'var(--color-primary)')} solid;
      border-radius: 50%;
      background-color: ${props => (props.disabled ? '#c7c7c7' : 'var(--color-primary)')};
    }
  }
`;
