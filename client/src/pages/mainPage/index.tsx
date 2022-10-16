import CollectionCreator from "../../components/CollectionCreator";
import LatestItems from "../../components/LatestItems";
import SearchInput from "../../components/SearchInput";

function MainPage() {
    return (
        <>
            <SearchInput />
            <LatestItems />
            <CollectionCreator />
        </>
    )
};

export default MainPage;
