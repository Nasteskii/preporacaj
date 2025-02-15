import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./paths/auth/signup/signup";
import Login from "./paths/auth/login/login";
import ContainerComponent from "./components/containerComponent/ContainerComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<ContainerComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
