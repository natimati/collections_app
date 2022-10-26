import { FieldErrorsImpl, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Rating, Stack, Switch, TextField, Typography } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { getItemPropertyFieldError } from "./helpers";
import { Description } from "./style";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react'
import { format } from 'date-fns'
import { Container } from "@mui/system";

interface Props {
  type: string;
  value: string;
  register: UseFormRegister<FormFields>;
  index: number;
  name: string;
  id: string;
  errors: FieldErrorsImpl<FormFields>
  setValue: UseFormSetValue<FormFields>
}

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

const ItemPropertyField = (props: Props) => {
  const [selectedDate, setSelectedDate] = useState<string | null>();
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
        type={props.type}
        {...props.register(`item_properties.${props.index}.value`, { required: true })}
        label={props.name}
        id={`${props.id}-value`}
        fullWidth
        error={!!props.errors.item_properties?.[props.index]?.value}
        helperText={getItemPropertyFieldError(props.errors)}
      />
    )
  }

  if (props.type === 'text') {
    return (
      <TextField
        type={props.type}
        {...props.register(`item_properties.${props.index}.value`, { required: true })}
        label={props.name}
        id={`${props.id}-value`}
        fullWidth
        error={!!props.errors.item_properties?.[props.index]?.value}
        helperText={getItemPropertyFieldError(props.errors)}
      />
    )
  }
  if (props.type === 'multiline_text') {
    return (
      <>
        <Description
          theme="snow"
          value={props.value}
          placeholder={props.name}
          onChange={(value: string) => {
            props.setValue(`item_properties.${props.index}.value`, value)
          }}
        />
      </>
    )
  }
  if (props.type === 'boolean') {
    return (
      <Container sx={{ display: 'flex', flexDirection: 'row', gap: '20px', marginTop: '20px', marginBottom: '20px' }}>
        <Typography variant="body2">{props.name}</Typography>
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
      </Container>
    )
  }
  if (props.type === 'date') {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
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
      <Container sx={{ display: 'flex', flexDirection: 'row', gap: '20px', marginTop: '20px', marginBottom: '20px' }}>
        <Typography variant="body2">{props.name}</Typography>
        <Rating
          value={Number(props.value)}
          size="large"
          onChange={(event, newValue) => handleRatingChange(newValue as number)}
        />
      </Container>
    )
  }
  return null
}

export default ItemPropertyField;
