import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PortfolioPage from "../pages/PortfolioPage";
import PricePage from "../pages/PricePage";
import RecordPage from "../pages/RecordPage";
import ContactPage from "../pages/ContactPage";
// import AdminPage from "../pages/AdminPage";
import { ContextUser } from "../index";

const Approuter = () => {
  const {user} = useContext(ContextUser)
  console.log(user)
  return (
    <Routes>
      <Route path="/Home" element={<HomePage />} />
      <Route path="/Portfolio" element={<PortfolioPage />} />
      <Route path="/Price" element={<PricePage />} />
      <Route path="/Record" element={<RecordPage />} />
      <Route path="/Contact" element={<ContactPage />} />
      {/* {user.isAuth && <Route path="/Admin" element={<AdminPage />} />} */}
      {/* {user.role === "admin" <Redirect to="/home" />} */}

      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default Approuter;
