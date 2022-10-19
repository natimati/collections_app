import Box from '@mui/material/Box';
import ThemeToggle from './ThemeToggle';
import LanguageMenu from './LanguageMenu';
import DropdownMenu from './DropdownMenu';

function Menu() {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <ThemeToggle />
        <LanguageMenu />
        <DropdownMenu />
      </Box>
    </>
  );
}

export default Menu;