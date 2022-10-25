import { useContext } from "react";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { UserContext } from "../../context/UserContext.tsx";
import { CommentInfo, Container, DetailsContainer, FooterWrapper, HeaderWrapper, IconContainer } from "./style";
import { theme } from "../../style";

interface Props {
  name: string;
  image_url: string;
  author_id: string;
  tags: {
    id: string,
    name: string
  }[];
}

function SingleItem(props: Props) {
  const { user } = useContext(UserContext);

  return (
    <Container image_url={props.image_url}>
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
            <Typography variant="subtitle1">1</Typography>
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
            {props.tags.map((tag) => (
              <span key={tag.id}>#{tag.name}{' '}</span>
            ))}
          </Typography>
          {user && (user.id === props.author_id) && (
            <IconContainer>
              <EditOutlinedIcon sx={{ width: 40, height: 40, fill: theme.palette.primary.contrastText }} />
              <DeleteOutlinedIcon sx={{ width: 40, height: 40, fill: theme.palette.primary.contrastText }} />
            </IconContainer>
          )}
        </FooterWrapper>
      </DetailsContainer>
    </Container >
  )
};

export default SingleItem;