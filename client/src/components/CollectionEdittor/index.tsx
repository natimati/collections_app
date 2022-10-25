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
import { getCollectionById, updateCollection } from '../../api';
import { useQuery } from '@tanstack/react-query';

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
    control, watch, register, handleSubmit, formState: { errors }, setValue, getValues, reset,
  } = useForm<FormFields>();

  const { data } = useQuery(
    ['collection', params.collectionId],
    () => {
      if (!params.collectionId) { return null }
      return getCollectionById(params.collectionId)
        .then(collection => {
          reset({
            name: collection?.name,
            topic: collection?.topic,
            description: collection?.description,
            image_url: collection?.image_url,
            additional_fields: collection?.additional_fields
          })

          return collection
        })
    }
  );

  const { fields, append, remove } = useFieldArray<FormFields>({ control, name: "additional_fields" });

  const values = watch();

  const handleAddNewFiledClick = () => { append({ name: '', type: 'number' }) };

  const handleRichDescriptionChange = (value: string) => { setValue('description', value) };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (!params.collectionId) {
      return null
    }
    try {
      await updateCollection({
        id: params.collectionId,
        name: data.name,
        topic: data.topic,
        description: data.description,
        image_url: data.image_url,
        additional_fields: data.additional_fields
      });

      return navigate(`/collection/${params.collectionId}`);
    } catch (e) {
      console.log(e)
    }
  };

  const onSubmitError: SubmitHandler<any> = (data) => console.log('err', data, errors);

  return (
    <Container onSubmit={handleSubmit(onSubmit, onSubmitError)}>
      <Typography variant='h1'>Edit your {data?.name} collection</Typography>
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
      {fields.length < 3 && (
        <Button onClick={handleAddNewFiledClick}>
          <AddIcon />
          Add new filed
        </Button>
      )}
      {fields.map((field, index) => {
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
      })}
      <Button variant="contained" type='submit'>update</Button>
    </Container>
  )
};

export default CollectionEditor;
