import CollectionCreator from "../../components/CollectionCreator";
import Menu from "../../components/Menu";
import LatestItems from "../../components/LatestItems";
import SearchInput from "../../components/SearchInput";

function MainPage() {
  return (
    <>
      <SearchInput />
      <Menu />
      <LatestItems />
      <CollectionCreator />
    </>
  )
};

export default MainPage;
