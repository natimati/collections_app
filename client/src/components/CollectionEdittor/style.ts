import ReactQuill from "react-quill";
import styled from "styled-components";
import { theme } from "../../style";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  justify-content: center;
  justify-self: center;
   margin: 0 auto;
  max-width: 1000px;
  width: 100%;
`;

export const Description = styled(ReactQuill)`
  max-width: 1000px;
  width: 100%;
  margin-bottom: 20px;
  border: 2px solid ${theme.palette.primary.main};
  border-radius: 5px;

  & .ql-container {
    border: none;
    min-height: 150px;
    font-family: ${theme.typography.fontFamily};
  };

  & .ql-toolbar {
    border: none;
    font-family: ${theme.typography.fontFamily};
    background-color: ${theme.palette.primary.main + 'E6'};
  };

  & .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
    border: 1px solid ${theme.palette.secondary.main};
    color: ${theme.palette.secondary.main};
   };

    & .ql-stroke {
      stroke: ${theme.palette.secondary.main}
    }
    
    & .ql-editor {
    font-size: 18px;
  }
`;

export const AdditionalContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;
`;