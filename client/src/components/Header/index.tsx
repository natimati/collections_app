import Menu from "../Menu";
import SearchInput from "../SearchInput";
import { Button, Container } from "./style";
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import { theme } from "../../style";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <Container>
      <div>
        <Button onClick={() => navigate("/")}>
          <PermMediaOutlinedIcon
            sx={{
              fontSize: '5rem',
              fill: `${theme.palette.secondary.main}`,
              cursor: 'pointer',
            }}
          />
        </Button>
        <SearchInput />
      </div>
      <Menu />
    </Container>
  )
};

export default Header; 