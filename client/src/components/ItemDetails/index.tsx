import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getItemById } from "../../api";
import { Container, ItemImage, PropertiesContainer, TextContainer, Wrapper } from "./style";
import { Box, CircularProgress, Typography } from '@mui/material';
import ItemProperty from "./ItemProperty";
import { format, formatDistanceToNow } from 'date-fns'
import { StyledLink } from "../../style";
interface Property {
  additional_field: {
    name: string,
    type: string
  }
  id: string,
  additional_field_id: string,
  value: string,
}

function ItemDetails() {
  const params = useParams();

  const { data: item, isLoading } = useQuery(
    ['item', params.itemId],
    () => {
      if (!params.itemId) {
        return
      }
      return getItemById(params.itemId)
    }
  );

  if (!item) {
    return null
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Wrapper>
      <TextContainer>
        <Typography variant='h1'>{item.name}</Typography>
        <Typography variant="subtitle2">in <StyledLink to={`/collection/${item.collection_id}`}>{item.collection.name} collection</StyledLink></Typography>
        <Typography variant="subtitle2">by <StyledLink to={`/collections/${item.author_id}`}>{item.author.username}</StyledLink></Typography>
      </TextContainer>
      <Container>
        <ItemImage src={item.image_url} alt={item.name} />
        <PropertiesContainer>
          <Typography>
            Created at: {format(new Date(item.created_at), 'do MMMM yyyy')}
          </Typography>
          <Typography sx={{ marginTop: '10px' }}>
            Last update {formatDistanceToNow(new Date(item.updated_at))}
          </Typography>
          {item.item_properties.map((property: Property) => {
            if (!property.additional_field) {
              return null
            }
            return (
              <ItemProperty
                key={property.id}
                type={property.additional_field.type}
                name={property.additional_field.name}
                value={property.value}
              />
            )
          })}
        </PropertiesContainer>
      </Container>
    </Wrapper>
  )
};

export default ItemDetails;

