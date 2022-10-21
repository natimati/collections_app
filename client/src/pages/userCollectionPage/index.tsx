import { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CollectionItem from "../../components/CollectionItem";
import { UserContext } from '../../context/UserContext.tsx';
import { useQuery } from '@tanstack/react-query'
import { getUserCollections } from '../../api';
import { collectionsMock } from './mock';
import Header from '../../components/Header';
import CreateCollection from '../../components/CreateCollection';

function UserCollectionPage() {
  const { user } = useContext(UserContext);
  const { isLoading, error, data } = useQuery(
    ['collections'],
    () => {
      if (!user) { return }
      getUserCollections(user.id)
    }
  );
  const userCollections = data || [];

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
            <CreateCollection authorId={collectionsMock[0].author_id} />  
          </Grid>
      </Grid>
      </Container>
    </>
  )
};

export default UserCollectionPage;