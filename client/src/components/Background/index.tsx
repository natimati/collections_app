import { matchPath, useLocation } from "react-router-dom";
import { LeftCloud, RightCloud, TopCloud } from "./style";

function Background() {
  const { pathname } = useLocation()
  const isLoginPage = matchPath(pathname, '/login');
  const isRegisterPage = matchPath(pathname, '/register')

  if (isLoginPage || isRegisterPage) {
    return null;
  }

  return (
    <>
      <TopCloud src='/assets/dots_1.png' />
      <LeftCloud src='/assets/dots_2.png' />
      <RightCloud src='/assets/dots_3.png' />
    </>
  )
};

export default Background;