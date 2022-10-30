import { useState } from 'react';
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Rating, Stack, Switch, TextField, Typography } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns'
import { Description } from "./style";

interface Props {
  type: string;
  value: string;
  name: string;
  id: string;
  index: number;
  register: UseFormRegister<FormFields>;
  setValue: UseFormSetValue<FormFields>
};

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
    name: string
  }
}
export interface ItemProperty {
  additional_field: {
    name: string;
    type: string;
  }
  additional_field_id: string;
  value: string;
  id: string;
}

type FormFields = Pick<Item, "name" | "image_url"> &
{ item_properties: ItemProperty[] };

function ItemPropertyValue(props: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(() => {
    if (props.type !== 'date' || !props.value) {
      return null;
    }

    const [day, month, year] = props.value.split('/')
    const date = new Date(Number(year), Number(month) - 1, Number(day));

    return date.toDateString();
  });

  const handleDateChange = (newValue: any) => {
    setSelectedDate(newValue);
    props.setValue(
      `item_properties.${props.index}.value`,
      format(newValue, 'dd/MM/yyyy') as unknown as string
    )
  };

  const handleRatingChange = (newValue: number) => {
    props.setValue(
      `item_properties.${props.index}.value`,
      String(newValue)
    );
  }

  if (props.type === 'number') {
    return (
      <TextField
        sx={{ alignSelf: 'center' }}
        type={props.type}
        value={props.value}
        {...props.register(`item_properties.${props.index}.value`, { required: true })}
        label={props.name}
        id={`${props.id}-value`}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
    )
  }
  if (props.type === 'text') {
    return (
      <TextField
        sx={{ alignSelf: 'center' }}
        type={props.type}
        value={props.value}
        {...props.register(`item_properties.${props.index}.value`, { required: true })}
        label={props.name}
        id={`${props.id}-value`}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
    )
  }
  if (props.type === 'multiline_text') {
    return (
      <Description
        theme="snow"
        value={props.value}
        defaultValue={props.value}
        placeholder={props.name}
        onChange={(value: string) => {
          props.setValue(`item_properties.${props.index}.value`, value)
        }}
      />
    )
  }
  if (props.type === 'boolean') {
    return (
      <>
        <Typography variant='body1' sx={{ marginRight: '20px' }}>{props.name}</Typography>
        <Switch
          inputProps={{ 'aria-label': 'controlled' }}
          checked={props.value === '1'}
          onChange={(event) => {
            props.setValue(
              `item_properties.${props.index}.value`,
              event.target.checked ? '1' : '0'
            )
          }}
        />
      </>
    )
  }
  if (props.type === 'date') {
    return (
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
      >
        <Stack sx={{ display: 'flex', alignSelf: 'center', margin: '20px 0' }} spacing={3}>
          <MobileDatePicker
            label={props.name}
            inputFormat="dd/MM/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => {
              return <TextField {...params} />
            }
            }
          />
        </Stack >
      </LocalizationProvider >
    )
  }
  if (props.type === 'rating') {
    return (
      <>
        <Typography variant='body1' sx={{ marginRight: '20px' }}>{props.name}</Typography>
        <Rating
          value={Number(props.value)}
          size="large"
          onChange={(event, newValue) => handleRatingChange(newValue as number)}
          sx={{ color: "#DC9D5F" }}
        />
      </>
    )
  }
  return null;
}

export default ItemPropertyValue;