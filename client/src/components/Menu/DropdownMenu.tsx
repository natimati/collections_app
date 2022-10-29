import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext.tsx';
import CollectionsIcon from '@mui/icons-material/Collections';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { theme } from '../../style';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

function DropdownMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user, logout, isAdmin } = useContext(UserContext)

  const handleYourCollectionClick = () => {
    if (!user) {
      navigate('/login');
      return
    }
    navigate('/collections/' + user.id)
  };

  const handleCreateCollectionClick = () => {
    if (!user) {
      navigate('/login');
      return
    }
    navigate('/collection/new')
  }

  const handleLoginClick = () => {
    navigate('/login');
  };
  return (
    <>
      <Tooltip title="Menu">
        <IconButton
          onClick={handleClick}
          sx={{ ml: 2, margin: 0, padding: 0 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <MoreVertIcon
            sx={{
              width: 50,
              height: 50,
              fill: theme.palette.secondary.main,
            }} />
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
        <MenuItem onClick={handleYourCollectionClick}>
          <CollectionsIcon
            sx={{
              width: 40,
              height: 40,
              fill: theme.palette.secondary.main
            }}
          /> Your collections
        </MenuItem>
        {isAdmin && (
          <MenuItem onClick={() => { navigate('/admin') }}>
            <AdminPanelSettingsIcon sx={{
              width: 40,
              height: 40,
              fill: theme.palette.secondary.main
            }}
            /> Admin page
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={handleCreateCollectionClick}>
          <ListItemIcon>
            <AddPhotoAlternateIcon
              sx={{
                width: 40,
                height: 40,
                fill: theme.palette.secondary.main,
              }}
            />
          </ListItemIcon>
          Create collection
        </MenuItem>
        {user ? (
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout
                sx={{
                  width: 30,
                  height: 30,
                  fill: theme.palette.secondary.main
                }}
              />
            </ListItemIcon>
            Logout
          </MenuItem>
        ) : (
          <MenuItem onClick={handleLoginClick}>
            <ListItemIcon>
              <LoginIcon
                sx={{
                  width: 30,
                  height: 30,
                  fill: theme.palette.secondary.main
                }}
              />
            </ListItemIcon>
            Login
          </MenuItem>
        )}
      </Menu>
    </>
  )
};

export default DropdownMenu;