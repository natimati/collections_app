import { useContext } from 'react';
import Menu from "../../components/Menu";
import LatestItems from "../../components/LatestItems";
import SearchInput from "../../components/SearchInput";
import CollectionItem from "../../components/CollectionItem";
import { UserContext } from '../../context/UserContext.tsx';
import { useQuery } from '@tanstack/react-query'
import { getUserCollections } from '../../api';
import { collectionsMock } from './mock';

function MainPage() {
  const { user } = useContext(UserContext);
  const { isLoading, error, data } = useQuery(
    ['collections'],
    () => {
      if (!user) { return }
      getUserCollections(user.id)
    }
  );

  const userCollections = data || [];

  return (
    <>
      <SearchInput />
      <Menu />
      {collectionsMock.map((collection) => (
        <CollectionItem
          key={collection.id}
          authorId={collection.author_id}
          name={collection.name}
          topic={collection.topic}
        />
      ))}

    </>
  )
};

export default MainPage;
