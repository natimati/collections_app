import styled from "styled-components";
import { theme } from "../../style";

interface Props {
    imageUrl: string
}

export const ImageContainer = styled.div<Props>`
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  cursor: pointer;
  max-width: 500px;
  height: 180px;
  width: 100%;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5), 0 5px 10px 0 rgba(0, 0, 0, 0.19);
`;

export const Overlay = styled.div`
 opacity: 0;
 display: flex;
 flex-direction: column;
 align-items: center;
 width: 100%;
 height: 100%;
 text-align: center;
 align-items: center;
 justify-content: center;
  
 &:hover {
  opacity: 100%;
  background-color: #40495699;
 }
`;

export const TextContainer = styled.div`
margin: 5px;
`;