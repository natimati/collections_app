import { useContext } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import AddIcon from '@mui/icons-material/Add';
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { AdditionalContainer, Container, Description } from './style';
import { useNavigate } from 'react-router-dom';
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { getAdditionalFieldNameError, getCollectionNameError, getCollectionTopicError } from './helpers';
import { UserContext } from '../../context/UserContext.tsx';
import { createCollection } from '../../api';

interface Collection {
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

function CollectionCreator() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const {
    control, watch, register, handleSubmit, formState: { errors }, setValue, getValues
  } = useForm<FormFields>();

  const { fields, append, remove } = useFieldArray<FormFields>({ control, name: "additional_fields" });

  const values = watch();

  const handleAddNewFiledClick = () => { append({ name: '', type: 'number' }) };

  const handleRichDescriptionChange = (value: string) => { setValue('description', value) };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (!user) {
      return navigate('/login')
    }
    try {
      await createCollection({
        author_id: user.id,
        name: data.name,
        topic: data.topic,
        description: data.description,
        image_url: data.image_url,
        additional_fields: data.additional_fields
      });
      return navigate("/");
    } catch (e) {
      console.log(e)
    }
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
        type='text'
        {...register('topic', { required: true })}
        id='topic'
        label='Topic'
        fullWidth
        error={!!errors.topic}
        helperText={getCollectionTopicError(errors)}
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
              <MenuItem value={'rating'}>rating</MenuItem>
            </Select>
            <Button type='button' onClick={() => remove(index)}>
              <RemoveCircleIcon fontSize='large' />
            </Button>
          </AdditionalContainer>
        )
      })}
      <Button variant="contained" type='submit'>create</Button>
    </Container>
  )
};

export default CollectionCreator;



