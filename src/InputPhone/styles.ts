import styled from '@emotion/styled';
import {Input} from '../Input';

export const InputPhoneBlock = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

export const CountryCode = styled.input`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 30px;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 1rem;
  line-height: normal;
  padding: 4px;
  border: 1px transparent solid;
  outline: 0;
  user-select: none;
  background-color: transparent;
`;

export const StyledInput = styled(Input)`
  padding: 4px 0 4px 32px;
`;
