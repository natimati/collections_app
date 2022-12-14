import styled from "styled-components";

interface Props {
    imageUrl: string
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content:center;
  margin: 0 50px;
  margin-top: 40px;
`;

export const ImageContainer = styled.div<Props>`
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #404956CC;
  position: relative;
  cursor: pointer;
  height: 200px;
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
padding: 5px;
width: 80%;
border-top: solid 1px white;
border-bottom: solid 1px white;
`;