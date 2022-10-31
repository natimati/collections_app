import { useContext, useState } from 'react';
import { DataGrid, GridCellParams, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { theme } from '../../style';
import { toast } from 'react-toastify';

function UsersTable() {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
  const client = useQueryClient();
  const { data: users = [], isLoading } = useQuery(['users'], () => {
    return getAllUsers();
  });
  const { mutateAsync: userDelete, isLoading: isDeleting } = useMutation(
    (selectedUserIds: string[]) => {
      return deleteUsers(selectedUserIds).then(() => {
        client.invalidateQueries(['users']);
        if (!user) { return; }
        if (selectedUserIds.includes(user.id)) {
          logout()
        };
        toast.success('Deleted successfully');
      })
    }
  );

  const { mutateAsync: roleChange, isLoading: isRoleChanging } = useMutation(
    (data: { isAdmin: boolean; selectedUserIds: string[]}) => {
      return changeUserRole(data.isAdmin, data.selectedUserIds).then(() => {
        client.invalidateQueries(['users']);
        toast.success('Role changed');
        if (!user) { return; }
        if (selectedUserIds.includes(user.id) && user.isAdmin !== data.isAdmin) {
          logout()
        } else {
          setSelectedUserIds([]);
        }
      })
    }
  )

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
    userDelete(selectedUserIds)
  };

  const handleChangeRoleClick = (isAdmin: boolean) => {
    if (selectedUserIds.length === 0) {
      return;
    }
    roleChange({
      isAdmin: isAdmin,
      selectedUserIds: selectedUserIds
    })
  };
  
  const columns: GridColDef[] = [
    { field: 'username', headerName: 'username', width: 180, description: 'Click on the cell to see collection', headerAlign: 'center' },
    { field: 'email', headerName: 'email', width: 410, headerAlign: 'center' },
    { field: 'registration_time', headerName: 'registration time', width: 210, align: 'center', headerAlign: 'center' },
    { field: 'last_login_time', headerName: 'last saw', width: 180, align: 'center', headerAlign: 'center' },
    { field: 'collections', headerName: 'collections number', width: 180, align: 'center', headerAlign: 'center' },
    { field: 'is_admin', headerName: 'role', width: 120, align: 'center', headerAlign: 'center' },
    { field: 'id', headerName: 'ID', width: 390, headerAlign: 'center' },
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
      <Box sx={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
            disabled={isDeleting}
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
            disabled={isRoleChanging}
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
            disabled={isRoleChanging}
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
          pageSize={10}
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