import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { getCollectionTopicError } from './helpers';

interface Props {
  register: UseFormRegister<FormFields>;
  errors: FieldErrorsImpl<{
    topic: string;
    }>
};

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

const topicList = [
  'books',
  'alkohol',
  'movies',
  'greenery',
  'vehicles',
  'jewellery',
  'outfit',
  'memories',
  'other'
];



function ListOfTopics(props: Props) {
  return (
    <TextField
      id="topic"
      select
      fullWidth
      label="Select collection topic" 
      {...props.register('topic', { required: true })}
      error={!!props.errors.topic}
      helperText={getCollectionTopicError(props.errors)}
         >
      {topicList.map((topic) => (
        <MenuItem key={topic} value={topic}>
          {topic}
        </MenuItem>
      ))}
    </TextField>
  )
};

export default ListOfTopics;