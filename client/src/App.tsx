import { Route, Routes } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import MainPage from "./pages/mainPage";
import { RegisterPage } from "./pages/register";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<AuthForm isLogin />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="" element={<MainPage/>} />
      </Routes>
    </div>
  );
}

export default App;
