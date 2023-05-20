import "./projecttime.scss";

import lottie from "lottie-web";
import { useEffect, useRef } from "react";

const ProjectTime = () => {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../rocket.json"),
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice", // Animasyonun boyutlandırılmasıyla ilgili ayarlar
      },
    });
  }, []);

  return (
    <div className="project-time">
      <div>
        <h4 className="project-launch-h4">PROJECT LAUNCH</h4>
      </div>
      <div className="project-time-second-area" ref={container}></div>
      <div className="project-time-day-area">
        <span>IN 145 DAYS</span>
      </div>
    </div>
  );
};

export default ProjectTime;
