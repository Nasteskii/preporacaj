import SideMenuComponent from "../sideMenuComponent/SideMenuComponent";
import { BrowserRouter as Router } from "react-router-dom";

function ContainerComponent() {
  return (
    <Router>
      <SideMenuComponent />;
    </Router>
  );
}

export default ContainerComponent;
