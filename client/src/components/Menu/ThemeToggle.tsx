import { useState } from 'react';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { theme } from '../../style';

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const handleClick = () => {
    setDarkMode((prev) => {
     return !prev
    })
  }
  return (
    <Tooltip title="Menu">
      <IconButton
        onClick={handleClick}
        sx={{ ml: 2, margin: 0, padding: 0 }}
      >
        {!darkMode ? (
          <NightlightIcon
            sx={{
              width: 40,
              height: 40,
              fill: theme.palette.secondary.main
            }}
          />
        ) :
          (
            <LightModeOutlinedIcon
              sx={{
                width: 40,
                height: 40,
                fill: theme.palette.secondary.main
              }}
            />
          )}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle;