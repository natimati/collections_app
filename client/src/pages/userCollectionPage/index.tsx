import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CollectionItem from "../../components/CollectionItem";
import { useQuery } from '@tanstack/react-query'
import { getUserCollections } from '../../api';
import { collectionsMock } from './mock';
import Header from '../../components/Header';
import CreateElementButton from '../../components/CreateElementButton';
import { useParams } from 'react-router-dom';

function UserCollectionPage() {
  const params = useParams();

  const { data } = useQuery(
    ['collections', params.userId],
    () => {
      if (!params.userId) { return null }
      return getUserCollections(params.userId)
    }
  );
  const userCollections = data || [];

  if (!params.userId) {
    return null
  };

  return (
    <>
      <Header />
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
          {collectionsMock.map((collection) => (
            <Grid item desktop={6} tablet={12} mobile={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: 'fit-content',
                alignSelf: 'center',
              }}
            >
              <CollectionItem
                key={collection.id}
                authorId={collection.author_id}
                name={collection.name}
                topic={collection.topic}
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
    </>
  )
};

export default UserCollectionPage;