import Menu from "../Menu";
import SearchInput from "../SearchInput";
import { Button, Container } from "./style";
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import { theme } from "../../style";
import { useLocation, useNavigate, matchPath } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation()
  const isLoginPage = matchPath(pathname, '/login');
  const isRegisterPage = matchPath(pathname, '/register')

  if (isLoginPage || isRegisterPage) {
    return null;
  }

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