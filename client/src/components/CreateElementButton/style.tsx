import styled from "styled-components";
import { theme } from "../../style";

export const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);  
  max-width: 600px;
  width: 100%;
  height: 350px;
  display: flex;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5), 0 5px 10px 0 rgba(0, 0, 0, 0.19);

  &:hover{
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.5), 0 10px 20px 0 rgba(0, 0, 0, 0.19);
    background-color: ${theme.palette.secondary.main}
  }
`;