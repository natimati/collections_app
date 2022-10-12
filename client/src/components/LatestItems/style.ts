import styled from "styled-components";

interface ImageContainerProps {
    imageUrl: string
}

export const ImageContainer = styled.div<ImageContainerProps>`
  background-image: url(imageUrl);
  position: relative;
  cursor: pointer;
`;

export const Overlay = styled.div`
 opacity: 0;
 display: flex;
 flex-direction: column;
 align-items: center;

 &:hover {
  opacity: 100%;
 }
`;