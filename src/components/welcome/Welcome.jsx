import "./welcome.scss";
import Person from "../../assets/08.png";
const Welcome = () => {
  return (
    <div className="welcome">
      <div className="welcome-info">
        <div className="welcome-left-side">
          <h2>Hey Ali Welcome to the Dashboard</h2>
          <p className="welcome-p">
            There are many variations of passages of Lorem Ipsum available, ut
            the majority have suffered passages of Lorem Ipsum available
            alteration in some form
          </p>
        </div>
        <div className="welcome-right-side">
          <img src={Person} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
