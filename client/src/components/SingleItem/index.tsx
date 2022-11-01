import { useContext } from "react";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import Fab from '@mui/material/Fab';
import { UserContext } from "../../context/UserContext.tsx";
import { CommentInfo, Container, DetailsContainer, FooterWrapper, HeaderWrapper, IconContainer } from "./style";
import { theme } from "../../style";
import { useNavigate } from "react-router-dom";
import { deleteItem } from "../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';

interface Props {
  collectionId: string;
  id: string;
  name: string;
  image_url: string;
  author_id: string;
  // tags: {
  //   id: string,
  //   name: string
  // }[];
  commentsCount: number
}

function SingleItem(props: Props) {
  const { user, isAdmin } = useContext(UserContext);
  const client = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteMutation, isLoading: isDeleting } = useMutation((itemId: string) => {
    return deleteItem(itemId).then(() => {
      client.invalidateQueries(['items', props.collectionId])
      toast.success(`Item deleted successfully`)
    });
  });


  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      deleteMutation(props.id)
    } catch (e) {
      toast.error(`Something went wrong. Pls try again`);
      console.log(e);
    }
  };

  return (
    <Container image_url={props.image_url} onClick={() => navigate(`/item/${props.id}`)}>
      <DetailsContainer>
        <HeaderWrapper>
          <Typography
            variant="subtitle1"
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              marginRight: '15px'
            }}
          >
            {props.name}
          </Typography>
          <CommentInfo>
            <Typography variant="subtitle1">{props.commentsCount}</Typography>
            <ChatOutlinedIcon sx={{ width: 40, height: 40, fill: theme.palette.primary.contrastText }} />
          </CommentInfo>
        </HeaderWrapper>
        <FooterWrapper>
          <Typography
            variant='body2'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {/* {props.tags.map((tag) => (
              <span key={tag.id}>#{tag.name}{' '}</span>
            ))} */}
          </Typography>
          {user && (user.id === props.author_id || isAdmin) && (
            <IconContainer>
              <Fab
                size="large"
                color="secondary"
                aria-label="edit"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/item/${props.id}/edit`)
                }}>
                <EditOutlinedIcon sx={{ width: 30, height: 30 }} />
              </Fab>
              <Fab
                size="large"
                color="secondary"
                aria-label="delete"
                disabled={isDeleting}
                onClick={handleDeleteClick}
              >
                <DeleteOutlinedIcon sx={{ width: 30, height: 30 }} />
              </Fab>
            </IconContainer>
          )}
        </FooterWrapper>
      </DetailsContainer>
    </Container >
  )
};

export default SingleItem;