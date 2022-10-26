import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import AuthForm from "./components/AuthForm";
import ItemCreator from "./components/ItemCreator";
import CreateCollectionPage from "./pages/createCollectionPage";
import EditCollectionPage from "./pages/editCollectionPage";
import MainPage from "./pages/mainPage";
import { RegisterPage } from "./pages/register";
import SingleCollectionPage from "./pages/singleCollectionPage";
import UserCollectionsPage from "./pages/userCollectionsPage";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route
          path="login"
          element={(
            <Auth>
              <AuthForm isLogin />
            </Auth>
          )}
        />
        <Route
          path="register"
          element={(
            <Auth>
              <RegisterPage />
            </Auth>
          )}
        />
        <Route
          path=""
          element={(
            <Auth>
              <MainPage />
            </Auth>
          )}
        />
        <Route
          path="collections/:userId"
          element={<UserCollectionsPage />}
        />
        <Route
          path='collection/new'
          element={(
            <Auth restricted>
              <CreateCollectionPage />
            </Auth>
          )}
        />
        <Route
          path='collection/:collectionId'
          element={<SingleCollectionPage />}
        />
        <Route
          path='collection/:collectionId/edit'
          element={
            <Auth restricted>
              <EditCollectionPage />
            </Auth>
          }
        />
        <Route
          path='collection/:collectionId/new-item'
          element={<ItemCreator />}
        />
      </Routes>
    </div>
  );
}

export default App;
