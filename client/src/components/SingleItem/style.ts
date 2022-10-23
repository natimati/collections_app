import styled from "styled-components";
import { theme } from "../../style";

export const Container = styled.div`
position: relative;
  width: 100%;
  background-image: 
    url('https://images.pexels.com/photos/33044/sunflower-sun-summer-yellow.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  background-size: cover;
  background-position: center;
  max-width: 600px;
  width: 100%;
  height: 350px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5), 0 5px 10px 0 rgba(0, 0, 0, 0.19);

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
  gap: 2px;
`;

export const CommentInfo = styled.div`
  display: flex;
  gap: 5px;
  align-self: flex-end;
`;