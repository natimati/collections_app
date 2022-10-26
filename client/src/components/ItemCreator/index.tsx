import { useContext, useEffect } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Container } from './style';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import { getItemNameError } from './helpers';
import { UserContext } from '../../context/UserContext.tsx';
import { useQuery } from '@tanstack/react-query';
import { createItem, getCollectionById } from '../../api';
import ItemPropertyField from './ItemPropertyField';

interface Item {
  collection_id: string;
  author_id: string;
  name: string;
  image_url: string;
  item_properties: ItemProperty[];
}
interface ItemProperty {
  name: string;
  value: string;
  additional_field_id: string;
  type: string;
}

type FormFields = Pick<Item, "name" | "image_url"> &
{ item_properties: ItemProperty[] };

function ItemCreator() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const params = useParams();

  const {
    control, watch, register, handleSubmit, formState: { errors }, setValue, getValues, reset
  } = useForm<FormFields>();

  const { fields } = useFieldArray<FormFields>({ control, name: "item_properties" });

  const values = watch();

  const { data: collection } = useQuery(
    ['collection', params.collectionId],
    () => {
      if (!params.collectionId) { return null }
      return getCollectionById(params.collectionId)
    }
  );

  useEffect(() => {
    if (!collection || !collection.additional_fields) {
      return;
    }

    reset({
      item_properties: collection.additional_fields
        .map((field: {
          id: string,
          name: string,
          type: string
        }) => {
          return {
            additional_field_id: field.id,
            name: field.name,
            type: field.type,
            value: ''
          }
        })
    })
  }, [collection, reset])

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (!user) {
      return navigate('/login')
    }
    if (!params.collectionId) {
      return 
    }
    const collectionId = params.collectionId;
    try {
      await createItem({
        collection_id: collectionId,
        author_id: user.id,
        name: data.name,
        image_url: data.image_url,
        item_properties: data.item_properties.map(item => {
          return {
            additional_field_id: item.additional_field_id,
            collection_id: collectionId,
            value: item.value   
        }
        })
      });
      return navigate("/");
    } catch (e) {
      console.log(e)
    }
  };

  const onSubmitError: SubmitHandler<any> = (data) => console.log('err', data, errors);

  return (
    <Container onSubmit={handleSubmit(onSubmit, onSubmitError)}>
      <Typography variant='h1'>{collection?.name} collection new item </Typography>
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
        return (
          <ItemPropertyField
            key={`${field.id}-value`}
            type={field.type}
            value={values.item_properties[index].value}
            register={register}
            index={index}
            name={field.name}
            id={`${field.id}-value`}
            errors={errors}
            setValue={setValue}
          />
        )
      })}
      <Button variant="contained" type='submit'>create</Button>
    </Container>
  )
};

export default ItemCreator;
