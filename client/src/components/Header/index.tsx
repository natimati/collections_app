import Menu from "../Menu";
import SearchInput from "../SearchInput";
import { Container } from "./style";

function Header() {
  return (
    <Container>
      <div>
        <SearchInput />
      </div>
      <Menu />
    </Container>
  )
};

export default Header; 