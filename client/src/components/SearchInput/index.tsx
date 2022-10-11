import { Input, InputAdornment } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { search } from "../../api";

function SearchInput() {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    search(value);
  }

  return (
    <>
      <Input
        placeholder="Search…"
        onChange={handleChange}
        inputProps={{ 'aria-label': 'search' }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </>
  )
}

export default SearchInput