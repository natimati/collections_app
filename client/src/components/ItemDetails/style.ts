import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1400px;
  margin-top: 50px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: fit-content;
  max-width: 80%;
  margin-bottom: 50px;
  
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 50px;
  gap: 100px;
`;

export const ItemImage = styled.img`
  max-width: 600px;
  max-height: 600px;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.5), 0 10px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 50px;
`;

export const PropertiesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PropertyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  margin-top: 20px;
`;
