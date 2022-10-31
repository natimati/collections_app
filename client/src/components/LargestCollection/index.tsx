import { useNavigate } from 'react-router-dom';
import { getLargestCollections } from '../../api';
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { Container, ImageContainer, Overlay, TextContainer } from './style';
import { useQuery } from '@tanstack/react-query';


interface Collection {
  id: string;
  name: string;
  topic: string;
  image_url: string;
  author: {
    id: string;
    username: string;
  }
}

function LargestCollections() {
  const navigate = useNavigate();

  const { data: largestCollections = [], isLoading } = useQuery<Collection[]>(
    ['collections'], () => { return getLargestCollections() }
  );

  if (isLoading) {
    <Box
      sx={{
        height: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <CircularProgress />
    </Box>
  };

  return (
    <Container>
      <Typography variant='h1'>Largest collections</Typography>
      <Grid
        container
        rowSpacing={5}
        columnSpacing={{ laptop: 5 }}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          margin: '0 auto',
        }}
      >
        {largestCollections.map((collection) => {
          return (
            <Grid
              key={collection.id}
              item
              desktop={2}
              laptop={6}
              tablet={12}
              mobile={12}
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                width: 'fit-content',
                alignSelf: 'center',
              }}
            >
              <ImageContainer
                imageUrl={collection.image_url}
                onClick={() => navigate(`/collection/${collection.id}`)}
              >
              <Overlay>
                <TextContainer>
                  <Typography variant='subtitle1'>{collection.name}</Typography>
                  <Typography variant='body2'>by {collection.author.username} </Typography>
                </TextContainer>
                </Overlay>
                </ImageContainer>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
};

export default LargestCollections;