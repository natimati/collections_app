import { Rating, Switch, Typography } from '@mui/material';
import { PropertyWrapper } from './style';

interface Props {
  type: string;
  name: string;
  value: string;
}

function ItemProperty(props: Props) {
  if (props.type === 'number') {
    return (
      <PropertyWrapper>
        <Typography>{props.name}</Typography>
        <Typography>{props.value || '-'}</Typography>
      </PropertyWrapper>
    )
  }
  if (props.type === 'text') {
    return (
      <PropertyWrapper>
        <Typography>{props.name}</Typography>
        <Typography>{props.value || '-'}</Typography>
      </PropertyWrapper>
    )
  }
  if (props.type === 'multiline_text') {
    return (
      <PropertyWrapper>
        <Typography>{props.name}</Typography>
        <Typography>{props.value || '-'}</Typography>
      </PropertyWrapper>
    )
  }
  if (props.type === 'boolean') {
    return (
      <PropertyWrapper>
        <Typography>{props.name}</Typography>
        <Switch
          inputProps={{ 'aria-label': 'controlled', readOnly: true }}
          checked={props.value === '1'}
          color='secondary'
        />
      </PropertyWrapper>
    )
  }
  if (props.type === 'date') {
    return (
      <PropertyWrapper>
        <Typography>{props.name}</Typography>
        <Typography>{props.value || '-'}</Typography>
      </PropertyWrapper>
    )
  }
  if (props.type === 'rating') {
    return (
      <PropertyWrapper>
        <Typography>{props.name}</Typography>
        <Rating
          value={Number(props.value)}
          size='large'
          sx={{ color: "#DC9D5F" }}
          readOnly
        />
      </PropertyWrapper>
    )
  }
  return null
};

export default ItemProperty