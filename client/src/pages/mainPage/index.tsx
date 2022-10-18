import CollectionCreator from "../../components/CollectionCreator";
import DropdownMenu from "../../components/DropdownMenu";
import LatestItems from "../../components/LatestItems";
import SearchInput from "../../components/SearchInput";

function MainPage() {
    return (
        <>
            <SearchInput />
            <DropdownMenu />
            <LatestItems />
            <CollectionCreator />
        </>
    )
};

export default MainPage;
