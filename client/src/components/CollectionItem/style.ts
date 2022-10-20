import styled from "styled-components";
import { theme } from "../../style";


export const Container = styled.div`
  position: relative;
  height: max-content;
  width: 100%;
  background-image: 
    url('https://images.pexels.com/photos/33044/sunflower-sun-summer-yellow.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  background-size: cover;
  width: 600px;
  height: 400px;
  
  &:hover{
    background-image: 
      linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url('https://images.pexels.com/photos/33044/sunflower-sun-summer-yellow.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
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

export const IconContainer = styled.div`
  display:flex;
  height: 100%;
  width: 100%;
  align-items: flex-end;
  justify-content: flex-end;
`;
