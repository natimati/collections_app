import { useContext } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import AddIcon from '@mui/icons-material/Add';
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { AdditionalContainer, Container, Description } from './style';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { getAdditionalFieldNameError, getCollectionNameError, getCollectionTopicError } from './helpers';
import { UserContext } from '../../context/UserContext.tsx';
import { useQuery } from '@tanstack/react-query';
import { getCollectionById } from '../../api';

interface Item {
  collection_id: string;
  author_id: string;
  name: string;
  image_url: string;
}

type FormFields = Pick<Item, "name" | "image_url">

function ItemCreator() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const params = useParams();

  const {
    control, register, handleSubmit, formState: { errors }, setValue, getValues, reset
  } = useForm<FormFields>();

  const values = getValues();

  const { data } = useQuery(
    ['collection', params.collectionId],
    () => {
      if (!params.collectionId) { return null }
      return getCollectionById(params.collectionId)
        .then(collection => {
          // reset({
          //   additional_fields: collection?.additional_fields
          // })
          return collection
        })
    }
  );

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (!user) {
      return navigate('/login')
    }
    //   try {
    //     await createCollection({
    //       collection_id: params.collection_id,
    //       author_id: user.id,
    //       name: data.name,
    //       image_url: data.image_url,
    //       item_properties: data.item_properties
    //     });
    //     return navigate("/");
    //   } catch (e) {
    //     console.log(e)
    //   }
  };

  const onSubmitError: SubmitHandler<any> = (data) => console.log('err', data, errors);

  return (
    <Container onSubmit={handleSubmit(onSubmit, onSubmitError)}>
      <Typography variant='h1'>Create new collection</Typography>
      <TextField
        type='text'
        {...register('name', { required: true })}
        id='name'
        label='Title'
        fullWidth
        error={!!errors.name}
        helperText={getCollectionNameError(errors)}
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
      {/* {fields.map((field, index) => {
          return (
            <AdditionalContainer key={field.id}>
              <TextField
                type='text'
                {...register(`additional_fields.${index}.name`, { required: true })}
                label='Name'
                id={`${field.id}-name`}
                fullWidth
                error={!!errors.name}
                helperText={getAdditionalFieldNameError(errors)}
              />
              <Select
                {...register(`additional_fields.${index}.type`, { required: true })}
                id={`${field.id}-type`}
                label='Type'
                variant='outlined'
                fullWidth
                defaultValue={'number'}
              >
                <MenuItem value={'number'}>number</MenuItem>
                <MenuItem value={'text'}>text</MenuItem>
                <MenuItem value={'multiline_text'}>multiline text</MenuItem>
                <MenuItem value={'boolean'}>boolean checkbox</MenuItem>
                <MenuItem value={'date'}>date</MenuItem>
              </Select>
              <Button type='button' onClick={() => remove(index)}>
                <RemoveCircleIcon fontSize='large' />
              </Button>
            </AdditionalContainer>
          )
        })} */}
      <Button variant="contained" type='submit'>create</Button>
    </Container>
  )
};

export default ItemCreator;
