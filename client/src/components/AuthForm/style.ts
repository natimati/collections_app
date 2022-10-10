import styled from "styled-components";
import { Button, TextField } from "@mui/material";

export const Background = styled.div`
  background-image: url('assets/background-light.png');
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: center;
`;
export const Container = styled.div`
  width: 50%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
`;

export const FormContainer = styled.form`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;
  align-items: flex-start;
`;

export const Input = styled(TextField)`
  border: none;
  border: solid 2px red;
`;

export const StyledButton = styled(Button)`
  align-self: center;
`;

export const Text = styled.span`
align-self: center;
`;

