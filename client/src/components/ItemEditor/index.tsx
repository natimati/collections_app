import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Container, Wrapper } from './style';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, InputAdornment, TextField, Typography } from '@mui/material';
import { getItemNameError } from './helpers';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getItemById, updateItem } from '../../api';
import ItemPropertyValue, { ItemProperty } from './ItemPropertyValue';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

interface Item {
  collection_id: string;
  author_id: string;
  name: string;
  image_url: string;
  item_properties: ItemProperty[];
  author: {
    id: string;
    username: string;
  }
  collection: {
    id: string;
    name: string,
    additional_fields: {
      id: string;
      name: string;
      type: string;
    }[]
  }
}

type FormFields = Pick<Item, "name" | "image_url"> &
{ item_properties: ItemProperty[] };

function ItemEditor() {
  const navigate = useNavigate();
  const params = useParams();
  const { mutateAsync, isLoading: isEditing } = useMutation(
    (data: { itemId: string, collectionId: string, authorId: string, values: FormFields }) => {
      return updateItem({
        id: data.itemId,
        collection_id: data.collectionId,
        author_id: data.authorId,
        name: data.values.name,
        image_url: data.values.image_url,
        item_properties: data.values.item_properties
      });
    }
  ); 

  const {
    control, watch, register, handleSubmit, formState: { errors }, setValue, reset
  } = useForm<FormFields>();
  const { fields } = useFieldArray<FormFields>({ control, name: "item_properties" });

  const { data: item, isLoading } = useQuery(
    ['item', params.itemId],
    () => {
      if (!params.itemId) {
        return null
      }

      return getItemById(params.itemId)
    }
  );

  useEffect(() => {
    if (!item) {
      return;
    }

    reset({
      name: item.name,
      image_url: item.image_url,
      item_properties: item.collection.additional_fields.map(field => {
        const property = item.item_properties.find(property => property.additional_field_id === field.id)

        if (property) {
          return property
        }

        return {
          additional_field_id: field.id,
          additional_field: field,
          itemId: item.id,
          collection_id: item.collection_id,
          name: field.name,
          type: field.type,
          value: ''
        }
      })
    })
  }, [item, reset])

  const values = watch();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (!item || !params.itemId) {
      return
    }
    try {
      await mutateAsync({
        itemId: params.itemId,
        collectionId: item.collection_id,
        authorId: item.author_id,
        values: {
        name: data.name,
        image_url: data.image_url,
        item_properties: data.item_properties
      }});
      toast.success(`Item ${data.name} edited successfully`);
      return navigate(`/item/${item.id}`);
    } catch (e) {
      toast.error('Something went wrong. Pls try again');
      console.log(e)
    }
  };

  const onSubmitError: SubmitHandler<any> = (data) => console.log('err', data, errors);
  if (!item) { return null }

  if (isLoading) {
    return (
      <Box sx={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <>
      <Typography
        sx={{
          marginTop: '50px',
          display: 'flex',
          justifyContent: 'center'
        }}
        variant='h1'>
        Edit {item.name} item
      </Typography>
      <Typography
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '50px',
        }}
        variant='subtitle2'>
        in {item?.collection?.name} collection
      </Typography>
      <Container onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        <TextField
          type='text'
          {...register('name', { required: true })}
          id='name'
          label='Title'
          fullWidth
          error={!!errors.name}
          helperText={getItemNameError(errors)}
        />
        <TextField
          InputProps={{
            startAdornment: (
              < InputAdornment position="start">
                <AddPhotoAlternateOutlinedIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          color='primary'
          id='image-url'
          {...register('image_url')}
          type='text'
          placeholder="Add image url adress"
        />
        {fields.map((field, index) => {
          if (!field.additional_field) {
            return null;
          }

          return (
            <Wrapper key={field.id}>
              <ItemPropertyValue
                type={field.additional_field.type}
                value={values.item_properties[index].value}
                name={field.additional_field.name}
                id={field.id}
                index={index}
                register={register}
                setValue={setValue}
              />
            </Wrapper>
          )
        })}
        <Button
          sx={{
          margin: '10px',
          alignSelf: 'center',
          width: '200px',
          height: '50px'
          }}
          disabled={isEditing}
          variant="contained"
          type='submit'
          color='secondary'
        >
          update
        </Button>
      </Container>
    </>
  )
};

export default ItemEditor;
