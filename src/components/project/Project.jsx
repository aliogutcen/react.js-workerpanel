import "./project.scss";
import lottie from "lottie-web";
import { useEffect, useRef } from "react";

const Project = () => {
  const container = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../project.json"),
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice", // Animasyonun boyutlandırılmasıyla ilgili ayarlar
      },
    });
  }, []);
  return (
    <div className="project-lottie">
      <div className="project-lottie-safe" ref={container}></div>
    </div>
  );
};

export default Project;
