import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { SidebarContext } from "../../context/SidebarContext";
import { useContext, useState, useRef, useEffect } from "react";
import ProfilePicture from "../../assets/08.png";
import MailImage from "../../assets/casual-life-3d-open-white-envelope-with-blue-letter.png";
import PhoneImage from "../../assets/casual-life-3d-diploma-certificate-obliquely-1.png";
import AddressIcon from "../../assets/casual-life-3d-pink-location-marker.png";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import WorkerService from "../../service/WorkerService";
import TableExpense from "../../components/TableExpense/TableExpense";
import MoneyManager from "../../assets/casual-life-3d-yellow-dollar-coin-1.png";
import TimeImage from "../../assets/3d-casual-life-blue-stopwatch.png";
import { Link } from "react-router-dom";
import BusinessPhone from "../../assets/casual-life-3d-retro-phone-flying.png";
import StarImage from "../../assets/3d-fluency-christmas-star.png";
import Illness from "../../assets/business-3d-thermometer-showing-37-celsius.png";
import axios from "axios";
import Cookies from "js-cookie";
import SettingsIcon from "../../assets/settings.png";

const Profile = () => {
  const token = Cookies.get("token");
  const [worker, setWorker] = useState({});

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchWorkerInfo = async () => {
      try {
        const response = await WorkerService.getInfoForWorker(token, {
          cancelToken: source.token,
        });
        const worker = response.data;

        const dateOfEmployment = new Date(worker.dateOfEmployment);
        const today = new Date();
        const diffTime = Math.abs(today - dateOfEmployment);
        const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
        worker.yearsOfEmployment = diffYears;
        setWorker(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.log("An error occurred: ", error);
        }
      }
    };

    fetchWorkerInfo();

    return () => {
      source.cancel();
    };
  }, [token]); //

  const data = [
    {
      name: "Dolar",
      expense: 4000,
    },
    {
      name: "Euro",
      expense: 3000,
    },
    // Daha fazla veri...
  ];

  const { isSidebarVisible } = useContext(SidebarContext);
  const inputFileRef = useRef(null);
  const [image, setImage] = useState("");
  // Fotoğrafı ayarlama Bölümü //
  const handleImageClick = () => {
    inputFileRef.current.click();
  };

  //Fotoğrafı ayarlama bölümü bitti

  return (
    <div className="profile">
      {isSidebarVisible && <Sidebar />}
      <div className="profileContainer">
        <Navbar />

        {/* <div className="avatar-profile-div">
          <img src={AvatarManager} className="avatar-profile" />
          <span>HOŞGELDİN ALİ</span>
        </div> */}

        <div className="profile-info">
          <div className="profile-left-side">
            <div className="profile-left-side-top">
              <h4 className="profile-h4">
                {worker.name + " " + worker.surname}
              </h4>

              <button className="settings">
                {" "}
                <Link to="/profile/settings" style={{ textDecoration: "none" }}>
                  <span>Dashboard</span>
                </Link>
              </button>
            </div>

            <div className="profile-info-summary">
              <img
                // src={image ? URL.createObjectURL(image) : { AvatarManager }}  düzenlenecek yer
                src={worker.image}
                alt=""
                className="profile-icon"
                onClick={handleImageClick}
              />
              <div className="summary-info-profile">
                <div className="profile-mail">
                  <img
                    src="https://res.cloudinary.com/dl7h6kct3/image/upload/v1684700543/casual-life-3d-open-white-envelope-with-blue-letter_yfsm1h.png"
                    alt=""
                    className="profile-icon-mail"
                  />
                  <div className="mail-info-side">
                    <span className="span-profile">{worker.email}</span>
                    <p className="profile-p">Email Address</p>
                  </div>
                </div>
                <div className="profile-mail">
                  <img
                    src="https://res.cloudinary.com/dl7h6kct3/image/upload/c_thumb,w_200,g_face/v1684705571/casual-life-3d-diploma-certificate-obliquely-1_gtfsqw.png"
                    alt=""
                    className="profile-icon-mail"
                  />
                  <div className="mail-info-side">
                    <span className="span-profile">{worker.occupation}</span>
                    <p className="profile-p">Jobs</p>
                  </div>
                </div>
                <div className="profile-mail">
                  <img
                    src="https://res.cloudinary.com/dl7h6kct3/image/upload/c_thumb,w_200,g_face/v1684705485/casual-life-3d-yellow-dollar-coin-1_jowhlu.png"
                    alt=""
                    className="profile-icon-mail"
                  />
                  <div className="mail-info-side">
                    <span className="span-profile">{worker.salary}</span>
                    <p className="profile-p">Salary</p>
                  </div>
                </div>
                <div className="profile-mail">
                  <img
                    src="https://res.cloudinary.com/dl7h6kct3/image/upload/c_thumb,w_200,g_face/v1684705633/3d-casual-life-blue-stopwatch_y0qfpk.png"
                    alt=""
                    className="profile-icon-mail"
                  />
                  <div className="mail-info-side">
                    <span className="span-profile">
                      {worker.yearsOfEmployment + " Years "}
                    </span>
                    <p className="profile-p">Time</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="phone-and-adress">
              <div className="address">
                <img
                  src="https://res.cloudinary.com/dl7h6kct3/image/upload/c_thumb,w_200,g_face/v1684705705/casual-life-3d-pink-location-marker_av5gke.png"
                  className="profile-icon-address"
                />
                <div className="address-location">
                  <span className="address-p">{worker.address}</span>
                  <p className="address-p2">Location</p>
                </div>
              </div>
              <div className="address-1">
                <img
                  src="https://res.cloudinary.com/dl7h6kct3/image/upload/c_thumb,w_200,g_face/v1684705762/casual-life-3d-retro-phone-flying_axrugk.png"
                  className="profile-icon-phone"
                />
                <div className="address-location">
                  <span className="address-p">{worker.companyPhone}</span>
                  <p className="address-p2">Phone Number</p>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-right-side">
            <div className="right-side-1">
              <h4 className="right-side-h4">Profile Summary</h4>
              <div className="right-side-bottom">
                <div className="profile-bottom-left">
                  <div className="bottom-left-top">
                    <h6>Star of Month</h6>
                    <div className="bottom-left-top-inside">
                      <img
                        src={StarImage}
                        alt=""
                        className="profile-icon-mail"
                      />
                      <div className="manager-star-for-you">
                        <span className="span-profile-manager">5/5</span>
                        <p className="profile-manager-p">
                          Manager star of month
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bottom-left-bottom">
                    <h6>Injury</h6>
                    <div className="bottom-left-top-inside">
                      <img src={Illness} alt="" className="profile-icon-mail" />
                      <div className="manager-star-for-you">
                        <span className="span-profile-manager">1</span>
                        <p className="profile-manager-p">
                          Disease within a month
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="profile-bottom-right">
                  <div className="right-side-top">
                    <h6 className="expense-h6">Expense Of Year</h6>
                    <div className="barcharts">
                      <BarChart width={400} height={210} data={data}>
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="expense"
                          fill="#88d3c8"
                          barSize={30}
                          animationBegin={true}
                        />
                      </BarChart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-side-2">
              <TableExpense />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
