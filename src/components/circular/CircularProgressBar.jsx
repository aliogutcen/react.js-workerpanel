import React from "react";
import "./circular.scss";

import "react-circular-progressbar/dist/styles.css";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import { easeQuadInOut } from "d3-ease";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Circle from "../../assets/casual-life-3d-pie-chart-5.png";
function CircularProgressBar() {
  const percentage = 66; // ilerleme yüzdesi

  return (
    <div className="circu">
      <div>
        <h4 className="circu-h4">COMPLETION RATE </h4>
      </div>
      <img src={Circle} alt="" className="circle-bar" />
      {/* <AnimatedProgressProvider
        valueStart={0}
        valueEnd={66}
        duration={1.4}
        easingFunction={easeQuadInOut}
        repeat={false}
      >
        {(value) => {
          const roundedValue = Math.round(value);
          return (
            <CircularProgressbar
              value={value}
              text={`${roundedValue}%  OKAY`}
              strokeWidth={2}
              styles={{
                path: {
                  stroke: "#247ba0",
                  strokeLinecap: "round",
                  transition: "stroke-dashoffset 0.5s ease 0s",
                },
                trail: {
                  stroke: "#ddd",
                },
                text: {
                  fill: "#247ba0",
                  fontSize: "14px",
                  fontWeight: "500",
                },
              }}
            />
          );
        }}
      </AnimatedProgressProvider> */}
    </div>
  );
}

export default CircularProgressBar;
