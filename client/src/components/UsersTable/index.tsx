import { DataGrid, GridCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import id from 'date-fns/esm/locale/id/index.js';
import format from 'date-fns/format';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../api';
import { Container } from './style';


interface User {
  id: string;
  username: string;
  email: string;
  is_admin: boolean;
  registration_time: string;
  last_login_time: string;
  collections: {}[]
}


function UsersTable() {
  const { data: users = [] } = useQuery(['users'], () => {
    return getAllUsers();
  });

  const navigate = useNavigate();
  const handleCollectionCellClick = (params: GridCellParams) => {
    if (params.field === 'collections') {
      navigate(`/collections/${params.id}`)
    }
   }

  const columns: GridColDef[] = [
    { field: 'username', headerName: 'username', width: 200 },
    { field: 'email', headerName: 'email', width: 400 },
    { field: 'registration_time', headerName: 'registration time', width: 200 },
    { field: 'last_login_time', headerName: 'last saw', width: 150 },
    {
      field: 'collections',
      headerName: 'collections number',
      width: 200,
  },
    { field: 'is_admin', headerName: 'role', width: 100 },
    { field: 'id', headerName: 'ID', width: 390 },
  ];

  const rows = users.map((user: User) => {
    
    return (
      {
        ...user,
        is_admin: user.is_admin ? "admin" : "user",
        collections: user.collections.length,
        registration_time: format(new Date(user.registration_time), "do MMMM yyyy"),
        last_login_time: formatDistanceToNow(new Date(user.last_login_time))
      }
    ) 
  })

  return (
    <Container>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        sx={{ color: "#404956" }}
        onCellClick={handleCollectionCellClick}
      />
    </Container>
  )
};

export default UsersTable;