import styled from "styled-components";

export default function NotFound() {
  return (
    <Container>
      <Box>
        <h1>NOT FOUND</h1>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 500px;
  background: linear-gradient(180deg, #5834eb, #5146f0);
  border-radius: 15px;
  padding: 1rem;

  @media (max-height: 720px) {
    height: 90%;
  }

  @media (max-width: 530px) {
    height: 100%;
    border-radius: 0;
    padding: 0.5rem;
  }
`;
