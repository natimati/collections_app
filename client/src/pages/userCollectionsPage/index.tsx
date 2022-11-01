import { Box, CircularProgress, Container, Grid} from '@mui/material';
import CollectionItem from "../../components/CollectionItem";
import { useQuery } from '@tanstack/react-query'
import { getUserCollections } from '../../api';
import CreateElementButton from '../../components/CreateElementButton';
import { useParams } from 'react-router-dom';

function UserCollectionsPage() {
  const params = useParams();

  const { data: userCollections = [], isLoading } = useQuery(
    ['collections', params.userId],
    () => {
      if (!params.userId) { return null }
      return getUserCollections(params.userId)
    }
  );

  if (!params.userId) {
    return null
  };
  if (!userCollections) { return null };
  
  if (isLoading) {
    return (
      <Box sx={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  };

  return (
    <Container maxWidth='desktop'>
        <Grid
          container
          rowSpacing={5}
          columnSpacing={{ laptop: 10 }}
          sx={{
            display: 'flex',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {userCollections.map((collection) => (
            <Grid
              key={collection.id}
              item
              desktop={6} tablet={12} mobile={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: 'fit-content',
                alignSelf: 'center',
              }}
            >
              <CollectionItem
                authorId={collection.author_id}
                name={collection.name}
                topic={collection.topic}
                collectionId={collection.id}
                image_url={collection.image_url}
              />
            </Grid>
          ))}
          <Grid item desktop={6} tablet={12} mobile={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: 'fit-content',
              alignSelf: 'center',
            }}
          >
            <CreateElementButton
              authorId={params.userId}
              urlAdress='collection/new'
            />
          </Grid>
        </Grid>
      </Container>
  )
};

export default UserCollectionsPage;