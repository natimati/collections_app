import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getItemById } from "../../api";
import { Container, ItemImage, PropertiesContainer, TextContainer, Wrapper } from "./style";
import { Typography } from '@mui/material';
import ItemProperty from "./ItemProperty";
import { format, formatDistanceToNow } from 'date-fns'


interface Item {
  id: string;
  name: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  item_properties: {
    additional_field: {
      name: string,
      type: string,
    }
    id: string,
    additional_field_id: string,
    value: string,
  }[];
  collection: {
    name: string
  }
  author: {
    username: string
  };
}

interface ItemProperty {
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

  const { data: item } = useQuery(
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
  
   return (
    <Wrapper>
      <TextContainer>
        <Typography variant='h1'>{item.name}</Typography>
        <Typography variant="subtitle2" sx={{marginLeft: '25px'}}>in {item.collection.name} collection</Typography>
        <Typography variant="subtitle2" sx={{ marginLeft: '25px' }}>by {item.author.username}</Typography>
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
          {item.item_properties.map((property: ItemProperty) => {
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

