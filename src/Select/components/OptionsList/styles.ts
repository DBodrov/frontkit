import styled from '@emotion/styled';

export const StyledList = styled.ul<{isOpen: boolean}>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  z-index: 10;
  top: 3.5rem;
  left: 0;
  list-style: none;
  margin: 0;
  padding: ${props => (props.isOpen ? '1rem 0' : 0)};
  row-gap: 1px;
  background-color: var(--color-background);
  width: 100%;
  max-height: 300px;
  height: ${props => (props.isOpen ? '300px' : 0)};
  opacity: ${props => (props.isOpen ? 1 : 0)};;
  box-shadow: 0 10px 30px 0 rgb(82 63 105 / 10%);
  border-radius: 0.25rem;
  overflow: auto;
  transition: all 200ms ease;
  transition-property: height, opacity;
`;

export const StyledOption = styled.li<{isSelected: boolean}>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  font-size: 0.875rem;
  min-height: 2.5rem;
  padding: 0.5rem 0.5rem;
  cursor: pointer;
  user-select: none;
  background-color: ${props => (props.isSelected ? 'var(--color-primary)' : '#fff')};
  color: ${props => (props.isSelected ? '#fff' : 'var(--color-text)')};

  &:hover {
    background-color: var(--color-border);
    color: ${props => (props.isSelected && 'var(--color-text)')};
  }

  &:focus {
    outline: 1px var(--color-primary) solid !important;
  }

  &:focus-visible {
    outline: 1px var(--color-primary) solid !important;
  }
`;
