import styled from "styled-components"
import InputBase from '@mui/material/InputBase';

export const SearchIconWrapper = styled.div`
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: 'center'
`;

export const StyledInputBase = styled(InputBase)`
  color: red;
  width: 100%;
 `;