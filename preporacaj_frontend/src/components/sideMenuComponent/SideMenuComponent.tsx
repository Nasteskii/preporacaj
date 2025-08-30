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
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const handleWindowResize = () => {
    if (window.innerWidth <= 720) {
      setMenuCollapse(true);
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.pathname = "/home";
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
      <div
        className={menuCollapse ? "w-20" : "w-64"}
        style={menuCollapse ? { minWidth: "80px" } : { minWidth: "248px" }}
      >
        <Sidebar className="h-screen bg-metal sidebar" collapsed={menuCollapse}>
          <Menu>
            <MenuItem
              active={true}
              icon={menuCollapse ? <FiHome /> : null}
              component={<Link to="/home" />}
              className="menu-item mt-5 mb-24"
            >
              <h2 className="text-3xl text-center text-purple p-3">
                Препорачај
              </h2>
            </MenuItem>
            <div
              className="text-black absolute right-3.5 z-10 font-bold text-xl top-20 cursor-pointer w-14 min-w-14"
              onClick={menuIconClick}
            >
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
            {profile && (
              <MenuItem
                icon={<FiHeart />}
                component={<Link to="/my-recommendations" />}
                className={
                  location.pathname === "/my-recommendations"
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
                location.pathname === "/vehicles"
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
                location.pathname === "/home-appliances"
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
                location.pathname === "/books"
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
                location.pathname === "/IT"
                  ? "border-2 rounded-2xl border-purple"
                  : ""
              }
            >
              ИТ и компјутери
            </MenuItem>
            {profile ? (
              <MenuItem
                icon={<FiLogOut />}
                onClick={() => setShowModal(true)}
                className="mt-56"
              >
                Одјави се
              </MenuItem>
            ) : (
              <MenuItem icon={<FiLogIn />} onClick={logOut} className="mt-56">
                Најави се
              </MenuItem>
            )}
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
