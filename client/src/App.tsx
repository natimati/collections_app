import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import AuthForm from "./components/AuthForm";
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
      </Routes>
    </div>
  );
}

export default App;
