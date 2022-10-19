import Box from '@mui/material/Box';
import ThemeToggle from './ThemeToggle';
import LanguageMenu from './LanguageMenu';

function DropdownMenu() {
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

export default DropdownMenu;