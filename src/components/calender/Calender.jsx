import "./calender.scss";
import React, { useState } from "react";
import Calendar from "react-calendar";

const Calender = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div className="calender">
      <Calendar className="naber" onChange={onChange} value={value} />
    </div>
  );
};

export default Calender;
