import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { SidebarContext } from "../../context/SidebarContext";
import { useContext, useState, useRef } from "react";
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
import TableExpense from "../../components/TableExpense/TableExpense";
import MoneyManager from "../../assets/casual-life-3d-yellow-dollar-coin-1.png";
import TimeImage from "../../assets/3d-casual-life-blue-stopwatch.png";
import BusinessPhone from "../../assets/casual-life-3d-retro-phone-flying.png";
import StarImage from "../../assets/3d-fluency-christmas-star.png";
import Illness from "../../assets/business-3d-thermometer-showing-37-celsius.png";
const Profile = () => {
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
            <h4 className="profile-h4">Ali Öğütçen</h4>
            <div className="profile-info-summary">
              <img
                // src={image ? URL.createObjectURL(image) : { AvatarManager }}  düzenlenecek yer
                src={ProfilePicture}
                alt=""
                className="profile-icon"
                onClick={handleImageClick}
              />
              <div className="summary-info-profile">
                <div className="profile-mail">
                  <img src={MailImage} alt="" className="profile-icon-mail" />
                  <div className="mail-info-side">
                    <span className="span-profile">aliogutcen@gmail.com</span>
                    <p className="profile-p">Email Address</p>
                  </div>
                </div>
                <div className="profile-mail">
                  <img src={PhoneImage} alt="" className="profile-icon-mail" />
                  <div className="mail-info-side">
                    <span className="span-profile">Software Developer</span>
                    <p className="profile-p">Jobs</p>
                  </div>
                </div>
                <div className="profile-mail">
                  <img
                    src={MoneyManager}
                    alt=""
                    className="profile-icon-mail"
                  />
                  <div className="mail-info-side">
                    <span className="span-profile">$7000</span>
                    <p className="profile-p">Salary</p>
                  </div>
                </div>
                <div className="profile-mail">
                  <img src={TimeImage} alt="" className="profile-icon-mail" />
                  <div className="mail-info-side">
                    <span className="span-profile">5 Years</span>
                    <p className="profile-p">Time</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="phone-and-adress">
              <div className="address">
                <img src={AddressIcon} className="profile-icon-address" />
                <div className="address-location">
                  <span className="address-p">Kocaeli/Türkiye</span>
                  <p className="address-p2">Location</p>
                </div>
              </div>
              <div className="address-1">
                <img src={BusinessPhone} className="profile-icon-phone" />
                <div className="address-location">
                  <span className="address-p">+90 553 450 21 69</span>
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
