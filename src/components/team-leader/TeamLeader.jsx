import "./teamleader.scss";
import Leader from "../../assets/man.png";
import Github from "../../assets/github.png";

import Mail from "../../assets/casual-life-3d-open-white-envelope-with-blue-letter.png";
import LinkedIn from "../../assets/linkedin-2.png";
import Phone from "../../assets/3d-casual-life-messages.png";
import SmartPhone from "../../assets/casual-life-3d-retro-phone-flying.png";
const TeamLeader = () => {
  return (
    <div className="teamleader">
      <div className="infoteamleader">
        <h4 className="teamleader-h4">TEAM LEADER INFORMATION</h4>
      </div>
      <div className="information-for-leader">
        <img src={Leader} alt="" className="leader" />
        <div className="information-leader">
          <h6 className="contact-h6">MELIHCAN OZTURK</h6>

          <div className="phone-mail-info">
            <div className="contact-detail">
              <img src={Mail} className="contact-icon" />
              <p className="mail-p">melihcanozturk@gmail.com</p>
            </div>
          </div>
          <div className="leader-social">
            <div className="social-media-leader">
              <img src={Github} className="social-icon" />
              <p className="mail-p">melihcanozturk</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamLeader;
