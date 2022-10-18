import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.tsx";
import Spinner from "./style";

interface Props {
  restricted?: boolean;
  children: React.ReactElement;
}

const Auth: React.FC<Props> = ({ restricted, children }: Props): JSX.Element => {
  const { user, isLoading } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (user && !restricted) navigate("/");
    if (!user && restricted) navigate("/login");
  }, [user, isLoading, navigate, restricted]);

  if (isLoading) {
    return (
      <Spinner>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </Spinner>
    );
  }
  return (
    <>
      {children}
    </>
  );
};

Auth.defaultProps = {
  restricted: false,
};

export default Auth;
