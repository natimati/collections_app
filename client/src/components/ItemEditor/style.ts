import ReactQuill from "react-quill";
import styled from "styled-components";
import { theme } from "../../style";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  justify-content: center;
  align-self: flex-start;
  margin: 0 auto;
  padding: 50px;
  max-width: 800px;
  width: 100%;
`;

export const Description = styled(ReactQuill)`
  max-width: 600px;
  width: 100%;
  margin-bottom: 20px;
  border: 2px solid ${theme.palette.primary.main};
  border-radius: 5px;
  align-self: center;

  & .ql-container {
    border: none;
    min-height: 150px;
    font-family: ${theme.typography.fontFamily};
  };

  & .ql-toolbar {
    border: none;
    font-family: ${theme.typography.fontFamily};
    background-color: ${ theme.palette.primary.main + 'E6'};
  };

  & .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
    border: 1px solid ${theme.palette.secondary.main};
    color: ${theme.palette.secondary.main};

    & .ql-stroke {
      stroke: ${theme.palette.secondary.main}
    }
  };
  & .ql-editor {
    font-size: 18px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  margin: 10px;
`;