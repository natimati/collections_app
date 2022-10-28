import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import AuthForm from "./components/AuthForm";
import Background from "./components/Background";
import Header from "./components/Header";
import ItemCreator from "./components/ItemCreator";
import AdminPage from "./pages/adminPage";
import CreateCollectionPage from "./pages/createCollectionPage";
import EditCollectionPage from "./pages/editCollectionPage";
import MainPage from "./pages/mainPage";
import { RegisterPage } from "./pages/register";
import SingleCollectionPage from "./pages/singleCollectionPage";
import SingleItemPage from "./pages/singleItemPage";
import UserCollectionsPage from "./pages/userCollectionsPage";


function App() {

  return (
    <div className="App">
      <Header />
      <Background />
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
        <Route
          path='item/:itemId'
          element={<SingleItemPage />}
        />
        <Route
          path='admin'
          element={<AdminPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
