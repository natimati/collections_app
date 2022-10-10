import { Background, Container } from './style'
import Login from './Login';
import Register from './Register';

interface Props {
  isLogin?: boolean;
}
function AuthForm(props: Props) {
 

  return (
    <Background>
      <Container>
        {props.isLogin ? (<Login />) : <Register />}
      </Container>
    </Background>
  )
};

export default AuthForm;