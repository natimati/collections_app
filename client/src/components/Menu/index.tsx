import Box from '@mui/material/Box';
import ThemeToggle from './ThemeToggle';
import LanguageMenu from './LanguageMenu';
import DropdownMenu from './DropdownMenu';

function Menu() {
  return (
    <>
      <Box sx={{
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        right: '20px',
        top: '20px'
      }}>
        <ThemeToggle />
        <LanguageMenu />
        <DropdownMenu />
      </Box>
    </>
  );
}

export default Menu;