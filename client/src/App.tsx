import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import AuthForm from "./components/AuthForm";
import CollectionCreator from "./components/CollectionCreator";
import MainPage from "./pages/mainPage";
import { RegisterPage } from "./pages/register";
import UserCollectionPage from "./pages/userCollectionPage";

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
          element={<UserCollectionPage />}
        />
        <Route
          path='collection_creator'
          element={(
            <Auth restricted>
              <CollectionCreator /> 
            </Auth>
          )}
        />
      </Routes>
    </div>
  );
}

export default App;
