import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import AuthForm from "./components/AuthForm";
import MainPage from "./pages/mainPage";
import { RegisterPage } from "./pages/register";

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
      </Routes>
    </div>
  );
}

export default App;
