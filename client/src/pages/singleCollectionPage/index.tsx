import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCollectionById, getItemsByCollectionId } from "../../api";
import { itemsMock } from "./mock";
import { Box, CircularProgress, Container, Grid, Typography } from "@mui/material";
import SingleItem from "../../components/SingleItem";
import CreateElementButton from "../../components/CreateElementButton";
import { StyledLink } from "../../style";


function SingleCollectionPage() {
  const params = useParams();

  const { data: collection, isLoading } = useQuery(
    ['collection', params.collectionId],
    () => {
      if (!params.collectionId) { return null }
      return getCollectionById(params.collectionId);
    }
  );

  const { data: itemsData } = useQuery(
    ['items', params.collectionsId],
    () => {
      if (!params.collectionId) { return null }
      return getItemsByCollectionId(params.collectionId);
    }
  );

  const items = itemsData || [];
  if (isLoading) {
    return (
      <Box sx={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <Container sx={{ maxWidth: '1400px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', margin: '0 auto' }}>
      <div>
        <Typography variant='h1'>
          {collection.name} by <StyledLink to={`/collections/${collection.author_id}`}>{collection.author.username}</StyledLink>
        </Typography>
        <Typography variant='h3'>{collection.topic}</Typography>
        <Typography variant='body1' dangerouslySetInnerHTML={{__html: collection.description}} sx={{ width: 'fit-content', backgroundColor: '#ffffffCC', maxWidth: '1400px' }} />
      </div>
      <Container maxWidth='desktop' sx={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
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
          {items.map((item) => (
            <Grid
              key={item.id}
              item
              desktop={6}
              tablet={12}
              mobile={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: 'fit-content',
                alignSelf: 'center',
              }}
            >
              <SingleItem
                name={item.name}
                id={item.id}
                image_url={item.image_url}
                author_id={item.author_id}
                tags={itemsMock[0].tags}
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
              authorId={collection?.author_id}
              urlAdress={`collection/${collection?.id}/new-item`}
            />
          </Grid>
        </Grid>
      </Container>
    </Container>
  )
};

export default SingleCollectionPage;