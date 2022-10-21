import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCollectionById } from "../../api";
import { collectionsMock } from "./mock";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";


function SingleCollectionPage() {
  const params = useParams();

  const { isLoading, error, data } = useQuery(
    ['collection', params.collectionId],
    () => {
      if (!params.collectionId) { return null }
      return getCollectionById(params.collectionId);
    }
  );

  const collection = collectionsMock[0]; //data

  return (
    <>
      <Header />
      <div>
        <Typography variant='h1'>{collection.name}</Typography>
        <Typography variant='h3'>{collection.topic}</Typography>
        <Typography variant="body1">{collection.description}</Typography>
      </div>
    </>
  )
};

export default SingleCollectionPage;