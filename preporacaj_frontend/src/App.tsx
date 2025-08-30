import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./paths/auth/signup/signup";
import Login from "./paths/auth/login/login";
import ContainerComponent from "./components/containerComponent/ContainerComponent";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<ContainerComponent />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
