import { useContext } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import AddIcon from '@mui/icons-material/Add';
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { AdditionalContainer, Container, Description } from './style';
import { useNavigate } from 'react-router-dom';
import { Button, Fab, InputAdornment, TextField, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RemoveIcon from '@mui/icons-material/Remove';
import { getAdditionalFieldNameError, getCollectionNameError, getCollectionTopicError } from './helpers';
import { UserContext } from '../../context/UserContext.tsx';
import { createCollection } from '../../api';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

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
  const { user } = useContext(UserContext);
  const { mutateAsync, isLoading } = useMutation(
    (data: { userId: string, values: FormFields }) => {
      return createCollection({
        author_id: data.userId,
        name: data.values.name,
        topic: data.values.topic,
        description: data.values.description,
        image_url: data.values.image_url,
        additional_fields: data.values.additional_fields
      })
    })

  const {
    control, watch, register, handleSubmit, formState: { errors }, setValue
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
      await mutateAsync({
        userId: user.id, values: {
          name: data.name,
          topic: data.topic,
          description: data.description,
          image_url: data.image_url,
          additional_fields: data.additional_fields
        }
      });
      toast.success('Collection created');
      return navigate("/");
    } catch (e) {
      toast.error('Something went wrong. Pls try again');
      console.log(e)
    }
  };

  const onSubmitError: SubmitHandler<any> = (data) => console.log('err', data, errors);

  return (
    <>
      <Typography
        variant='h1'
        sx={{
          margin: '20px',
          marginTop: '50px'
        }}
      >
        Create new collection
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
                defaultValue={'number'}
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
        <Button
          variant="contained"
          type='submit'
          color='secondary'
          sx={{
            margin: '10px',
            alignSelf: 'center',
            width: '200px',
            height: '50px'
          }}
          disabled={isLoading}
        >
          create
        </Button>
      </Container>
    </>
  )
};

export default CollectionCreator;



