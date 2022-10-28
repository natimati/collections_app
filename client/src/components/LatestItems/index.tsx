import React, { useEffect, useState } from "react";
import { getLatestItems } from "../../api"
import { Container, ImageContainer, Overlay, TextContainer } from "./style";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Item = {
  id: string;
  collection_id: string;
  author_id: string;
  name: string
  image_url: string;
  author: {
    username: string
  };
  collection: {
    name: string
  };
}

function LatestItems() {
  const [latestItems, setLatestItems] = useState<Item[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLatestItems().then((data) => {
      setLatestItems(data);
    })
  }, []);

  return (
    <Container>
      <Typography variant='h1'>Latest items</Typography>
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
        {latestItems.map((item) => {
          return (
            <Grid
              key={item.id}
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
              <ImageContainer imageUrl={item.image_url} onClick={() => navigate(`item/${item.id}`)}>
                <Overlay>
                  <TextContainer>
                    <Typography variant='subtitle1'>{item.name}</Typography>
                    <Typography variant='body2'>in {item.collection.name} collection</Typography>
                    <Typography variant='body2'>by {item.author.username}</Typography>
                  </TextContainer>
                </Overlay>
              </ImageContainer>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  )
};

export default LatestItems;