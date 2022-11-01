import { useContext } from 'react';
import AddComment from "../../components/AddComment";
import CommentsList from "../../components/CommentsList";
import ItemDetails from "../../components/ItemDetails";
import { UserContext } from '../../context/UserContext.tsx';

function SingleItemPage() {
  const { user } = useContext(UserContext)

  return (
    <>
      <ItemDetails />
      {user && (<AddComment />)}
      <CommentsList />
    </> 
  )
};

export default SingleItemPage;