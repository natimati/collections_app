import styled from "styled-components";
import { Button } from "@mui/material";

export const Container = styled.form`
  max-width: 1000px;
  width: 90%;
  display: flex;
  align-self: center;
  margin: 0 auto;
  padding: 50px;
  gap: 20px;
`;

export const StyledButton = styled(Button)`
  align-self: center;
`;