import { useContext, useState } from 'react';
import { DataGrid, GridCellParams, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import format from 'date-fns/format';
import { useNavigate } from 'react-router-dom';
import { changeUserRole, deleteUsers, getAllUsers } from '../../api';
import { ButtonContainer, Container } from './style';
import { UserContext } from '../../context/UserContext.tsx';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonIcon from '@mui/icons-material/Person';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'; import { theme } from '../../style';

function UsersTable() {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
  const client = useQueryClient();
  const { data: users = [], isLoading } = useQuery(['users'], () => {
    return getAllUsers();
  });

  const { user, logout } = useContext(UserContext);

  const navigate = useNavigate();
  const handleCollectionCellClick = (params: GridCellParams) => {
    if (params.field === 'collections') {
      navigate(`/collections/${params.id}`)
    }
  };

  const onCheckboxChange = (ids: GridSelectionModel) => {
    setSelectedUserIds(ids.map((id) => {
      return String(id)
    }))
  };

  const handleUsersDeleteClick = () => {
    deleteUsers(selectedUserIds).then(() => {
      client.invalidateQueries(['users']);
      if (!user) { return; }
      if (selectedUserIds.includes(user.id)) {
        logout()
      };
    })
  };

  const handleChangeRoleClick = (isAdmin: boolean) => {
    changeUserRole(isAdmin, selectedUserIds).then(() => {
      setSelectedUserIds([]);
      client.invalidateQueries(['users']);
      if (!user) { return; }

      if (selectedUserIds.includes(user.id) && user.isAdmin !== isAdmin) {
        logout()
      };
    })
  };
  const columns: GridColDef[] = [
    { field: 'username', headerName: 'username', width: 180, description: 'Click on the cell to see collection' },
    { field: 'email', headerName: 'email', width: 400 },
    { field: 'registration_time', headerName: 'registration time', width: 180 },
    { field: 'last_login_time', headerName: 'last saw', width: 100 },
    { field: 'collections', headerName: 'collections number', width: 180 },
    { field: 'is_admin', headerName: 'role', width: 80 },
    { field: 'id', headerName: 'ID', width: 390 },
  ];

  const rows = users.map((user) => {
    return (
      {
        ...user,
        is_admin: user.is_admin ? "admin" : "user",
        collections: user.collections.length,
        registration_time: format(new Date(user.registration_time), "do MMMM yyyy"),
        last_login_time: formatDistanceToNow(new Date(user.last_login_time))
      }
    )
  });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <ButtonContainer>
        <Tooltip title="Delete selected user">
          <IconButton
            onClick={handleUsersDeleteClick}
            sx={{ ml: 2, margin: 0, padding: 0 }}
          >
            <PersonRemoveIcon
              sx={{
                width: 50,
                height: 50,
                fill: theme.palette.secondary.main
              }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Give admin status">
          <IconButton
            onClick={() => handleChangeRoleClick(true)}
            sx={{ ml: 2, margin: 0, padding: 0 }}
          >
            <ManageAccountsIcon
              sx={{
                width: 50,
                height: 50,
                fill: theme.palette.secondary.main
              }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Remove admin status">
          <IconButton
            onClick={() => handleChangeRoleClick(false)}
            sx={{ ml: 2, margin: 0, padding: 0 }}
          >
            <PersonIcon
              sx={{
                width: 50,
                height: 50,
                fill: theme.palette.secondary.main
              }}
            />
          </IconButton>
        </Tooltip>
      </ButtonContainer>
      <Container>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          sx={{ color: "#404956", cursor: 'pointer' }}
          onCellClick={handleCollectionCellClick}
          onSelectionModelChange={(selectionModel) => onCheckboxChange(selectionModel)}
          selectionModel={selectedUserIds}
        />
      </Container>
    </>
  )
};

export default UsersTable;