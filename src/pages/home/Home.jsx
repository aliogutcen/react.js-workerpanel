import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import WorkerService from "../../service/WorkerService";
import "./home.scss";
import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { SidebarContext } from "../../context/SidebarContext";
import withAuth from "../../withAuth";
import Welcome from "../../components/welcome/Welcome";
import Widget from "../../components/widgets/Widget";
import DataPermission from "../../components/dataPermission/DataPermission";
import Calender from "../../components/calender/Calender";
import ProjectTime from "../../components/project-time/ProjectTime";
import Pendings from "../../components/pending/Pending";
import CircularProgressBar from "../../components/circular/CircularProgressBar";
import Project from "../../components/project/Project";
import TableExpense from "../../components/TableExpense/TableExpense";
import TeamLeader from "../../components/team-leader/TeamLeader";

const Home = () => {
  return (
    <div className="home ">
      {/* <Sidebar /> */}
      <div className="homeContainer">
        <Navbar />
        <Welcome />
        <div className="areas">
          <div className="first-area">
            <div className="widgetsArea">
              <div className="widgets">
                <Widget type="total" />
                <Widget type="retired" />
                <Widget type="active" />
                <Widget type="laik" />
              </div>
            </div>
            <div className="project-area">
              <ProjectTime />
              <Pendings />
              <CircularProgressBar />
            </div>
          </div>
          <div className="second-area">
            <Calender />
          </div>
        </div>
        <div className="third-area">
          <TeamLeader />
          <TableExpense />

          <Project />
        </div>
      </div>
    </div>
  );
};

export default withAuth(Home);
