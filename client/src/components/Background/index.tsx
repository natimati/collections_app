import { Container, LeftCloud, RightCloud, TopCloud } from "./style";

function Background() {
  return (
    <Container>
      <TopCloud src='assets/dots_1.png' />
      <LeftCloud src='assets/dots_2.png' />
      <RightCloud src='assets/dots_3.png' />
    </Container>
  )
};

export default Background;