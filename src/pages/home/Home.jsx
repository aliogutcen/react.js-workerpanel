import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import WorkerService from "../../service/WorkerService";
import "./home.scss";
import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

import withAuth from "../../withAuth";
const Home = () => {
  return (
    <div className="home ">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
      </div>
    </div>
  );
};

export default withAuth(Home);
