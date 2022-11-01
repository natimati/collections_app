import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language';
import { theme } from '../../style';
import ReactCountryFlag from "react-country-flag"
import { useTranslation } from 'react-i18next';

function LanguageMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('lang') || 'GB');
  const open = Boolean(anchorEl);
  const { t, i18n } = useTranslation();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (countryCode: string) => {
    setCurrentLanguage(countryCode);
    localStorage.setItem('lang', countryCode)
    i18n.changeLanguage(countryCode);
  }
  
  return (
    <>
      <Tooltip title="Language change">
        <IconButton
          onClick={handleClick}
          sx={{ ml: 2, margin: 0, padding: 0 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <LanguageIcon
            sx={{
              width: 50,
              height: 50,
              fill: theme.palette.secondary.main
            }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
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
        <MenuItem
          selected={currentLanguage === 'GB'}
          onClick={() => handleLanguageChange('GB')}
        >
          <ReactCountryFlag
            countryCode="GB"
            svg
            style={{
              width: '20px',
              height: '20px',
              paddingRight: '10px',
            }}
            title="PL"
           /> English
        </MenuItem>
        <MenuItem
          selected={currentLanguage === 'PL'}
          onClick={() => handleLanguageChange('PL')}
        >
          <ReactCountryFlag
            countryCode={"PL"}
            svg
            style={{
              width: '20px',
              height: '20px',
              paddingRight: '10px',
            }}
            title="PL"
          /> Polish
        </MenuItem>
      </Menu>
    </>
  )
};

export default LanguageMenu;