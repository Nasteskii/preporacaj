import { useState, useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

import {
  FiHome,
  FiHeart,
  FiBookOpen,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { RiPencilLine, RiCarLine } from "react-icons/ri";
import { MdMicrowave, MdOutlineDesktopWindows } from "react-icons/md";

import "./SideMenuComponent.css";
import Home from "../../paths/home/home";
import MyRecommendations from "../../paths/my-recommendations/my-recommendations";
import Vehicles from "../../paths/vehicles/vehicles";
import HomeAppliances from "../../paths/homeAppliances/homeAppliances";
import Books from "../../paths/books/books";
import IT from "../../paths/it/it";
import ModalComponent from "../modalComponent/ModalComponent";

function SideMenuComponent() {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.pathname = "/home";
    }
  }, []);

  const menuIconClick = () => {
    setMenuCollapse((prevCollapse) => !prevCollapse);
  };

  const logOut = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex no-wrap h-screen w-screen">
      <div className={menuCollapse ? "w-20" : "w-64"}>
        <Sidebar
          className="h-screen w-full min-w-full bg-metal sidebar"
          collapsed={menuCollapse}
        >
          <Menu>
            <MenuItem
              active={true}
              icon={menuCollapse ? <FiHome /> : null}
              component={<Link to="/home" />}
              className="menu-item mt-5"
            >
              <h2 className="text-3xl text-center p-3">Препорачај</h2>
            </MenuItem>
            <div
              className="text-black absolute right-3.5 z-10 font-bold text-xl top-20 cursor-pointer w-14 min-w-14"
              onClick={menuIconClick}
            >
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
            <MenuItem
              icon={<FiHeart />}
              component={<Link to="/my-recommendations" />}
              className={`mt-24 w-fit ${
                location.pathname === "/my-recommendations"
                  ? "border-2 rounded-2xl"
                  : ""
              }`}
            >
              Мои препораки
            </MenuItem>
            <MenuItem
              icon={<RiCarLine />}
              component={<Link to="/vehicles" />}
              className={
                location.pathname === "/vehicles" ? "border-2 rounded-2xl" : ""
              }
            >
              Возила
            </MenuItem>
            <MenuItem
              icon={<MdMicrowave />}
              component={<Link to="/home-appliances" />}
              className={
                location.pathname === "/home-appliances"
                  ? "border-2 rounded-2xl"
                  : ""
              }
            >
              Домаќинство
            </MenuItem>
            <MenuItem
              icon={<FiBookOpen />}
              component={<Link to="/books" />}
              className={
                location.pathname === "/books" ? "border-2 rounded-2xl" : ""
              }
            >
              Книги
            </MenuItem>
            <MenuItem
              icon={<MdOutlineDesktopWindows />}
              component={<Link to="/IT" />}
              className={
                location.pathname === "/IT" ? "border-2 rounded-2xl" : ""
              }
            >
              ИТ и компјутери
            </MenuItem>
            <div className="mt-56">
              <MenuItem icon={<FiLogOut />} onClick={() => logOut()}>
                Одјави се
              </MenuItem>
            </div>
          </Menu>
        </Sidebar>
        {showModal && (
          <ModalComponent
            modalText="Дали сте сигурни?"
            closeModal={closeModal}
          />
        )}
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
    </div>
  );
}

export default SideMenuComponent;
