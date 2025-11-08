import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";

import {
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiBookOpen,
  FiHeart,
  FiHome,
  FiLogIn,
  FiLogOut,
} from "react-icons/fi";
import { RiCarLine } from "react-icons/ri";
import { MdMicrowave, MdOutlineDesktopWindows } from "react-icons/md";

import "./SideMenuComponent.css";
import Home from "../../paths/home/home";
import MyRecommendations from "../../paths/my-recommendations/my-recommendations";
import Vehicles from "../../paths/vehicles/vehicles";
import HomeAppliances from "../../paths/homeAppliances/homeAppliances";
import Books from "../../paths/books/books";
import IT from "../../paths/it/it";
import ModalComponent from "../modalComponent/ModalComponent";
import AuthService from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

function SideMenuComponent() {
  const { profile } = useAuth();
  const [toggleMenu, setToggleMenu] = useState(true);
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const handleWindowResize = () => {
    if (window.innerWidth <= 720) {
      setToggleMenu(false);
      setMenuCollapse(true);
    } else {
      setToggleMenu(true);
    }
  };

  useEffect(() => {
    if (path === "/") {
      window.location.href = "/home";
    }
    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const menuIconClick = () => {
    setMenuCollapse((prevCollapse) => !prevCollapse);
  };

  const logOut = () => {
    AuthService.logout();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex no-wrap h-screen">
      <div style={menuCollapse ? { minWidth: "80px" } : { minWidth: "248px" }}>
        <Sidebar
          className="h-screen bg-violet sidebar"
          collapsed={menuCollapse}
        >
          <Menu>
            <MenuItem
              active={true}
              icon={menuCollapse ? <FiHome /> : null}
              component={<Link to="/home" />}
              className="menu-item mb-24"
            >
              <h2 className="text-3xl text-center text-purple p-3">
                Препорачај
              </h2>
            </MenuItem>
            {toggleMenu && (
              <div
                className="text-black absolute right-3.5 z-10 font-bold text-xl top-20 cursor-pointer w-14 min-w-14"
                onClick={menuIconClick}
              >
                {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
              </div>
            )}
            {profile && (
              <MenuItem
                icon={<FiHeart />}
                component={<Link to="/my-recommendations" />}
                className={
                  path === "/my-recommendations" ||
                  path.substring(0, path.lastIndexOf("/")) ===
                    "/my-recommendations"
                    ? "border-2 rounded-2xl border-purple"
                    : ""
                }
              >
                Мои препораки
              </MenuItem>
            )}
            <MenuItem
              icon={<RiCarLine />}
              component={<Link to="/vehicles" />}
              className={
                path === "/vehicles" ||
                path.substring(0, path.lastIndexOf("/")) === "/vehicles"
                  ? "border-2 rounded-2xl border-purple"
                  : ""
              }
            >
              Возила
            </MenuItem>
            <MenuItem
              icon={<MdMicrowave />}
              component={<Link to="/home-appliances" />}
              className={
                path === "/home-appliances" ||
                path.substring(0, path.lastIndexOf("/")) === "/home-appliances"
                  ? "border-2 rounded-2xl border-purple"
                  : ""
              }
            >
              Домаќинство
            </MenuItem>
            <MenuItem
              icon={<FiBookOpen />}
              component={<Link to="/books" />}
              className={
                path === "/books" ||
                path.substring(0, path.lastIndexOf("/")) === "/books"
                  ? "border-2 rounded-2xl border-purple"
                  : ""
              }
            >
              Книги
            </MenuItem>
            <MenuItem
              icon={<MdOutlineDesktopWindows />}
              component={<Link to="/IT" />}
              className={
                path === "/IT" ||
                path.substring(0, path.lastIndexOf("/")) === "/IT"
                  ? "border-2 rounded-2xl border-purple"
                  : ""
              }
            >
              ИТ и компјутери
            </MenuItem>
            <div className="mt-auto">
              {profile && (
                <div>
                  <p className="text-center text-lg mb-2">
                    {profile?.name} {profile?.surname}
                  </p>
                  {profile?.role === "ROLE_SUPERUSER" && (
                    <p className="text-center text-purple text-sm">
                      АДМИНИСТРАТОР
                    </p>
                  )}
                </div>
              )}
              {profile ? (
                <MenuItem
                  icon={<FiLogOut />}
                  onClick={() => setShowModal(true)}
                >
                  Одјави се
                </MenuItem>
              ) : (
                <MenuItem icon={<FiLogIn />} component={<Link to="/login" />}>
                  Најави се
                </MenuItem>
              )}
            </div>
          </Menu>
        </Sidebar>
        {showModal && (
          <ModalComponent
            modalText="Дали сте сигурни?"
            cancel={closeModal}
            confirm={logOut}
          />
        )}
      </div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/my-recommendations/*" element={<MyRecommendations />} />
        <Route path="/vehicles/*" element={<Vehicles />} />
        <Route path="/home-appliances/*" element={<HomeAppliances />} />
        <Route path="/books/*" element={<Books />} />
        <Route path="/IT/*" element={<IT />} />
      </Routes>
    </div>
  );
}

export default SideMenuComponent;
