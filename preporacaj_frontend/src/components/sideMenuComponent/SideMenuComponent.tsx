import { useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import {
  Sidebar,
  Menu,
  MenuItem,
} from "react-pro-sidebar";

import { FiHome, FiHeart, FiBookOpen, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine, RiCarLine } from "react-icons/ri";
import { MdMicrowave, MdOutlineDesktopWindows } from "react-icons/md";

import "./SideMenuComponent.css";
import Home from '../../paths/home/home';
import MyRecommendations from '../../paths/my-recommendations/my-recommendations';
import Vehicles from '../../paths/vehicles/vehicles';
import HomeAppliances from "../../paths/homeAppliances/homeAppliances";
import Books from "../../paths/books/books";
import IT from "../../paths/it/it";

function SideMenuComponent() {
    const [menuCollapse, setMenuCollapse] = useState(false);

    const menuIconClick = () => {
        setMenuCollapse((prevCollapse) => !prevCollapse);
    };

    return (
        <div className="flex no-wrap h-screen w-screen">
            <Router>
                <div className={menuCollapse ? "w-24" : "w-64"}>
                    <Sidebar className="h-screen w-full min-w-full sidebar" collapsed={menuCollapse}>
                        <Menu className="bg-white shadow-sm h-full">
                            <div className="text-center py-5">
                                <MenuItem active={true} icon={menuCollapse ? <FiHome /> : <h2>Препорачај</h2>} component={<Link to="/home" />} className="menu-item text-3xl"></MenuItem>
                            </div>
                            <div className="text-black absolute right-4 z-10 font-bold text-xl top-20 cursor-pointer w-14 min-w-14"
                                onClick={menuIconClick}>
                                {menuCollapse ? (<FiArrowRightCircle/>) : (<FiArrowLeftCircle/>)}
                            </div>
                            <div className="mt-20">
                                <MenuItem icon={<FiHeart />} component={<Link to="/my-recommendations" />}>Мои препораки</MenuItem>
                                <MenuItem icon={<RiCarLine />} component={<Link to="/vehicles" />}>Возила</MenuItem>
                                <MenuItem icon={<MdMicrowave />} component={<Link to="/home-appliances" />}>Домаќинство</MenuItem>
                                <MenuItem icon={<FiBookOpen />} component={<Link to="/books" />}>Книги</MenuItem>
                                <MenuItem icon={<MdOutlineDesktopWindows />} component={<Link to="/IT" />}>ИТ и компјутери</MenuItem>
                            </div>
                            <div className="mt-56">
                                <MenuItem icon={<FiLogOut />} component={<Link to="/logout" />}>Одјави се</MenuItem>
                            </div>
                        </Menu>
                    </Sidebar>
                </div>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/my-recommendations" element={<MyRecommendations />} />
                    <Route path="/vehicles" element={<Vehicles />} />
                    <Route path="/home-appliances" element={<HomeAppliances />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/IT" element={<IT />} />
                    <Route path="/logout" />
                </Routes>
            </Router>
        </div>
    );
}

export default SideMenuComponent;
