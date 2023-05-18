import DataPermission from "../../components/dataPermission/DataPermission";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./permission.scss";
import { useState, useEffect, useContext } from "react";
import withAuth from "../../withAuth";
const Permission = () => {
  return (
    <div className="permission">
      <Sidebar />
      <div className="permissionContainer">
        <Navbar />
        <DataPermission />
      </div>
    </div>
  );
};

export default withAuth(Permission);
