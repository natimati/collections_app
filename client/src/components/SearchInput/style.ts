import styled from "styled-components"
import InputBase from '@mui/material/InputBase';

interface Props {
  imageUrl: string
}
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

export const AdditionalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

export const ImageContainer = styled.div<Props>`
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  cursor: pointer;
  width: 300px;
  height: 100px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5), 0 5px 10px 0 rgba(0, 0, 0, 0.19);
`;

export const Overlay = styled.div`
  background-color: #40495699;
 display: flex;
 flex-direction: column;
 align-items: center;
 width: 100%;
 height: 100%;
 text-align: center;
 align-items: center;
 justify-content: center;
 `;

export const TextContainer = styled.div`
margin: 5px;
padding: 5px;
width: 80%;
border-top: solid 1px white;
border-bottom: solid 1px white;
`;