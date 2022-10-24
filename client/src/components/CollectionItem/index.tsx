import { Button, Container, DetailsContainer, IconContainer } from "./style";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { theme } from "../../style";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext.tsx";
import { useNavigate } from "react-router-dom";
import { deleteCollection } from "../../api";

interface Props {
  name: string;
  topic: string;
  authorId: string;
  collectionId: string
}

function CollectionItem(props: Props) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteCollection(props.collectionId)
    console.log('collection deleted')
  }

  return (
    <Container>
      <DetailsContainer>
        <Typography variant="h2">{props.name}</Typography>
        <Typography variant="h3">{props.topic}</Typography>
        {user && (user.id === props.authorId) && (
          <IconContainer>
            <Button onClick={() => { navigate(`/collection/${props.collectionId}/edit`)}}>
              <EditOutlinedIcon sx={{ width: 40, height: 40, fill: theme.palette.primary.contrastText }} />
            </Button>
            <Button onClick={handleDelete}>
              <DeleteOutlinedIcon sx={{ width: 40, height: 40, fill: theme.palette.primary.contrastText }} />
            </Button>
          </IconContainer>
        )}
      </DetailsContainer>
    </Container>
  )
};

export default CollectionItem;