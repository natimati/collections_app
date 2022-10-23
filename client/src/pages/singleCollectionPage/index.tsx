import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCollectionById, getItemsByCollectionId } from "../../api";
import { collectionsMock, itemsMock } from "./mock";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Header from "../../components/Header";
import SingleItem from "../../components/SingleItem";
import CreateElementButton from "../../components/CreateElementButton";


function SingleCollectionPage() {
  const params = useParams();

  const { data: collectionData } = useQuery(
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

  const collection = collectionData;
  const items = itemsData;

  return (
    <>
      <Header />
      <div>
        <Typography variant='h1'>{collectionsMock[0].name}</Typography>
        <Typography variant='h3'>{collectionsMock[0].topic}</Typography>
        <Typography variant="body1">{collectionsMock[0].description}</Typography>
      </div>
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
          {itemsMock.map((item) => (
            <Grid item desktop={6} tablet={12} mobile={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: 'fit-content',
                alignSelf: 'center',
              }}
            >
              <SingleItem
                name={item.name}
                image_url={item.image_url}
                author_id={item.author_id}
                tags={item.tags}
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
              authorId={collectionsMock[0].author_id}
              urlAdress='collection/new'
            />
          </Grid>
        </Grid>
      </Container>
    </>
  )
};

export default SingleCollectionPage;