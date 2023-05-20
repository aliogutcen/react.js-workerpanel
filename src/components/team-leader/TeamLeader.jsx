import "./teamleader.scss";
import Leader from "../../assets/man.png";
import Github from "../../assets/github.png";
import Linkedin from "../../assets/linkedin.png";
import Mail from "../../assets/message.png";
const TeamLeader = () => {
  return (
    <div className="teamleader">
      <div className="infoteamleader">
        <h4 className="teamleader-h4">Team Leader Information</h4>
      </div>
      <div className="information-for-leader">
        <img src={Leader} alt="" className="leader" />
        <div className="information-leader">
          <h6>MELIHCAN OZTURK</h6>
          <p className="leader-p">Manager</p>

          <div className="phone-mail-info">
            <h6 className="contact-h6">Contact Details</h6>
            <div className="contact-detail">
              <img src={Mail} className="contact-icon" />
              <p className="mail-p">0555-555-55-55</p>
            </div>
          </div>
          <div className="leader-social">
            <h6 className="socialmedia-h6">Social Media Links</h6>
            <div className="social-media-leader">
              <img src={Github} className="social-icon" />
              <img src={Github} className="social-icon" />
              <img src={Github} className="social-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamLeader;
