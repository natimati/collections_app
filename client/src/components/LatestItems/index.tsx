import React, { useEffect, useState } from "react";
import { getLatestItems } from "../../api"
import Grid from '@mui/material/Grid';
import { ImageContainer, Overlay } from "./style";
import { Typography } from "@mui/material";

type Item = {
  id: string;
  collection_id: string;
  author_id: string;
  name: string
  image_url: string;
  created_at: number;
  updated: number
}

function LatestItems() {
  const [latestItems, setLatestItems] = useState<Item[]>([]);

  useEffect(() => {
    getLatestItems().then((data) => {
      setLatestItems(data);
    })
  }, []);

  return (
    <Grid container rowSpacing={1} columnSpacing={{ mobile: 1, tablet: 2 }}>
      {latestItems.map( item => {
        return (
          <>
            <ImageContainer imageUrl={item.image_url}>
              <Overlay>
                <Typography variant='h3'>{item.name}</Typography>
                <Typography variant='subtitle1'>
                  {item.collection_id} by {item.author_id}
                </Typography>               
              </Overlay>
            </ImageContainer>
          </>
        );
      })}
    </Grid>
  )
};

export default LatestItems;