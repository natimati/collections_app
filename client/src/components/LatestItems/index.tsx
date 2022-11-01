import { getLatestItems } from "../../api"
import { Container, ImageContainer, Overlay, TextContainer } from "./style";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

function LatestItems() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: latestItems = [] } = useQuery(['latest'], () => {
    return getLatestItems();
  })

  return (
    <Container>
      <Typography
        sx={{
          textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',
        }}
        variant='h1'>{t(`latest`)}</Typography>
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
                    <Typography variant='subtitle1' sx={{
                      textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',
                    }}>{item.name}</Typography>
                    <Typography variant='body2' style={{
                      textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',
                    }}>in {item.collection.name} collection</Typography>
                    <Typography variant='body2' style={{
                      textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',
                    }}>by {item.author.username}</Typography>
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