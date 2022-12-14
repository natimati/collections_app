import { useContext } from "react";
import { Container } from "./style";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.tsx";

interface Props {
  authorId: string
  urlAdress: string
}

function CreateElementButton(props: Props) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <>
      {user && (user.id === props.authorId) && (
        <Container onClick={() => navigate(`/${props.urlAdress}`)}>
          <AddIcon sx={{
            display: 'flex',
            alignSelf: 'center',
            fill: 'white',
            margin: '0 auto',
            fontSize: '10rem',
          }} />
        </Container>)}
    </>
  )
};

export default CreateElementButton;