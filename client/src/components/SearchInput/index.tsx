import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { search } from "../../api";

function SearchInput() {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    search(value);
  }

  return (
    <>
      <TextField
        placeholder="Search…"
        onChange={handleChange}
        inputProps={{ 'aria-label': 'search' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </>
  )
}

export default SearchInput