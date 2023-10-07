import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from '../../paths/home/home';
import MyRecommendations from '../../paths/my-recommendations/my-recommendations';
import Vehicles from '../../paths/vehicles/vehicles';

function SideMenuComponent() {
    return (
    <Router>
        <Sidebar>
            <Menu
                menuItemStyles={{
                button: {
                    [`&.active`]: {
                    backgroundColor: '#13395e',
                    color: '#b6c8d9',
                    },
                },
                }}
            >
                <MenuItem component={<Link to="/home" />}> Препорачај</MenuItem>
                <MenuItem component={<Link to="/my-recommendations" />}> Мои препораки</MenuItem>
                <MenuItem component={<Link to="/vehicles" />}> Возила</MenuItem>
            </Menu>
        </Sidebar>;
        <Routes>
          <Route path="/home" Component={Home}/>
          <Route path="/my-recommendations" Component={MyRecommendations}/>
          <Route path="/vehicles" Component={Vehicles}/>
        </Routes>
    </Router>
    )
}
export default SideMenuComponent