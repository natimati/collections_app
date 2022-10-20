import { Container, DetailsContainer, IconContainer } from "./style";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { theme } from "../../style";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext.tsx";

interface Props {
  name: string;
  topic: string;
  authorId: string
}

function CollectionItem(props: Props) {
  const { user } = useContext(UserContext);

  return (
    <Container>
      <DetailsContainer>
        <Typography variant="h2">{props.name}</Typography>
        <Typography variant="h3">{props.topic}</Typography>
        {user && (user.id === props.authorId) && (
          <IconContainer>
            <EditOutlinedIcon sx={{ width: 40, height: 40, fill: theme.palette.primary.contrastText }} />
            <DeleteOutlinedIcon sx={{ width: 40, height: 40, fill: theme.palette.primary.contrastText }} />
          </IconContainer>
        )}
      </DetailsContainer>
    </Container>
  )
};

export default CollectionItem;