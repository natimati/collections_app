import { Button, Container, DetailsContainer, IconContainer } from "./style";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Fab from '@mui/material/Fab';
import { useContext } from "react";
import { UserContext } from "../../context/UserContext.tsx";
import { useNavigate } from "react-router-dom";
import { deleteCollection } from "../../api";

interface Props {
  name: string;
  topic: string;
  authorId: string;
  collectionId: string;
  image_url: string
}

function CollectionItem(props: Props) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    deleteCollection(props.collectionId)
  }

  return (
    <Container image_url={props.image_url} onClick={() => navigate(`/collection/${props.collectionId}`)}>
      <DetailsContainer>
        <Typography variant="h2">{props.name}</Typography>
        <Typography variant="h3">{props.topic}</Typography>
        {user && (user.id === props.authorId) && (
          <IconContainer>
            <Button onClick={(event) => { event.stopPropagation(); navigate(`/collection/${props.collectionId}/edit`) }}>
              <Fab size="large" color="secondary" aria-label="edit">
                <EditOutlinedIcon sx={{ width: 30, height: 30 }} />
              </Fab>
            </Button>
            <Button onClick={handleDelete}>
              <Fab size="large" color="secondary" aria-label="delete">
                <DeleteOutlinedIcon sx={{ width: 30, height: 30 }} />
              </Fab>
            </Button>
          </IconContainer>
        )}
      </DetailsContainer>
    </Container>
  )
};

export default CollectionItem;