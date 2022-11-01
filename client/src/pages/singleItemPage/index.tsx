import AddComment from "../../components/AddComment";
import CommentsList from "../../components/CommentsList";
import ItemDetails from "../../components/ItemDetails";

function SingleItemPage() {
  return (
    <>
      <ItemDetails />
      <AddComment />
      <CommentsList />
    </>
  )
};

export default SingleItemPage;