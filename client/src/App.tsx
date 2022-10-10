import { Route, Routes } from "react-router-dom";
import AuthForm from "./components/AuthForm";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<AuthForm isLogin />} />
        <Route path="register" element={<AuthForm />} />
      </Routes>
    </div>
  );
}

export default App;
