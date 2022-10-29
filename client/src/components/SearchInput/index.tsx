import React, { useState } from 'react';
import { Divider, InputAdornment, TextField, Menu, MenuItem, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useHits, useSearchBox } from 'react-instantsearch-hooks-web';
import { useNavigate } from "react-router-dom";
import { ImageContainer, Overlay, TextContainer } from './style';



function SearchInput() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { query, refine } = useSearchBox();
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { hits = [] } = useHits();
  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    setAnchorEl(event.currentTarget);

    refine(value);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TextField
        placeholder="Search…"
        onChange={handleChange}
        onFocus={handleFocus}
        value={query}
        inputProps={{ 'aria-label': 'search' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Menu
        autoFocus={false}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        variant='menu'
        onClose={handleClose}
        onClick={handleClose}
        disableAutoFocus={true}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'auto',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            maxHeight: '300px',
            width: '350px',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {hits.map((hit) => {
          return (
            <React.Fragment key={hit.objectID}>
              <MenuItem autoFocus={false} onClick={() => navigate(`item/${hit.objectID}`)}>
                <ImageContainer imageUrl={hit.image_url as string}>
                  <Overlay>
                    <TextContainer>
                      <Typography variant='body2'>{hit.name as string}</Typography>
                    </TextContainer>
                  </Overlay>
                </ImageContainer>
              </MenuItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </Menu>
    </>
  )
}

export default SearchInput