import { useEffect } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import AddIcon from '@mui/icons-material/Add';
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { AdditionalContainer, Container, Description } from './style';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Box, CircularProgress, Fab, InputAdornment, TextField, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RemoveIcon from '@mui/icons-material/Remove';
import { getAdditionalFieldNameError, getCollectionNameError, getCollectionTopicError } from './helpers';
import { getCollectionById, updateCollection } from '../../api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface Collection {
  id: string;
  name: string;
  topic: string;
  description: string;
  image_url: string;
}

type FormFields = Pick<
  Collection,
  "name" | "topic" | "description" | "image_url"> &
{
  additional_fields: {
    name: string;
    type: string
  }[]
};

function CollectionEditor() {
  const navigate = useNavigate()
  const params = useParams();
  const {
    control, watch, register, handleSubmit, formState: { errors }, setValue, reset,
  } = useForm<FormFields>();

  const { data: collection, isLoading } = useQuery(
    ['collection', params.collectionId],
    () => {
      if (!params.collectionId) { return null }
      return getCollectionById(params.collectionId)
    }
  );

  const { mutateAsync, isLoading: isEditing } = useMutation(
    (data: { collectionId: string, values: FormFields }) => {
    return updateCollection({
      id: data.collectionId,
      name: data.values.name,
      topic: data.values.topic,
      description: data.values.description,
      image_url: data.values.image_url,
      additional_fields: data.values.additional_fields
    })
  })

  const { fields, append, remove, replace } = useFieldArray<FormFields>({ control, name: "additional_fields" });

  useEffect(() => {
    if (!collection) {
      return;
    }
    reset({
      name: collection.name,
      topic: collection.topic,
      description: collection.description,
      image_url: collection.image_url,
      additional_fields: collection.additional_fields
    })
    replace(collection.additional_fields)
  }, [collection, reset, replace])

  const values = watch();

  const handleAddNewFiledClick = () => { append({ name: '', type: 'number' }) };

  const handleRichDescriptionChange = (value: string) => { setValue('description', value) };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (!params.collectionId) {
      return null
    }
    try {
      await mutateAsync({
        collectionId: params.collectionId, values: {
        name: data.name,
        topic: data.topic,
        description: data.description,
        image_url: data.image_url,
          additional_fields: data.additional_fields
        }
      });
      toast.success('Collection edited successfully');
      return navigate(`/collection/${params.collectionId}`);
    } catch (e) {
      toast.error('Something went wrong. Pls try again');
      console.log(e)
    }
  };

  const onSubmitError: SubmitHandler<any> = (data) => console.log('err', data, errors);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Typography variant='h1'
        sx={{
          margin: '20px',
          marginTop: '50px'
        }}
      >
        Edit your {collection.name} collection
      </Typography>
      <Container onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        <TextField
          type='text'
          {...register('name', { required: true })}
          id='name'
          label='Title'
          fullWidth
          error={!!errors.name}
          helperText={getCollectionNameError(errors)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type='text'
          {...register('topic', { required: true })}
          id='topic'
          label='Topic'
          fullWidth
          error={!!errors.topic}
          helperText={getCollectionTopicError(errors)}
          InputLabelProps={{ shrink: true }}
        />
        <Description
          theme="snow"
          value={values.description}
          placeholder='Describe your collection'
          onChange={handleRichDescriptionChange}
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
          InputLabelProps={{ shrink: true }}
        />
        {fields.map((field, index) => {
          return (
            <AdditionalContainer key={field.id}>
              <TextField
                type='text'
                {...register(`additional_fields.${index}.name`, { required: true })}
                label='Name'
                id={`${field.id}-name`}
                error={!!errors.name}
                helperText={getAdditionalFieldNameError(errors)}
                sx={{
                  width: '60%'
                }}
              />
              <Select
                {...register(`additional_fields.${index}.type`, { required: true })}
                id={`${field.id}-type`}
                label='Type'
                variant='outlined'
                defaultValue={field.type}
                sx={{
                  width: '30%',
                }}
              >
                <MenuItem value={'number'}>number</MenuItem>
                <MenuItem value={'text'}>text</MenuItem>
                <MenuItem value={'multiline_text'}>multiline text</MenuItem>
                <MenuItem value={'boolean'}>boolean</MenuItem>
                <MenuItem value={'date'}>date</MenuItem>
                <MenuItem value={'rating'}>rating</MenuItem>
              </Select>
              <Fab
                color="secondary"
                aria-label="remove"
                size='small'
                onClick={() => remove(index)}>
                <RemoveIcon fontSize='medium' />
              </Fab>
            </AdditionalContainer>
          )
        })}
        {fields.length < 3 && (
          <Button
            onClick={handleAddNewFiledClick}
            color='secondary'
            sx={{
              alignSelf: 'center',
            }}
          >
            <AddIcon />
            Add new filed
          </Button>
        )}
        <Button variant="contained"
          type='submit'
          color='secondary'
          disabled={isEditing}
          sx={{
            margin: '10px',
            alignSelf: 'center',
            width: '200px',
            height: '50px'
          }}
        >update
        </Button>
      </Container>
    </>
  )
};

export default CollectionEditor;
