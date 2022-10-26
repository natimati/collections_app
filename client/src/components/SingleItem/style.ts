import styled from "styled-components";
import { theme } from "../../style";
interface Props {
  image_url: string
}

export const Container = styled.div<Props>`
  position: relative;
  background-color: ${theme.palette.secondary.main};
  background-image: url(${props => props.image_url});
  background-size: cover;
  background-position: center;
  max-width: 600px;
  width: 100%;
  height: 350px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5), 0 5px 10px 0 rgba(0, 0, 0, 0.19);
  
  &:hover{
    background-color: none;
    background-image: 
        linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url(${props => props.image_url});
  }
`;

export const DetailsContainer = styled.div`
  opacity: 0;
  height: 95%;
  width: 95% ;
  position: absolute;
  color: ${theme.palette.primary.contrastText};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  
  &:hover {
    opacity: 1; 
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: 10px;
  gap: 10px;
`;

export const CommentInfo = styled.div`
  display: flex;
  gap: 5px;
  align-self: flex-end;
`;

export const Button = styled.button`
background-color: transparent;
border: none; 
padding: 0;
margin: 0;
cursor: pointer;
`;