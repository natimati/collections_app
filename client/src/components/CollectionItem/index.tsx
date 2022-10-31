import { Button, Container, DetailsContainer, IconContainer } from "./style";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Fab from '@mui/material/Fab';
import { useContext } from "react";
import { UserContext } from "../../context/UserContext.tsx";
import { useNavigate } from "react-router-dom";
import { deleteCollection } from "../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';

interface Props {
  name: string;
  topic: string;
  authorId: string;
  collectionId: string;
  image_url: string
  }

function CollectionItem(props: Props) {
  const { user, isAdmin } = useContext(UserContext);
  const navigate = useNavigate();
  const client = useQueryClient();
  const { mutate: deleteMutation, isLoading: isDeleting } = useMutation(
    (collectionId: string) => {
      return deleteCollection(collectionId).then(() => {
        client.invalidateQueries(['collections', props.authorId])
        toast.success('Collection delated successfully')
      });
    });

  console.log(props);

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    try {
      deleteMutation(props.collectionId)
    } catch (e) {
      toast.error(`Something went wrong. Pls try again`);
      console.log(e);
    }
  };

  return (
    <Container image_url={props.image_url} onClick={() => navigate(`/collection/${props.collectionId}`)}>
      <DetailsContainer>
        <Typography variant="h2">{props.name}</Typography>
        <Typography variant="body2">{props.topic}</Typography>
        {user && (user.id === props.authorId || isAdmin) && (
          <IconContainer>
            <Fab
              size="large"
              color="secondary"
              aria-label="edit"
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/collection/${props.collectionId}/edit`)
              }}
            >
              <EditOutlinedIcon sx={{ width: 30, height: 30 }} />
            </Fab>
            <Fab
              size="large"
              color="secondary"
              aria-label="delete"
              disabled={isDeleting}
              onClick={handleDelete}>
              <DeleteOutlinedIcon sx={{ width: 30, height: 30 }} />
            </Fab>
          </IconContainer>
        )}
      </DetailsContainer>
    </Container>
  )
};

export default CollectionItem;