import DataAdvance from "../../components/dataAdvance/DataAdvance";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./advance.scss";
import { useState, useEffect, useContext } from "react";
import withAuth from "../../withAuth";
const Advance = () => {
  return (
    <div className="permission">
      <Sidebar />
      <div className="permissionContainer">
        <Navbar />
        <DataAdvance />
      </div>
    </div>
  );
};

export default withAuth(Advance);
